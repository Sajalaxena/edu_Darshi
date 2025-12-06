// simple client-side auth for demo ONLY
const ADMIN_CRED = { username: "admin", password: "Admin@123" }; // change locally

export function login(username, password) {
  // returns token (string) on success else null
  if (username === ADMIN_CRED.username && password === ADMIN_CRED.password) {
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
