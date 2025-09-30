/**
 * Migración de progreso: math_l*  ->  math_n*
 * - Une best_apm/best_acc/best_tries/passes_count/last_result
 * - Es idempotente: puedes ejecutarla varias veces
 * - Con DELETE_LEGACY=true borra los docs legacy math_l*
 * - Con DRY_RUN=true solo simula (no escribe nada)
 */
require('dotenv').config();
const fs = require('fs');
const admin = require('firebase-admin');

const DRY_RUN = String(process.env.DRY_RUN || 'true').toLowerCase() === 'true';
const DELETE_LEGACY = String(process.env.DELETE_LEGACY || 'false').toLowerCase() === 'true';

/** Init Firebase Admin */
function init() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credPath || !fs.existsSync(credPath)) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS no existe. Edita .env');
  }
  const sa = JSON.parse(fs.readFileSync(credPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(sa),
    projectId: process.env.FIREBASE_PROJECT_ID || sa.project_id,
  });
  return admin.firestore();
}

const db = init();
const FieldValue = admin.firestore.FieldValue;

// Mapa canónico -> aliases legacy a migrar
const LEVELS_CANON = {
  // canónico : [aliases legacy que encontraste]
  math_n1: ['math_l1', 'level1', 'n1'],
  math_n2: ['math_l2', 'level2', 'n2'],
  math_n3: ['math_l3', 'level3', 'n3'],
  math_n4: ['math_l4', 'level4', 'n4'],
};


function isApproved(d) {
  if (!d) return false;
  if ((d.passes_count || 0) > 0) return true;
  return !!d?.last_result?.passed;
}

function asMillis(v) {
  // admite admin.firestore.Timestamp, Date, string ISO o número
  try {
    if (!v) return 0;
    if (typeof v.toMillis === 'function') return v.toMillis();
    if (v instanceof Date) return v.getTime();
    const n = Number(v);
    if (Number.isFinite(n)) return n;
    const d = new Date(v);
    return Number.isFinite(d.getTime()) ? d.getTime() : 0;
  } catch { return 0; }
}

function pickBestNumber(...vals) {
  const nums = vals.map(Number).filter(v => Number.isFinite(v));
  return nums.length ? Math.max(...nums) : null;
}

function pickLatestResult(a, b) {
  const ma = asMillis(a?.last_result?.at);
  const mb = asMillis(b?.last_result?.at);
  return ma >= mb ? (a?.last_result || null) : (b?.last_result || null);
}

function mergeProgress(canonData, legDataArr = []) {
  const all = [canonData, ...legDataArr].filter(Boolean);
  if (all.length === 0) return null;

  const best_apm = pickBestNumber(
    ...all.map(d => d.best_apm),
    ...all.map(d => d.last_result?.apm)
  );

  const best_acc = pickBestNumber(
    ...all.map(d => d.best_acc),
    ...all.map(d => d.last_result?.acc)
  );

  const best_tries = pickBestNumber(...all.map(d => d.best_tries)) ?? 0;

  const passes_count = Math.max(0, ...all.map(d => Number(d.passes_count || 0)));
  // último resultado más reciente
  let last = canonData || null;
  for (const d of legDataArr) last = { last_result: pickLatestResult(last, d) };
  const last_result = last?.last_result || null;

  return {
    best_apm: best_apm ?? null,
    best_acc: best_acc ?? null,
    best_tries: best_tries ?? 0,
    passes_count: passes_count || (isApproved({ last_result }) ? 1 : 0),
    last_result: last_result || null,
    updatedAt: FieldValue.serverTimestamp(),
  };
}

async function migrateUser(uid) {
  const subCol = db.collection('users').doc(uid).collection('progress');
  const snap = await subCol.get();
  const map = {};
  snap.forEach(d => { map[d.id] = d.data() || {}; });

  const ops = [];

  for (const canon of Object.keys(LEVELS_CANON)) {
    const legacyIds = LEVELS_CANON[canon];
    const canonData = map[canon] || null;
    const legacyDataArr = legacyIds.map(id => map[id]).filter(Boolean);

    if (!canonData && legacyDataArr.length === 0) continue; // nada que mover

    const merged = mergeProgress(canonData, legacyDataArr);
    if (!merged) continue;

    // metadata de migración
    merged.migratedFrom = legacyIds.filter(id => !!map[id]);
    merged.migratedAt = FieldValue.serverTimestamp();

    const canonRef = subCol.doc(canon);

    if (DRY_RUN) {
      ops.push({ type: 'SET', path: `users/${uid}/progress/${canon}`, data: merged });
    } else {
      await canonRef.set(merged, { merge: true });
    }

    // Legacy: borrar o marcar como deprecated
    for (const leg of legacyIds) {
      if (!map[leg]) continue;
      const legRef = subCol.doc(leg);
      if (DELETE_LEGACY) {
        if (DRY_RUN) {
          ops.push({ type: 'DELETE', path: `users/${uid}/progress/${leg}` });
        } else {
          await legRef.delete();
        }
      } else {
        const dep = { deprecated: true, migratedTo: canon, migratedAt: FieldValue.serverTimestamp() };
        if (DRY_RUN) {
          ops.push({ type: 'SET', path: `users/${uid}/progress/${leg}`, data: dep });
        } else {
          await legRef.set(dep, { merge: true });
        }
      }
    }
  }

  return ops;
}

(async () => {
  console.log(`→ Migración iniciada. DRY_RUN=${DRY_RUN}  DELETE_LEGACY=${DELETE_LEGACY}`);
  const usersSnap = await db.collection('users').get();
  let usersProcessed = 0;
  let simOps = 0;

  for (const doc of usersSnap.docs) {
    const uid = doc.id;
    try {
      const ops = await migrateUser(uid);
      usersProcessed++;
      if (DRY_RUN && ops?.length) {
        console.log(`\n[SIM] uid=${uid}`);
        ops.forEach(op => console.log(op.type, op.path));
        simOps += ops.length;
      }
      if (usersProcessed % 50 === 0) {
        console.log(`… procesados ${usersProcessed}/${usersSnap.size}`);
      }
    } catch (e) {
      console.error(`✖ Error migrando uid=${uid}:`, e.message || e);
    }
  }

  console.log(`\n✔ Listo. Usuarios procesados: ${usersProcessed}. ${DRY_RUN ? `Operaciones simuladas: ${simOps}` : 'Datos escritos en Firestore.'}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
