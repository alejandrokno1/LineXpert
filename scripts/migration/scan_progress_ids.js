require('dotenv').config();
const fs = require('fs');
const admin = require('firebase-admin');

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credPath || !fs.existsSync(credPath)) throw new Error('Falta GOOGLE_APPLICATION_CREDENTIALS en .env');
const sa = JSON.parse(fs.readFileSync(credPath, 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa), projectId: process.env.FIREBASE_PROJECT_ID || sa.project_id });
const db = admin.firestore();

(async () => {
  const users = await db.collection('users').limit(3000).get();
  const ids = new Map();
  for (const u of users.docs) {
    const sub = await db.collection('users').doc(u.id).collection('progress').get();
    sub.forEach(d => ids.set(d.id, (ids.get(d.id) || 0) + 1));
  }
  console.log('IDs de progress encontrados (id → cantidad de usuarios que lo tienen):');
  [...ids.entries()].sort((a,b)=>b[1]-a[1]).forEach(([k,v]) => console.log(`${k} → ${v}`));
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
