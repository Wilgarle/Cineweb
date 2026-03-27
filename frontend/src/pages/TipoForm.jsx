/**
 * TipoForm.jsx - Formulario para crear/editar un tipo
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tipoService from '../services/tipoService';
import { showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const TipoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        descripcion: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) cargarTipo();
    }, [id]);

    const cargarTipo = async () => {
        setLoading(true);
        try {
            const { data } = await tipoService.getById(id);
            setForm({
                nombre: data.nombre,
                descripcion: data.descripcion || ''
            });
        } catch (error) {
            showError('No se pudo cargar el tipo');
            navigate('/admin/tipos');
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
                await tipoService.update(id, form);
                showSuccess('Tipo actualizado correctamente');
            } else {
                await tipoService.create(form);
                showSuccess('Tipo creado correctamente');
            }
            navigate('/admin/tipos');
        } catch (error) {
            const mensaje = error.response?.data?.msg || 'Ocurrió un error';
            showError(mensaje);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section form-section">
            <h2 className="page-title mb-4">{id ? 'Editar Tipo' : 'Nuevo Tipo'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                        onClick={() => navigate('/admin/tipos')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TipoForm;
