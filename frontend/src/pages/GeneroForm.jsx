/**
 * GeneroForm.jsx - Formulario para crear/editar un género
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import generoService from '../services/generoService';
import { showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const GeneroForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        estado: 'Activo',
        descripcion: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) cargarGenero();
    }, [id]);

    const cargarGenero = async () => {
        setLoading(true);
        try {
            const { data } = await generoService.getById(id);
            setForm({
                nombre: data.nombre,
                estado: data.estado,
                descripcion: data.descripcion || ''
            });
        } catch (error) {
            showError('No se pudo cargar el género');
            navigate('/generos');
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
                await generoService.update(id, form);
                showSuccess('Género actualizado correctamente');
            } else {
                await generoService.create(form);
                showSuccess('Género creado correctamente');
            }
            navigate('/generos');
        } catch (error) {
            const mensaje = error.response?.data?.msg || 'Ocurrió un error';
            showError(mensaje);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section form-section">
            <h2 className="page-title mb-4">{id ? 'Editar Género' : 'Nuevo Género'}</h2>
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
                <div className="mb-3">
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
                        onClick={() => navigate('/generos')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GeneroForm;
