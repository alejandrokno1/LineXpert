/**
 * Backup simple de users y progress a JSON (por si no usas gcloud export).
 *
 * Requisitos:
 * - .env con GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
 * - (Opcional) FIREBASE_PROJECT_ID si no viene en el JSON
 *
 * Ejecutar desde scripts/migration:
 *   npm run backup   // o: node backup_export.js
 *
 * Salida:
 *   scripts/migration/backup/users.json
 *   scripts/migration/backup/progress.json
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

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

(async () => {
  const outDir = path.resolve(process.cwd(), 'backup');
  fs.mkdirSync(outDir, { recursive: true });

  const db = init();

  // Export users
  const usersSnap = await db.collection('users').get();
  const users = {};
  for (const doc of usersSnap.docs) {
    users[doc.id] = doc.data();
  }
  fs.writeFileSync(path.join(outDir, 'users.json'), JSON.stringify(users, null, 2));

  // Export progress per user
  const progressAll = {};
  for (const doc of usersSnap.docs) {
    const uid = doc.id;
    const sub = await db.collection('users').doc(uid).collection('progress').get();
    progressAll[uid] = {};
    sub.forEach(d => { progressAll[uid][d.id] = d.data(); });
  }
  fs.writeFileSync(path.join(outDir, 'progress.json'), JSON.stringify(progressAll, null, 2));

  console.log(`✔ Backup listo en ${outDir}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
