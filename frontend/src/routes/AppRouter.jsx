/**
 * AppRouter.jsx - Configuración de rutas del sistema
 * 
 * ¿Qué hace?
 * Define todas las rutas de la aplicación y las asocia con sus páginas.
 * Usa React Router v6 con el componente Routes y Route.
 * 
 * ¿Por qué separar las rutas?
 * Para mantener la estructura limpia. Si el proyecto crece,
 * las rutas se gestionan desde un solo lugar.
 */
import { Routes, Route } from 'react-router-dom';

// Páginas
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
            {/* Página de inicio */}
            <Route path="/" element={<HomePage />} />

            {/* Módulo Género */}
            <Route path="/generos" element={<GeneroPage />} />
            <Route path="/generos/nuevo" element={<GeneroForm />} />
            <Route path="/generos/editar/:id" element={<GeneroForm />} />

            {/* Módulo Director */}
            <Route path="/directores" element={<DirectorPage />} />
            <Route path="/directores/nuevo" element={<DirectorForm />} />
            <Route path="/directores/editar/:id" element={<DirectorForm />} />

            {/* Módulo Productora */}
            <Route path="/productoras" element={<ProductoraPage />} />
            <Route path="/productoras/nuevo" element={<ProductoraForm />} />
            <Route path="/productoras/editar/:id" element={<ProductoraForm />} />

            {/* Módulo Tipo */}
            <Route path="/tipos" element={<TipoPage />} />
            <Route path="/tipos/nuevo" element={<TipoForm />} />
            <Route path="/tipos/editar/:id" element={<TipoForm />} />

            {/* Módulo Media */}
            <Route path="/media" element={<MediaPage />} />
            <Route path="/media/nuevo" element={<MediaForm />} />
            <Route path="/media/editar/:id" element={<MediaForm />} />
        </Routes>
    );
};

export default AppRouter;
