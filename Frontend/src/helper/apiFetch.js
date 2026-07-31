import { setAccessToken,
    getAccessToken,
    clearAccessToken } from './authToken';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const apiFetch = async (url, options = {}) => {
    const token = getAccessToken();    
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };

    let res = await fetch(url, { ...options, headers, credentials: 'include' });

    if (res.status === 401) {
        const refreshed = await refreshAccessToken();        
        if (refreshed) {
            return apiFetch(url, options);
        } else {
            clearAccessToken();
            throw new Error("Session expired. Please log in again.");
        }
    }
    if (!res.ok) {
        const data = await res.json();
        console.error(data.error);
        throw new Error(data.error);
    }


    return res;
};

const refreshAccessToken = async () => {
    try {
        const res = await fetch(`${API_BASE}/api/auth/token`, { method: 'POST', credentials: 'include' });
        if (!res.ok) {
            return false;
        }

        const data = await res.json();
        setAccessToken(data.accessToken);
        return true;
    } catch (err) {
        console.error("Refresh token failed:", err);
        return false;
    }
};