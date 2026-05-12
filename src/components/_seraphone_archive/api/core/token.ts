export const getToken = (): string | null => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token || token === 'null' || token === 'undefined') return null;
    return token;
  } catch {
    return null;
  }
};

export const setToken = (token: string): void => {
  try {
    localStorage.setItem('authToken', token);
  } catch (e) {
    console.error('Could not set token in localStorage', e);
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {
    console.error('Could not remove token from localStorage', e);
  }
};