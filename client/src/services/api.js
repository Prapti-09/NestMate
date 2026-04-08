let API_BASE = (import.meta.env.VITE_API_URL || 'https://nestmate-1.onrender.com/api').replace(/\/$/, '');
if (API_BASE && !API_BASE.endsWith('/api')) {
    API_BASE = `${API_BASE}/api`;
}

export const postRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return { error: errData.error || `Server error: ${response.status}` };
        }
        return await response.json();
    } catch (err) {
        return { error: 'Backend unreachable. Wake up Render server!' };
    }
};

export const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return { error: errData.error || `Server error: ${response.status}` };
        }
        return await response.json();
    } catch (err) {
        return { error: 'Backend unreachable. Wake up Render server!' };
    }
};

export const putRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return { error: errData.error || `Server error: ${response.status}` };
        }
        return await response.json();
    } catch (err) {
        return { error: 'Backend unreachable. Wake up Render server!' };
    }
};

export const deleteRequest = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return { error: errData.error || `Server error: ${response.status}` };
        }
        return await response.json();
    } catch (err) {
        return { error: 'Backend unreachable. Wake up Render server!' };
    }
};
