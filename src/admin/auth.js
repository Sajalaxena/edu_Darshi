// simple client-side auth for demo ONLY
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function login(username, password) {
  // returns token (string) on success else null
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = btoa(`${username}:${Date.now()}`); // demo token
    localStorage.setItem("admin_token", token);
    return token;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("admin_token");
}
