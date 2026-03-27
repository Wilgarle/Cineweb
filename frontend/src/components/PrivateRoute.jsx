/**
 * PrivateRoute.jsx - Protege rutas que requieren rol admin
 * 
 * Si el usuario no está autenticado o no es admin, redirige al login.
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
