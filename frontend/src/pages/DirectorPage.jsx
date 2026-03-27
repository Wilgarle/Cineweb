/**
 * DirectorPage.jsx - Página de listado de directores
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import directorService from '../services/directorService';
import { confirmDelete, showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const DirectorPage = () => {
    const [directores, setDirectores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDirectores();
    }, []);

    const cargarDirectores = async () => {
        try {
            const { data } = await directorService.getAll();
            setDirectores(data);
        } catch (error) {
            showError('No se pudieron cargar los directores');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nombres) => {
        const confirmado = await confirmDelete(nombres);
        if (!confirmado) return;

        try {
            await directorService.remove(id);
            showSuccess('Director eliminado correctamente');
            cargarDirectores();
        } catch (error) {
            showError('No se pudo eliminar el director');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section">
            <div className="page-header">
                <h2 className="page-title">Directores</h2>
                <Link to="/admin/directores/nuevo" className="btn btn-primary btn-create">
                    + Nuevo Director
                </Link>
            </div>

            {directores.length === 0 ? (
                <div className="empty-message">No hay directores registrados.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directores.map((director) => (
                                <tr key={director._id}>
                                    <td className="fw-medium">{director.nombres}</td>
                                    <td>
                                        <span className={`badge badge-estado ${director.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                                            {director.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/admin/directores/editar/${director._id}`}
                                            className="btn btn-outline-warning btn-sm btn-action"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm btn-action"
                                            onClick={() => handleDelete(director._id, director.nombres)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DirectorPage;
