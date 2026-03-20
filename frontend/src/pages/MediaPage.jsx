/**
 * MediaPage.jsx - Página de listado de medias (películas y series)
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mediaService from '../services/mediaService';
import { confirmDelete, showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const MediaPage = () => {
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarMedias();
    }, []);

    const cargarMedias = async () => {
        try {
            const { data } = await mediaService.getAll();
            setMedias(data);
        } catch (error) {
            showError('No se pudieron cargar las medias');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, titulo) => {
        const confirmado = await confirmDelete(titulo);
        if (!confirmado) return;

        try {
            await mediaService.remove(id);
            showSuccess('Media eliminada correctamente');
            cargarMedias();
        } catch (error) {
            showError('No se pudo eliminar la media');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section">
            <div className="page-header">
                <h2 className="page-title">Media</h2>
                <Link to="/media/nuevo" className="btn btn-primary btn-create">
                    + Nueva Media
                </Link>
            </div>

            {medias.length === 0 ? (
                <div className="empty-message">No hay medias registradas.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Título</th>
                                <th>Año</th>
                                <th>Género</th>
                                <th>Director</th>
                                <th>Productora</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medias.map((media) => (
                                <tr key={media._id}>
                                    <td><code>{media.serial}</code></td>
                                    <td className="fw-medium">{media.titulo}</td>
                                    <td>{media.anioEstreno}</td>
                                    <td>{media.genero?.nombre || '—'}</td>
                                    <td>{media.director?.nombres || '—'}</td>
                                    <td>{media.productora?.nombre || '—'}</td>
                                    <td>{media.tipo?.nombre || '—'}</td>
                                    <td>
                                        <Link
                                            to={`/media/editar/${media._id}`}
                                            className="btn btn-outline-warning btn-sm btn-action"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm btn-action"
                                            onClick={() => handleDelete(media._id, media.titulo)}
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

export default MediaPage;
