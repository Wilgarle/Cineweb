/**
 * ProductoraForm.jsx - Formulario para crear/editar una productora
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productoraService from '../services/productoraService';
import { showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const ProductoraForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        estado: 'Activo',
        slogan: '',
        descripcion: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) cargarProductora();
    }, [id]);

    const cargarProductora = async () => {
        setLoading(true);
        try {
            const { data } = await productoraService.getById(id);
            setForm({
                nombre: data.nombre,
                estado: data.estado,
                slogan: data.slogan || '',
                descripcion: data.descripcion || ''
            });
        } catch (error) {
            showError('No se pudo cargar la productora');
            navigate('/admin/productoras');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await productoraService.update(id, form);
                showSuccess('Productora actualizada correctamente');
            } else {
                await productoraService.create(form);
                showSuccess('Productora creada correctamente');
            }
            navigate('/admin/productoras');
        } catch (error) {
            const mensaje = error.response?.data?.msg || 'Ocurrió un error';
            showError(mensaje);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section form-section">
            <h2 className="page-title mb-4">{id ? 'Editar Productora' : 'Nueva Productora'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select
                            className="form-select"
                            id="estado"
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="slogan" className="form-label">Slogan</label>
                    <input
                        type="text"
                        className="form-control"
                        id="slogan"
                        name="slogan"
                        value={form.slogan}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        rows="3"
                        value={form.descripcion}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary btn-create">
                        {id ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/admin/productoras')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductoraForm;
