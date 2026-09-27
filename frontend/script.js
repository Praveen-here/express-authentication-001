const TOKEN_KEY = 'token';

const authView = document.getElementById('auth-view');
const profileView = document.getElementById('profile-view');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageEl = document.getElementById('message');

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type || ''}`;
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  loginForm.classList.toggle('hidden', tab !== 'login');
  registerForm.classList.toggle('hidden', tab !== 'register');
  showMessage('');
}

async function api(path, options = {}) {
  const res = await fetch(`/api/auth${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function loadProfile() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return showAuth();

  const { ok, data } = await api('/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!ok) {
    localStorage.removeItem(TOKEN_KEY);
    return showAuth();
  }

  document.getElementById('profile-name').textContent = data.user.name;
  document.getElementById('profile-email').textContent = data.user.email;
  authView.classList.add('hidden');
  profileView.classList.remove('hidden');
}

function showAuth() {
  profileView.classList.add('hidden');
  authView.classList.remove('hidden');
}

document.querySelectorAll('.tab').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(loginForm);
  const { ok, data } = await api('/login', {
    method: 'POST',
    body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
  });

  if (!ok) return showMessage(data.message || 'Login failed', 'error');

  localStorage.setItem(TOKEN_KEY, data.token);
  loginForm.reset();
  showMessage('Login successful', 'success');
  loadProfile();
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(registerForm);
  const { ok, data } = await api('/register', {
    method: 'POST',
    body: JSON.stringify({
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
    }),
  });

  if (!ok) return showMessage(data.message || 'Registration failed', 'error');

  registerForm.reset();
  switchTab('login');
  showMessage('Account created. You can log in now.', 'success');
});

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem(TOKEN_KEY);
  showAuth();
  showMessage('Logged out', 'success');
});

loadProfile();
