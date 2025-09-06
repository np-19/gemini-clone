const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Stores the access token in local storage for session persistence.
 * @param {string} token - The access token to store.
 */
export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

/**
 * Retrieves the access token from local storage.
 * @returns {string | null} The stored access token, or null if it does not exist.
 */
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Clears the access token from local storage, effectively logging out the user.
 */
export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
