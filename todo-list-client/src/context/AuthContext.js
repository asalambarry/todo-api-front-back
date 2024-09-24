import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplace useHistory

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Utilisation de useNavigate à la place de useHistory

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/todos'); // Utilisation de navigate pour la redirection
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login'); // Utilisation de navigate pour la redirection
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
