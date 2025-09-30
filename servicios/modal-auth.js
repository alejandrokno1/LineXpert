// /servicios/modal-auth.js
import {
  onAuth, signOutUser,
  signInWithEmail, signUpWithEmail,
  claimPublicName,
  signInWithGoogle,          // popup con fallback a redirect
  // signInWithGoogleRedirect, // usa esta si prefieres SIEMPRE redirect
  sendPasswordReset,         // recuperar contraseña
  getSignInMethods           // comprobar métodos del correo
} from './auth.js';

const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

/* =============== Cargar/injectar el HTML del modal si falta =============== */
async function ensureModalMarkup() {
  if (document.getElementById('lx-auth-modal')) return;
  try {
    const res = await fetch('./servicios/modal-auths.html', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    const node = tpl.content.firstElementChild;
    if (node) document.body.appendChild(node);
  } catch (e) {
    console.warn('No se pudo cargar servicios/modal-auths.html. Insertando fallback mínimo.', e);
    // Fallback MUY básico (por si el fetch falla)
    const fallback = document.createElement('div');
    fallback.id = 'lx-auth-modal';
    fallback.className = 'lx-auth-backdrop';
    fallback.hidden = true;
    fallback.innerHTML = `
      <div class="lx-auth-card" role="dialog" aria-modal="true">
        <button class="lx-auth-close" data-auth-close aria-label="Cerrar">&times;</button>
        <div class="lx-auth-tabs" role="tablist">
          <button class="lx-auth-tab is-active" data-panel="login" role="tab" aria-selected="true">Acceder</button>
          <button class="lx-auth-tab" data-panel="register" role="tab" aria-selected="false">Registrarse</button>
        </div>
        <section class="lx-auth-panel" data-panel="login">
          <form id="lx-form-login" class="lx-auth-form">
            <label>Correo <input class="lx-auth-input" type="email" id="lx-login-email" required /></label>
            <label>Contraseña <input class="lx-auth-input" type="password" id="lx-login-pass" minlength="6" required /></label>
            <button type="submit" class="lx-btn lx-btn--primary lx-btn--full">Ingresar</button>
            <p class="lx-muted" style="margin-top:.5rem">¿Olvidaste tu contraseña?
              <button class="lx-link" type="button" id="lx-forgot">Restablécela</button>
            </p>
            <div class="lx-sep"><span>o</span></div>
            <button type="button" id="lx-login-google" class="lx-btn lx-btn--google lx-btn--full">Continuar con Google</button>
            <p class="lx-msg" id="lx-login-msg"></p>
          </form>
        </section>
        <section class="lx-auth-panel" data-panel="register" hidden>
          <form id="lx-form-register" class="lx-auth-form">
            <label>Nombre público <input class="lx-auth-input" type="text" id="lx-reg-name" minlength="3" maxlength="24" required /></label>
            <label>Correo <input class="lx-auth-input" type="email" id="lx-reg-email" required /></label>
            <label>Contraseña <input class="lx-auth-input" type="password" id="lx-reg-pass" minlength="6" required /></label>
            <label>Repite contraseña <input class="lx-auth-input" type="password" id="lx-reg-pass2" minlength="6" required /></label>
            <button type="submit" class="lx-btn lx-btn--primary lx-btn--full">Crear cuenta</button>
            <div class="lx-sep"><span>o</span></div>
            <button type="button" id="lx-reg-google" class="lx-btn lx-btn--google lx-btn--full">Continuar con Google</button>
            <p class="lx-msg" id="lx-reg-msg"></p>
          </form>
        </section>
      </div>`;
    document.body.appendChild(fallback);
  }
}

/* =============== UI helpers =============== */
function setPanel(which) {
  $$('.lx-auth-tab').forEach(b => {
    const act = b.dataset.panel === which;
    b.classList.toggle('is-active', act);
    b.setAttribute('aria-selected', String(act));
  });
  $$('.lx-auth-panel').forEach(p => p.hidden = (p.dataset.panel !== which));
}

export async function openAuthModal(panel='login') {
  await ensureModalMarkup();
  const modal = $('#lx-auth-modal');
  if (!modal) { console.warn('Modal de auth no encontrado.'); return; }
  modal.hidden = false;
  setPanel(panel);
  $('#lx-auth-modal .lx-auth-panel:not([hidden]) input')?.focus();
}

function closeAuthModal() { $('#lx-auth-modal')?.setAttribute('hidden', ''); }

function niceAuthError(e){
  const code = String(e?.code||'');
  if (code.includes('email-already-in-use')) return 'Ese correo ya está registrado.';
  if (code.includes('invalid-email')) return 'Correo inválido.';
  if (code.includes('weak-password')) return 'La contraseña es muy débil (mínimo 6).';
  if (code.includes('wrong-password')) return 'Contraseña incorrecta.';
  if (code.includes('user-not-found')) return 'No existe una cuenta con ese correo.';
  if (code.includes('invalid-credential')) return 'Credenciales inválidas.';
  if (code.includes('too-many-requests')) return 'Demasiados intentos. Inténtalo más tarde.';
  if (code.includes('network-request-failed')) return 'Sin conexión. Revisa tu internet.';
  return e?.message || 'No se pudo completar la operación.';
}

function setBusy(btn, busy, busyText) {
  if (!btn) return;
  if (busy) {
    if (!btn.dataset._txt) btn.dataset._txt = btn.textContent.trim();
    if (busyText) btn.textContent = busyText;
    btn.disabled = true;
  } else {
    btn.disabled = false;
    if (btn.dataset._txt) btn.textContent = btn.dataset._txt;
  }
}

/* =============== Modal wiring =============== */
function wireModal() {
  const modal = $('#lx-auth-modal');
  if (!modal) return;

  const btnClose        = $('[data-auth-close]');
  const formLogin       = $('#lx-form-login');
  const formRegister    = $('#lx-form-register');
  const loginMsg        = $('#lx-login-msg');
  const regMsg          = $('#lx-reg-msg');
  const btnLoginSubmit  = formLogin?.querySelector('button[type="submit"]');
  const btnRegSubmit    = formRegister?.querySelector('button[type="submit"]');
  const btnGoogleLogin  = $('#lx-login-google');
  const btnGoogleReg    = $('#lx-reg-google');
  const btnForgot       = $('#lx-forgot');

  // Cerrar
  btnClose?.addEventListener('click', closeAuthModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeAuthModal(); });
  document.addEventListener('keydown', e => { if (!modal.hidden && e.key === 'Escape') closeAuthModal(); });

  // Tabs y saltos
  $$('.lx-auth-tab').forEach(b => b.addEventListener('click', () => setPanel(b.dataset.panel)));
  $$('[data-goto]').forEach(b => b.addEventListener('click', () => setPanel(b.dataset.goto)));

  // Login (email/contraseña)
  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMsg.textContent = 'Conectando…';
    setBusy(btnLoginSubmit, true, 'Ingresando…');
    try {
      await signInWithEmail($('#lx-login-email').value, $('#lx-login-pass').value);
      loginMsg.textContent = '¡Listo!';
      setTimeout(closeAuthModal, 160);
    } catch (err) {
      loginMsg.textContent = niceAuthError(err);
    } finally {
      setBusy(btnLoginSubmit, false);
    }
  });

  // Recuperar contraseña
  btnForgot?.addEventListener('click', async () => {
    const email = $('#lx-login-email').value.trim();
    if (!email) { loginMsg.textContent = 'Escribe tu correo arriba.'; return; }
    setBusy(btnForgot, true, 'Enviando…');
    try {
      const methods = await getSignInMethods(email);
      if (!methods.includes('password')) {
        loginMsg.textContent = methods.includes('google.com')
          ? 'Ese correo usa Google. Entra con “Continuar con Google”.'
          : 'No existe una cuenta con ese correo.';
        return;
      }
      await sendPasswordReset(email);
      loginMsg.textContent = 'Te enviamos un correo para restablecerla.';
    } catch (e) {
      loginMsg.textContent = niceAuthError(e);
    } finally {
      setBusy(btnForgot, false);
    }
  });

  // Registro (email/contraseña + nombre público)
  formRegister?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = $('#lx-reg-name').value.trim();
    const email = $('#lx-reg-email').value.trim();
    const p1    = $('#lx-reg-pass').value;
    const p2    = $('#lx-reg-pass2').value;

    if (p1 !== p2) { regMsg.textContent = 'Las contraseñas no coinciden.'; return; }

    regMsg.textContent = 'Creando cuenta…';
    setBusy(btnRegSubmit, true, 'Creando…');
    try {
      await signUpWithEmail(email, p1, name);
      await claimPublicName(name);
      regMsg.textContent = '¡Cuenta creada!';
      setTimeout(closeAuthModal, 180);
    } catch (err) {
      regMsg.textContent = niceAuthError(err);
    } finally {
      setBusy(btnRegSubmit, false);
    }
  });

  // Google (en ambas pestañas)
  const doGoogle = async () => {
    const active = $('.lx-auth-tab.is-active')?.dataset.panel || 'login';
    const msgEl  = active === 'login' ? loginMsg : regMsg;

    msgEl.textContent = 'Conectando con Google…';
    setBusy(btnGoogleLogin, true, 'Conectando…');
    setBusy(btnGoogleReg,   true, 'Conectando…');
    try {
      const u = await signInWithGoogle(); // cambia por signInWithGoogleRedirect() si quieres SIEMPRE redirect
      if (u === null) return; // redirigido
      msgEl.textContent = '¡Listo!';
      setTimeout(closeAuthModal, 160);
    } catch (err) {
      msgEl.textContent = niceAuthError(err);
    } finally {
      setBusy(btnGoogleLogin, false);
      setBusy(btnGoogleReg,   false);
    }
  };
  btnGoogleLogin?.addEventListener('click', doGoogle);
  btnGoogleReg?.addEventListener('click', doGoogle);
}

/* =============== Botón de cabecera (sin conflictos) =============== */
function wireHeaderButton() {
  const original = document.querySelector('#btn-auth');
  if (!original) return;

  // Limpia posibles listeners previos
  const clean = original.cloneNode(true);
  original.replaceWith(clean);
  const btnHdr = clean;

  onAuth(user => {
    const logged = !!user && !user.isAnonymous;
    btnHdr.textContent = logged ? 'Salir' : 'Entrar / Registrarse';
    btnHdr.onclick = async () => {
      if (btnHdr.disabled) return;
      if (logged) {
        btnHdr.disabled = true; btnHdr.textContent = 'Saliendo…';
        try { await signOutUser(); } finally { btnHdr.disabled = false; }
      } else {
        openAuthModal('login');
      }
    };
  }, { ensureAnonymous: true });

  // Enlaces que deben abrir el modal
  document.querySelectorAll('a[href="#auth"], a[href*="acceso"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      openAuthModal('login');
    });
  });

  // Evento custom opcional para abrir desde otros módulos
  window.addEventListener('lx-open-auth', () => openAuthModal('login'));
}

/* =============== Init =============== */
async function init() {
  await ensureModalMarkup();
  wireModal();
  wireHeaderButton();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
