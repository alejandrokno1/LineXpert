// /servicios/auth.js
// Carga perezosa de Firebase + utilidades de Auth/Firestore.
// Expone window.LX y emite 'lx-auth-ready' al cambiar el uid.

let _ctxPromise = null;
let _observerSet = false;
let _lastUid = undefined;

/* ────────────────────────────────────────────────────────────
   0) Niveles: canónicos, alias legacy y puntos por nivel
   ──────────────────────────────────────────────────────────── */
export const LEVELS_CANON = Object.freeze({
  math_n1: ['math_l1'],
  math_n2: ['math_l2'],
  math_n3: ['math_l3'],
  math_n4: ['math_l4'],
  math_n5: ['math_l5'],
  math_n6: ['math_l6'],
  math_n7: ['math_l7'],
  math_n8: ['math_l8'],
});
export const LEVEL_POINTS = Object.freeze({
  math_n1: 10, math_n2: 10, math_n3: 10, math_n4: 10,
  math_n5: 10, math_n6: 10, math_n7: 10, math_n8: 10,
});
const LEGACY_TO_CANON = Object.freeze(
  Object.fromEntries(
    Object.entries(LEVELS_CANON).flatMap(([canon, arr]) => arr.map(a => [a, canon]))
  )
);
const ALL_LEVEL_IDS = Object.freeze([
  ...Object.keys(LEVELS_CANON),
  ...Object.values(LEVELS_CANON).flat()
]);

function _canonOf(id) {
  if (LEVELS_CANON[id]) return id;
  if (LEGACY_TO_CANON[id]) return LEGACY_TO_CANON[id];
  return null; // ID fuera del mapa conocido
}
function _groupIdsFor(id) {
  const canon = _canonOf(id) ?? id;
  return [canon, ...(LEVELS_CANON[canon] || [])];
}
function _isApproved(docData) {
  if (!docData) return false;
  if ((docData.passes_count || 0) > 0) return true;
  return !!docData.last_result?.passed;
}

/* ────────────────────────────────────────────────────────────
   1) Config de tu proyecto
   ──────────────────────────────────────────────────────────── */
const firebaseConfig = {
  apiKey: "AIzaSyBRXyvhPX2ADJ159wyNKVMECjRfcb3jnfc",
  authDomain: "linexpert-web.firebaseapp.com",
  projectId: "linexpert-web",
  storageBucket: "linexpert-web.firebasestorage.app",
  messagingSenderId: "1080290678266",
  appId: "1:1080290678266:web:440426e302bd17eb8e4043",
};

/* ────────────────────────────────────────────────────────────
   2) Bootstrap perezoso
   ──────────────────────────────────────────────────────────── */
async function ensureAuth() {
  if (_ctxPromise) return _ctxPromise;

  _ctxPromise = (async () => {
    const [
      { initializeApp, getApps, getApp },
      authMod,
      fsMod
    ] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"),
    ]);

    const app  = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const auth = authMod.getAuth(app);
    const db   = fsMod.getFirestore(app);

    try { await authMod.setPersistence(auth, authMod.browserLocalPersistence); } catch {}

    if (!_observerSet) {
      _observerSet = true;
      authMod.onAuthStateChanged(auth, async (user) => {
        // Nombre legible por defecto en anónimo
        if (user?.isAnonymous && !user.displayName) {
          try { await authMod.updateProfile(user, { displayName: "Invitado" }); } catch {}
        }
        // Asegura doc del usuario
        if (user) {
          await ensureUserDoc(user.uid, {
            displayName: user.displayName ?? "Invitado",
            photoURL: user.photoURL ?? null,
            providerId: user.isAnonymous
              ? "anonymous"
              : (user.providerData?.[0]?.providerId ?? "custom"),
          });
        }

        // API global mínima para tu UI
        window.LX = {
          app, auth, db,
          uid: user?.uid || null,
          LEVELS_CANON, LEVEL_POINTS,
          // helpers expuestos por compat
          saveProgress, loadProgress, subscribeLeaderboard, recalcMyPoints,
          signInWithGoogle, signInWithGoogleRedirect, checkRedirectResult, signOut: signOutUser,
        };

        if (_lastUid !== user?.uid) {
          _lastUid = user?.uid;
          window.dispatchEvent(new Event("lx-auth-ready"));
        }
      });
    }

    return { app, auth, db, authMod, fsMod };
  })();

  return _ctxPromise;
}

/* ────────────────────────────────────────────────────────────
   3) Firestore helpers
   ──────────────────────────────────────────────────────────── */
async function ensureUserDoc(uid, profile = {}) {
  const { db, fsMod } = await ensureAuth();
  const ref  = fsMod.doc(db, "users", uid);
  const snap = await fsMod.getDoc(ref);

  if (!snap.exists()) {
    await fsMod.setDoc(ref, {
      uid,
      displayName: profile.displayName ?? "Invitado",
      public_name: profile.displayName ?? "Invitado",   // para ranking público
      photoURL: profile.photoURL ?? null,
      provider: profile.providerId ?? "anonymous",
      total_points: 0,
      createdAt: fsMod.serverTimestamp(),
      lastLogin: fsMod.serverTimestamp(),
    }, { merge: true });
  } else {
    await fsMod.setDoc(ref, { lastLogin: fsMod.serverTimestamp() }, { merge: true });
  }
}

async function _readProgressDoc(fsMod, db, uid, levelId) {
  const ref  = fsMod.doc(db, "users", uid, "progress", levelId);
  const snap = await fsMod.getDoc(ref);
  return { ref, exists: snap.exists(), data: snap.exists() ? snap.data() : null };
}

async function _readGroupState(fsMod, db, uid, anyIdInGroup) {
  const ids = _groupIdsFor(anyIdInGroup);
  const out = {};
  const snaps = await Promise.all(ids.map(id => _readProgressDoc(fsMod, db, uid, id)));
  snaps.forEach((s, i) => { out[ids[i]] = s.data; });
  const anyApproved = ids.some(id => _isApproved(out[id]));
  return { byId: out, anyApproved, ids };
}

/* Guardar progreso con anti-doble puntaje (canónico + legacy) */
export async function saveProgress(levelId, data) {
  const { auth, db, fsMod } = await ensureAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("No hay usuario autenticado (uid null).");

  await ensureUserDoc(uid, {
    displayName: auth.currentUser?.displayName ?? "Invitado",
    photoURL: auth.currentUser?.photoURL ?? null,
    providerId: auth.currentUser?.isAnonymous
      ? "anonymous"
      : (auth.currentUser?.providerData?.[0]?.providerId ?? "custom"),
  });

  // Estado previo del grupo (canónico + legacy)
  const { byId: group, anyApproved } = await _readGroupState(fsMod, db, uid, levelId);
  const prev = group[levelId] || null;

  // Compute bests
  let best_apm = data.apm ?? 0;
  let best_acc = data.acc ?? 0;
  if (prev) {
    const prevA = prev.best_apm ?? 0;
    const prevP = prev.best_acc ?? 0;
    const better = (best_apm > prevA) || (best_apm === prevA && best_acc > prevP);
    if (!better) { best_apm = prevA; best_acc = prevP; }
  }
  const best_tries = Math.max(prev?.best_tries ?? 0, data.tries ?? 0);
  const prevPasses = prev?.passes_count ?? 0;
  const newPasses  = prevPasses + (data.passed ? 1 : 0);

  // Persistir en el mismo ID recibido (soporta canónico o legacy)
  const { ref } = await _readProgressDoc(fsMod, db, uid, levelId);
  await fsMod.setDoc(ref, {
    best_apm, best_acc, best_tries, passes_count: newPasses,
    last_result: {
      apm: data.apm ?? null,
      acc: data.acc ?? null,
      tries: data.tries ?? null,
      ok: data.ok ?? null,
      passed: !!data.passed,
      at: fsMod.serverTimestamp(),
    },
    updatedAt: fsMod.serverTimestamp(),
  }, { merge: true });

  // Otorgamiento: solo si esta es la PRIMERA aprobación del grupo
  const award = (data.passed && !anyApproved) ? (data.points ?? LEVEL_POINTS[_canonOf(levelId)] ?? 10) : 0;
  if (award > 0) {
    await fsMod.setDoc(fsMod.doc(db, "users", uid), { total_points: fsMod.increment(award) }, { merge: true });
  }
  return { awarded: award };
}

export async function loadProgress(levelId) {
  const { auth, db, fsMod } = await ensureAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return null;
  const { data } = await _readProgressDoc(fsMod, db, uid, levelId);
  return data;
}

/* Leaderboard por total_points */
export async function subscribeLeaderboard(cb, topN = 10) {
  const { db, fsMod } = await ensureAuth();
  const q = fsMod.query(
    fsMod.collection(db, "users"),
    fsMod.orderBy("total_points", "desc"),
    fsMod.limit(topN)
  );
  return fsMod.onSnapshot(q, (snap) => {
    const rows = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
    cb(rows);
  });
}

/* Recalcular puntos del usuario con deduplicación por canónico */
export async function recalcMyPoints(pointsByLevel) {
  const { auth, db, fsMod } = await ensureAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return 0;

  const defaultPoints = pointsByLevel && Object.keys(pointsByLevel).length
    ? pointsByLevel
    : LEVEL_POINTS;

  // Leer todos los progress del usuario una sola vez
  const progSnap = await fsMod.getDocs(fsMod.collection(db, "users", uid, "progress"));
  const map = {};
  progSnap.forEach(doc => { map[doc.id] = doc.data() || {}; });

  // Para cada canónico, sumar una sola vez si canónico o cualquier alias está aprobado
  let total = 0;
  for (const canon of Object.keys(LEVELS_CANON)) {
    const ids = _groupIdsFor(canon);
    const approved = ids.some(id => _isApproved(map[id]));
    if (approved) total += (defaultPoints[canon] ?? 0);
  }

  await fsMod.setDoc(fsMod.doc(db, "users", uid), { total_points: total }, { merge: true });
  return total;
}

/* ────────────────────────────────────────────────────────────
   4) Auth helpers básicos
   ──────────────────────────────────────────────────────────── */
export async function warm() { return ensureAuth(); }

export async function onAuth(callback, { ensureAnonymous = true } = {}) {
  const { auth, authMod } = await ensureAuth();
  if (ensureAnonymous && !auth.currentUser) {
    try { await authMod.signInAnonymously(auth); } catch {}
  }
  return authMod.onAuthStateChanged(auth, callback);
}

export async function signInAnon() {
  const { auth, authMod } = await ensureAuth();
  return authMod.signInAnonymously(auth);
}

export async function signInWithEmail(email, password) {
  const { auth, authMod } = await ensureAuth();
  const res = await authMod.signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(res.user.uid);
  return res.user;
}

export async function signUpWithEmail(email, password, name) {
  const { auth, authMod } = await ensureAuth();
  let user;
  if (auth.currentUser && auth.currentUser.isAnonymous) {
    const cred = authMod.EmailAuthProvider.credential(email, password);
    const res = await authMod.linkWithCredential(auth.currentUser, cred);
    user = res.user;
  } else {
    const res = await authMod.createUserWithEmailAndPassword(auth, email, password);
    user = res.user;
  }
  if (name && name.length >= 2) {
    try { await authMod.updateProfile(user, { displayName: name }); } catch {}
  }
  await ensureUserDoc(user.uid, { displayName: name });
  return user;
}

/* ────────────────────────────────────────────────────────────
   5) Recuperar contraseña / sign-in methods
   ──────────────────────────────────────────────────────────── */
export async function sendPasswordReset(email, continueUrl = location.origin) {
  const { auth, authMod } = await ensureAuth();
  const settings = { url: continueUrl };
  await authMod.sendPasswordResetEmail(auth, email, settings);
}

export async function getSignInMethods(email) {
  const { auth, authMod } = await ensureAuth();
  return authMod.fetchSignInMethodsForEmail(auth, email);
}

/* Vincular email+clave a una cuenta iniciada */
export async function linkEmailPasswordToCurrentUser(email, password) {
  const { auth, authMod } = await ensureAuth();
  if (!auth.currentUser) throw new Error('No hay sesión iniciada');
  const cred = authMod.EmailAuthProvider.credential(email, password);
  const res  = await authMod.linkWithCredential(auth.currentUser, cred);
  await ensureUserDoc(res.user.uid);
  return res.user;
}

/* ────────────────────────────────────────────────────────────
   6) Google (popup con fallback a redirect)
   ──────────────────────────────────────────────────────────── */
function shouldPreferRedirect() {
  const host = location.hostname;
  const ua = navigator.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
  const onGitHubPages = /github\.io$/.test(host);
  return isSafari || onGitHubPages;
}

export async function signInWithGoogle() {
  const { auth, authMod } = await ensureAuth();
  const provider = new authMod.GoogleAuthProvider();

  if (shouldPreferRedirect()) {
    await authMod.signInWithRedirect(auth, provider);
    return null;
  }

  try {
    const res = await authMod.signInWithPopup(auth, provider);
    await ensureUserDoc(res.user.uid);
    return res.user;
  } catch (err) {
    const code = String(err?.code || "");
    const needsRedirect =
      code.includes("popup") ||
      code.includes("unauthorized-domain") ||
      code.includes("operation-not-supported");
    if (needsRedirect) {
      await authMod.signInWithRedirect(auth, provider);
      return null;
    }
    throw err;
  }
}

export async function signInWithGoogleRedirect() {
  const { auth, authMod } = await ensureAuth();
  const provider = new authMod.GoogleAuthProvider();
  await authMod.signInWithRedirect(auth, provider);
}

export async function checkRedirectResult() {
  const { auth, authMod } = await ensureAuth();
  try {
    const res = await authMod.getRedirectResult(auth);
    if (res?.user) {
      await ensureUserDoc(res.user.uid);
    }
  } catch (e) { /* opcional: console.debug(e) */ }
}

export async function signOutUser() {
  const { auth, authMod } = await ensureAuth();
  await authMod.signOut(auth);
}

/* ────────────────────────────────────────────────────────────
   7) Nombre público (ranking)
   ──────────────────────────────────────────────────────────── */
function _normUsername(name) {
  return (name || "").trim().toLowerCase()
    .replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").slice(0, 24);
}

// Mapea public_names/{slug} -> { uid } y guarda public_name en users/{uid}
export async function claimPublicName(desiredName) {
  const { auth, db, fsMod } = await ensureAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Debes iniciar sesión.");

  const clean = _normUsername(desiredName);
  if (clean.length < 3) throw new Error("Nombre público mínimo 3 caracteres (a-z, 0-9, _).");

  await fsMod.runTransaction(db, async (tx) => {
    const nameRef = fsMod.doc(db, "public_names", clean);
    const nameSnap = await tx.get(nameRef);
    const takenBy = nameSnap.exists() ? nameSnap.data().uid : null;
    if (takenBy && takenBy !== user.uid) throw new Error("Ese nombre ya está en uso.");

    tx.set(nameRef, { uid: user.uid, at: fsMod.serverTimestamp() });
    tx.set(fsMod.doc(db, "users", user.uid), {
      public_name: desiredName,
      displayName: desiredName
    }, { merge: true });
  });

  return clean;
}
