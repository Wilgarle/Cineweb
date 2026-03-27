/**
 * Navbar.jsx - Barra de navegación del panel de administración
 * 
 * Usa clases personalizadas de index.css para un aspecto profesional
 * con fondo slate oscuro, links con hover suave y estado activo visible.
 * Todas las rutas admin están bajo el prefijo /admin.
 */
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container">
                <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/admin">
                    <img src="/logo.svg" alt="Cineweb Logo" height="28" />
                    CineWeb Admin
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/generos">
                                Géneros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/directores">
                                Directores
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/productoras">
                                Productoras
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/tipos">
                                Tipos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/media">
                                Media
                            </NavLink>
                        </li>
                        <li className="nav-item ms-2">
                            <NavLink className="nav-link text-warning" to="/">
                                ← Ir al Sitio
                            </NavLink>
                        </li>
                        <li className="nav-item ms-2">
                            <button className="btn btn-outline-light btn-sm mt-1" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
