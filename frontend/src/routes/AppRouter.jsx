/**
 * AppRouter.jsx - Configuración de rutas del sistema
 * 
 * Rutas públicas: /, /peliculas, /series, /login, /registro
 * Rutas admin: /admin/* (protegidas por PrivateRoute)
 */
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

// Páginas públicas
import InicioPublico from '../pages/InicioPublico';
import PeliculasPublico from '../pages/PeliculasPublico';
import SeriesPublico from '../pages/SeriesPublico';
import LoginPage from '../pages/LoginPage';
import RegistroPage from '../pages/RegistroPage';

// Páginas admin
import HomePage from '../pages/HomePage';
import GeneroPage from '../pages/GeneroPage';
import GeneroForm from '../pages/GeneroForm';
import DirectorPage from '../pages/DirectorPage';
import DirectorForm from '../pages/DirectorForm';
import ProductoraPage from '../pages/ProductoraPage';
import ProductoraForm from '../pages/ProductoraForm';
import TipoPage from '../pages/TipoPage';
import TipoForm from '../pages/TipoForm';
import MediaPage from '../pages/MediaPage';
import MediaForm from '../pages/MediaForm';

const AppRouter = () => {
    return (
        <Routes>
            {/* === Rutas Públicas === */}
            <Route path="/" element={<InicioPublico />} />
            <Route path="/peliculas" element={<PeliculasPublico />} />
            <Route path="/series" element={<SeriesPublico />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />

            {/* === Rutas Admin (Protegidas) === */}
            <Route path="/admin" element={<PrivateRoute><HomePage /></PrivateRoute>} />

            <Route path="/admin/generos" element={<PrivateRoute><GeneroPage /></PrivateRoute>} />
            <Route path="/admin/generos/nuevo" element={<PrivateRoute><GeneroForm /></PrivateRoute>} />
            <Route path="/admin/generos/editar/:id" element={<PrivateRoute><GeneroForm /></PrivateRoute>} />

            <Route path="/admin/directores" element={<PrivateRoute><DirectorPage /></PrivateRoute>} />
            <Route path="/admin/directores/nuevo" element={<PrivateRoute><DirectorForm /></PrivateRoute>} />
            <Route path="/admin/directores/editar/:id" element={<PrivateRoute><DirectorForm /></PrivateRoute>} />

            <Route path="/admin/productoras" element={<PrivateRoute><ProductoraPage /></PrivateRoute>} />
            <Route path="/admin/productoras/nuevo" element={<PrivateRoute><ProductoraForm /></PrivateRoute>} />
            <Route path="/admin/productoras/editar/:id" element={<PrivateRoute><ProductoraForm /></PrivateRoute>} />

            <Route path="/admin/tipos" element={<PrivateRoute><TipoPage /></PrivateRoute>} />
            <Route path="/admin/tipos/nuevo" element={<PrivateRoute><TipoForm /></PrivateRoute>} />
            <Route path="/admin/tipos/editar/:id" element={<PrivateRoute><TipoForm /></PrivateRoute>} />

            <Route path="/admin/media" element={<PrivateRoute><MediaPage /></PrivateRoute>} />
            <Route path="/admin/media/nuevo" element={<PrivateRoute><MediaForm /></PrivateRoute>} />
            <Route path="/admin/media/editar/:id" element={<PrivateRoute><MediaForm /></PrivateRoute>} />
        </Routes>
    );
};

export default AppRouter;
