/**
 * App.jsx - Root de la aplicación
 * 
 * Usa layout condicional:
 * - Rutas públicas: NavbarPublico + fondo oscuro cinema
 * - Rutas admin (/admin/*): Navbar admin + fondo claro
 */
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavbarPublico from './components/NavbarPublico';
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';

const Layout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            {isAdminRoute ? <Navbar /> : <NavbarPublico />}
            <div className={isAdminRoute ? 'container main-container' : 'cine-main'}>
                <AppRouter />
            </div>
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
