const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const ROLE_KEY = "user_role";

const ROLE_ALIASES = {
  superadmin: "super_admin",
  super_admin: "super_admin",
  admin: "admin",
  employee: "employee",
};

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EMPLOYEE: "employee",
};

export function normalizeRole(role) {
  if (!role) return null;
  return ROLE_ALIASES[String(role).toLowerCase()] || null;
}

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getTokenClaims() {
  const token = getAccessToken();
  if (!token) return null;
  return parseJwt(token);
}

function getRoleFromClaims(claims) {
  if (!claims) return null;
  return normalizeRole(
    claims.role || claims.user_role || claims.roles?.[0] || claims.authorities?.[0]
  );
}

export function storeAuthTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  const claims = parseJwt(access);
  const role = getRoleFromClaims(claims);
  if (role) localStorage.setItem(ROLE_KEY, role);
  return role;
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
  if (!accessToken) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  const claims = parseJwt(accessToken);
  const role = getRoleFromClaims(claims);
  if (role) localStorage.setItem(ROLE_KEY, role);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getUserRole() {
  const claims = getTokenClaims();
  if (!claims) return null;
  return getRoleFromClaims(claims) || normalizeRole(localStorage.getItem(ROLE_KEY));
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function getUserDisplayName() {
  const claims = getTokenClaims();
  if (!claims) return "Guest";
  const fullName = [claims.first_name, claims.last_name].filter(Boolean).join(" ");
  return fullName || claims.username || "User";
}

export function getDefaultRouteByRole(role) {
  const normalizedRole = normalizeRole(role);
  if (normalizedRole === ROLES.EMPLOYEE) return "/attendance";
  return "/dashboard";
}

export function canAccessRole(role, allowedRoles = []) {
  const normalizedRole = normalizeRole(role);
  return allowedRoles.some((r) => normalizeRole(r) === normalizedRole);
}
