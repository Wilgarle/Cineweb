/**
 * GeneroPage.jsx - Página de listado de géneros
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import generoService from '../services/generoService';
import { confirmDelete, showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const GeneroPage = () => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarGeneros();
    }, []);

    const cargarGeneros = async () => {
        try {
            const { data } = await generoService.getAll();
            setGeneros(data);
        } catch (error) {
            showError('No se pudieron cargar los géneros');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nombre) => {
        const confirmado = await confirmDelete(nombre);
        if (!confirmado) return;

        try {
            await generoService.remove(id);
            showSuccess('Género eliminado correctamente');
            cargarGeneros();
        } catch (error) {
            showError('No se pudo eliminar el género');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section">
            <div className="page-header">
                <h2 className="page-title">Géneros</h2>
                <Link to="/generos/nuevo" className="btn btn-primary btn-create">
                    + Nuevo Género
                </Link>
            </div>

            {generos.length === 0 ? (
                <div className="empty-message">No hay géneros registrados.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos.map((genero) => (
                                <tr key={genero._id}>
                                    <td className="fw-medium">{genero.nombre}</td>
                                    <td>
                                        <span className={`badge badge-estado ${genero.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                                            {genero.estado}
                                        </span>
                                    </td>
                                    <td>{genero.descripcion || '—'}</td>
                                    <td>
                                        <Link
                                            to={`/generos/editar/${genero._id}`}
                                            className="btn btn-outline-warning btn-sm btn-action"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm btn-action"
                                            onClick={() => handleDelete(genero._id, genero.nombre)}
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

export default GeneroPage;
