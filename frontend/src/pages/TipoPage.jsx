/**
 * TipoPage.jsx - Página de listado de tipos
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tipoService from '../services/tipoService';
import { confirmDelete, showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const TipoPage = () => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarTipos();
    }, []);

    const cargarTipos = async () => {
        try {
            const { data } = await tipoService.getAll();
            setTipos(data);
        } catch (error) {
            showError('No se pudieron cargar los tipos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nombre) => {
        const confirmado = await confirmDelete(nombre);
        if (!confirmado) return;

        try {
            await tipoService.remove(id);
            showSuccess('Tipo eliminado correctamente');
            cargarTipos();
        } catch (error) {
            showError('No se pudo eliminar el tipo');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section">
            <div className="page-header">
                <h2 className="page-title">Tipos</h2>
                <Link to="/admin/tipos/nuevo" className="btn btn-primary btn-create">
                    + Nuevo Tipo
                </Link>
            </div>

            {tipos.length === 0 ? (
                <div className="empty-message">No hay tipos registrados.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.map((tipo) => (
                                <tr key={tipo._id}>
                                    <td className="fw-medium">{tipo.nombre}</td>
                                    <td>{tipo.descripcion || '—'}</td>
                                    <td>
                                        <Link
                                            to={`/admin/tipos/editar/${tipo._id}`}
                                            className="btn btn-outline-warning btn-sm btn-action"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm btn-action"
                                            onClick={() => handleDelete(tipo._id, tipo.nombre)}
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

export default TipoPage;
