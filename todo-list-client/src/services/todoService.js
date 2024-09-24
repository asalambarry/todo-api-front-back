import axios from 'axios';

const API_URL = 'http://localhost:5001/api/todos';

export const getTodos = async (token) => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addTodo = async (title, token) => {
    return axios.post(
        API_URL,
        { title },
        {
            headers: {
                Authorization: `Bearer ${token}`, // Assurez-vous que le token est correct
            },
        }
    );
};
export const updateTodo = async (id, data, token) => {
    return axios.put(`${API_URL}/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTodo = async (id, token) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
