/**
 * Migración de progreso: math_l*  ->  math_n*
 * - Copia/mergea best_apm, best_acc, best_tries, passes_count, last_result
 * - Añade metadata: migratedFrom, migratedAt
 * - Opcional: borra legacy (DELETE_LEGACY=true) o marca deprecated
 * - Idempotente y segura (DRY_RUN=true para simular)
 */
require('dotenv').config();
const fs = require('fs');
const admin = require('firebase-admin');

const DRY_RUN = String(process.env.DRY_RUN || 'true').toLowerCase() === 'true';
const DELETE_LEGACY = String(process.env.DELETE_LEGACY || 'false').toLowerCase() === 'true';

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

const LEVELS_CANON = {
  math_n1: ['math_l1'],
  math_n2: ['math_l2'],
  math_n3: ['math_l3'],
  math_n4: ['math_l4'],
};

function isApproved(d) {
  if (!d) return false;
  if ((d.passes_count || 0) > 0) return true;
  return !!d?.last_result?.passed;
}
function pickBestNumber(...vals) {
  const nums = vals.map(Number).filter(v => Number.isFinite(v));
  return nums.length ? Math.max(...nums) : null;
}
function pickLatest(a, b) {
  // retorna el last_result "más nuevo" por timestamp si ambos existen
  const atA = a?.last_result?.at?.toMillis ? a.last_result.at.toMillis() : 0;
  const atB = b?.last_result?.at?.toMillis ? b.last_result.at.toMillis() : 0;
  return atA >= atB ? a?.last_result || null : b?.last_result || null;
}
function mergeProgress(canonData, legDataArr = []) {
  const all = [canonData, ...legDataArr].filter(Boolean);
  if (all.length === 0) return null;

  const best_apm   = pickBestNumber(
    ...all.map(d => d.best_apm),
    ...all.map(d => d.last_result?.apm)
  );
  const best_acc   = pickBestNumber(
    ...all.map(d => d.best_acc),
    ...all.map(d => d.last_result?.acc)
  );
  const best_tries = pickBestNumber(...all.map(d => d.best_tries)) ?? 0;

  const passes_count = Math.max(0, ...all.map(d => Number(d.passes_count || 0)));
  const last_result = legDataArr.reduce((acc, d) => pickLatest({last_result: acc}, d), canonData) || null;

  return {
    best_apm:   best_apm   ?? null,
    best_acc:   best_acc   ?? null,
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

    if (!canonData && legacyDataArr.length === 0) continue; // nada que migrar

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

    // Legacy: borrar o marcar deprecated
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
  let count = 0, totalOps = 0;

  for (const doc of usersSnap.docs) {
    const uid = doc.id;
    const ops = await migrateUser(uid);
    count++;
    totalOps += Array.isArray(ops) ? ops.length : 0;

    if (DRY_RUN && ops?.length) {
      console.log(`\n[SIM] uid=${uid}`);
      ops.forEach(op => console.log(op.type, op.path));
    }
    if (count % 50 === 0) console.log(`… procesados ${count}/${usersSnap.size}`);
  }

  console.log(`✔ Listo. Usuarios procesados: ${count}. ${DRY_RUN ? `Ops simuladas: ${totalOps}` : 'Datos escritos en Firestore.'}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
