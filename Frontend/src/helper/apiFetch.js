import { setAccessToken,
    getAccessToken,
    clearAccessToken } from './authToken';

const configuredApiBase = import.meta.env.VITE_API_BASE_URL || '';
// Render's `host` service property is a hostname, while fetch needs an absolute
// URL when the frontend and backend are separate services.
const API_BASE = configuredApiBase && !/^https?:\/\//i.test(configuredApiBase)
    ? `https://${configuredApiBase}`
    : configuredApiBase.replace(/\/$/, '');

export const apiUrl = (url) => `${API_BASE}${url}`;

export const apiFetch = async (url, options = {}) => {
    const token = getAccessToken();    
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };

    let res = await fetch(apiUrl(url), { ...options, headers, credentials: 'include' });

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
        const contentType = res.headers.get('content-type') || '';
        const data = contentType.includes('application/json')
            ? await res.json()
            : { error: await res.text() };
        throw new Error(data.error || `Request failed with status ${res.status}`);
    }


    return res;
};

const refreshAccessToken = async () => {
    try {
        const res = await fetch(apiUrl('/api/auth/token'), { method: 'POST', credentials: 'include' });
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
