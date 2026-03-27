/**
 * NavbarPublico.jsx - Navbar pública estilo streaming/cinema
 * 
 * Links: Inicio, Películas, Series
 * Derecha: Login/Registro o Nombre del usuario + Logout
 * Si es admin: muestra enlace al Panel Admin
 */
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarPublico = () => {
    const { usuario, isAdmin, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-cine">
            <div className="container">
                <NavLink className="navbar-brand navbar-brand-cine d-flex align-items-center" to="/">
                    <img src="/logo.svg" alt="Cineweb Logo" height="32" className="me-1" />
                    CineWeb
                </NavLink>
                <button
                    className="navbar-toggler navbar-toggler-cine"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navCine"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navCine">
                    <ul className="navbar-nav mx-auto gap-1">
                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-cine" to="/">
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-cine" to="/peliculas">
                                Películas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-cine" to="/series">
                                Series
                            </NavLink>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link nav-link-cine nav-link-admin" to="/admin">
                                    Panel Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="navbar-user-area">
                        {isAuthenticated ? (
                            <div className="d-flex align-items-center gap-3">
                                <span className="user-greeting">
                                    Hola, <strong>{usuario.nombre}</strong>
                                </span>
                                <button className="btn btn-outline-cine btn-sm" onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <NavLink className="btn btn-outline-cine btn-sm" to="/login">
                                    Iniciar Sesión
                                </NavLink>
                                <NavLink className="btn btn-cine btn-sm" to="/registro">
                                    Registrarse
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarPublico;
