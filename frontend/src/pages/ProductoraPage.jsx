/**
 * ProductoraPage.jsx - Página de listado de productoras
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productoraService from '../services/productoraService';
import { confirmDelete, showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const ProductoraPage = () => {
    const [productoras, setProductoras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarProductoras();
    }, []);

    const cargarProductoras = async () => {
        try {
            const { data } = await productoraService.getAll();
            setProductoras(data);
        } catch (error) {
            showError('No se pudieron cargar las productoras');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nombre) => {
        const confirmado = await confirmDelete(nombre);
        if (!confirmado) return;

        try {
            await productoraService.remove(id);
            showSuccess('Productora eliminada correctamente');
            cargarProductoras();
        } catch (error) {
            showError('No se pudo eliminar la productora');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section">
            <div className="page-header">
                <h2 className="page-title">Productoras</h2>
                <Link to="/admin/productoras/nuevo" className="btn btn-primary btn-create">
                    + Nueva Productora
                </Link>
            </div>

            {productoras.length === 0 ? (
                <div className="empty-message">No hay productoras registradas.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Slogan</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productoras.map((productora) => (
                                <tr key={productora._id}>
                                    <td className="fw-medium">{productora.nombre}</td>
                                    <td>
                                        <span className={`badge badge-estado ${productora.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                                            {productora.estado}
                                        </span>
                                    </td>
                                    <td>{productora.slogan || '—'}</td>
                                    <td>{productora.descripcion || '—'}</td>
                                    <td>
                                        <Link
                                            to={`/admin/productoras/editar/${productora._id}`}
                                            className="btn btn-outline-warning btn-sm btn-action"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm btn-action"
                                            onClick={() => handleDelete(productora._id, productora.nombre)}
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

export default ProductoraPage;
