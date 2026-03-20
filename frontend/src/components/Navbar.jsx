/**
 * Navbar.jsx - Barra de navegación principal
 * 
 * Usa clases personalizadas de index.css para un aspecto profesional
 * con fondo slate oscuro, links con hover suave y estado activo visible.
 */
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
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
                            <NavLink className="nav-link" to="/generos">
                                Géneros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/directores">
                                Directores
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/productoras">
                                Productoras
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/tipos">
                                Tipos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/media">
                                Media
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
