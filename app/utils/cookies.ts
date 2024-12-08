/**
 * Sets a cookie.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param expires - The expiration date of the cookie.
 */
const setCookie = (name: string, value: string, expires: Date): void => {
  const expiresString = `expires=${expires.toUTCString()}`;
  document.cookie = `${name}=${value};${expiresString};path=/`;
};

/**
 * Gets a cookie by name.
 * @param name - The name of the cookie.
 * @returns The value of the cookie, or null if not found.
 */
const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Removes a cookie by name.
 * @param name - The name of the cookie.
 */
const removeCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

const getRemainingTTL = (cookies: { [key: string]: string }, expirationCookieName: string) => {
  if (!cookies[expirationCookieName]) {
    return 0;
  }

  const tokenExpiration = new Date(cookies[expirationCookieName]);
  const currentTime = new Date();
  const timeRemaining = tokenExpiration.getTime() - currentTime.getTime();

  return timeRemaining > 0 ? timeRemaining : 0;
};

export { getRemainingTTL, setCookie, getCookie, removeCookie };
