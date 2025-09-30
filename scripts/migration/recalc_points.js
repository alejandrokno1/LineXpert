/**
 * Recalcula users/{uid}.total_points con deduplicación por canónico.
 * Suma 10 puntos por cada nivel aprobado (math_n1..n4).
 */
require('dotenv').config();
const fs = require('fs');
const admin = require('firebase-admin');

const DRY_RUN = String(process.env.DRY_RUN || 'true').toLowerCase() === 'true';

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

const LEVELS_CANON = {
  // canónico : [aliases legacy que encontraste]
  math_n1: ['math_l1', 'level1', 'n1'],
  math_n2: ['math_l2', 'level2', 'n2'],
  math_n3: ['math_l3', 'level3', 'n3'],
  math_n4: ['math_l4', 'level4', 'n4'],
};

const LEVEL_POINTS = {
  math_n1: 10,
  math_n2: 10,
  math_n3: 10,
  math_n4: 10,
};
function isApproved(d) {
  if (!d) return false;
  if ((d.passes_count || 0) > 0) return true;
  return !!d?.last_result?.passed;
}

async function recalcUser(uid) {
  const sub = await db.collection('users').doc(uid).collection('progress').get();
  const map = {};
  sub.forEach(d => { map[d.id] = d.data() || {}; });

  let total = 0;
  for (const canon of Object.keys(LEVELS_CANON)) {
    const ids = [canon, ...LEVELS_CANON[canon]];
    const approved = ids.some(id => isApproved(map[id]));
    if (approved) total += (LEVEL_POINTS[canon] || 0);
  }
  const userRef = db.collection('users').doc(uid);
  if (DRY_RUN) {
    return { uid, total };
  } else {
    await userRef.set({ total_points: total }, { merge: true });
    return { uid, total, written: true };
  }
}

(async () => {
  console.log(`→ Recalc total_points. DRY_RUN=${DRY_RUN}`);
  const usersSnap = await db.collection('users').get();
  let count = 0;
  for (const doc of usersSnap.docs) {
    const uid = doc.id;
    const res = await recalcUser(uid);
    if (DRY_RUN) console.log(`[SIM] uid=${uid} → total=${res.total}`);
    count++;
    if (count % 50 === 0) console.log(`… procesados ${count}/${usersSnap.size}`);
  }
  console.log(`✔ Listo. Usuarios procesados: ${count}. ${DRY_RUN ? 'Nada escrito.' : 'total_points actualizado.'}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
