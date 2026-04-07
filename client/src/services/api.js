const API_BASE = 'https://nestmate-1.onrender.com/api'; 

export const postRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) return { error: `Server error: ${response.status}` };
        return await response.json();
    } catch (err) {
        return { error: 'Backend unreachable. Wake up Render server!' };
    }
};

export const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) return { error: `Server error: ${response.status}` };
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
        if (!response.ok) return { error: `Server error: ${response.status}` };
        return await response.json();
    } catch (err) {
        return { error: 'Backend unreachable. Wake up Render server!' };
    }
};
