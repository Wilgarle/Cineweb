/**
 * AuthContext.jsx - Contexto de autenticación
 * 
 * Provee estado de sesión a toda la app: usuario, isAdmin, login(), logout().
 * Almacena token JWT + datos de usuario en sessionStorage para persistencia.
 */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const guardado = sessionStorage.getItem('cineweb_usuario');
        if (guardado) {
            const datos = JSON.parse(guardado);
            return datos.usuario || datos;
        }
        return null;
    });

    /**
     * Guarda token + datos de usuario en sessionStorage
     * @param {Object} datosUsuario - { id, nombre, email, rol }
     * @param {string} token - JWT token del backend
     */
    const login = (datosUsuario, token) => {
        sessionStorage.setItem('cineweb_usuario', JSON.stringify({ usuario: datosUsuario, token }));
        setUsuario(datosUsuario);
    };

    const logout = () => {
        sessionStorage.removeItem('cineweb_usuario');
        setUsuario(null);
    };

    const isAdmin = usuario?.rol === 'admin';
    const isAuthenticated = usuario !== null;

    return (
        <AuthContext.Provider value={{ usuario, isAdmin, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
