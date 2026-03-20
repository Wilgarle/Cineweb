/**
 * DirectorForm.jsx - Formulario para crear/editar un director
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import directorService from '../services/directorService';
import { showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const DirectorForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombres: '',
        estado: 'Activo'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) cargarDirector();
    }, [id]);

    const cargarDirector = async () => {
        setLoading(true);
        try {
            const { data } = await directorService.getById(id);
            setForm({
                nombres: data.nombres,
                estado: data.estado
            });
        } catch (error) {
            showError('No se pudo cargar el director');
            navigate('/directores');
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
                await directorService.update(id, form);
                showSuccess('Director actualizado correctamente');
            } else {
                await directorService.create(form);
                showSuccess('Director creado correctamente');
            }
            navigate('/directores');
        } catch (error) {
            const mensaje = error.response?.data?.msg || 'Ocurrió un error';
            showError(mensaje);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section form-section">
            <h2 className="page-title mb-4">{id ? 'Editar Director' : 'Nuevo Director'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        name="nombres"
                        value={form.nombres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
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
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary btn-create">
                        {id ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/directores')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DirectorForm;
