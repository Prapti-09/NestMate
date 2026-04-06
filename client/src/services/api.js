const API_BASE = 'http://localhost:5000/api';

export const postRequest = async (endpoint, data) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const getRequest = async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    return response.json();
};

export const putRequest = async (endpoint, data) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};
