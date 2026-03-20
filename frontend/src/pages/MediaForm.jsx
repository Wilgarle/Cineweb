/**
 * MediaForm.jsx - Formulario para crear/editar una media
 * 
 * Los selects dinámicos cargan solo items activos (género, director, productora).
 * Tipo se carga completo (no tiene campo estado).
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mediaService from '../services/mediaService';
import generoService from '../services/generoService';
import directorService from '../services/directorService';
import productoraService from '../services/productoraService';
import tipoService from '../services/tipoService';
import { showSuccess, showError } from '../helpers/alerts';
import Loader from '../components/Loader';

const MediaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        anioEstreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
    });

    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarOpciones();
    }, []);

    const cargarOpciones = async () => {
        try {
            const [generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
                generoService.getAll(),
                directorService.getAll(),
                productoraService.getAll(),
                tipoService.getAll()
            ]);

            setGeneros(generosRes.data.filter(g => g.estado === 'Activo'));
            setDirectores(directoresRes.data.filter(d => d.estado === 'Activo'));
            setProductoras(productorasRes.data.filter(p => p.estado === 'Activo'));
            setTipos(tiposRes.data);

            if (id) {
                await cargarMedia();
            }
        } catch (error) {
            showError('No se pudieron cargar las opciones del formulario');
        } finally {
            setLoading(false);
        }
    };

    const cargarMedia = async () => {
        try {
            const { data } = await mediaService.getById(id);
            setForm({
                serial: data.serial,
                titulo: data.titulo,
                sinopsis: data.sinopsis || '',
                url: data.url,
                imagen: data.imagen || '',
                anioEstreno: data.anioEstreno,
                genero: data.genero?._id || '',
                director: data.director?._id || '',
                productora: data.productora?._id || '',
                tipo: data.tipo?._id || ''
            });
        } catch (error) {
            showError('No se pudo cargar la media');
            navigate('/media');
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
                await mediaService.update(id, form);
                showSuccess('Media actualizada correctamente');
            } else {
                await mediaService.create(form);
                showSuccess('Media creada correctamente');
            }
            navigate('/media');
        } catch (error) {
            const mensaje = error.response?.data?.msg || 'Ocurrió un error';
            showError(mensaje);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="card-section" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="page-title mb-4">{id ? 'Editar Media' : 'Nueva Media'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="serial" className="form-label">Serial</label>
                        <input
                            type="text"
                            className="form-control"
                            id="serial"
                            name="serial"
                            value={form.serial}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-8 mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            name="titulo"
                            value={form.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="sinopsis" className="form-label">Sinopsis</label>
                    <textarea
                        className="form-control"
                        id="sinopsis"
                        name="sinopsis"
                        rows="3"
                        value={form.sinopsis}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="url" className="form-label">URL de la película</label>
                        <input
                            type="url"
                            className="form-control"
                            id="url"
                            name="url"
                            value={form.url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="imagen" className="form-label">URL Imagen de portada</label>
                        <input
                            type="url"
                            className="form-control"
                            id="imagen"
                            name="imagen"
                            value={form.imagen}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="anioEstreno" className="form-label">Año de Estreno</label>
                        <input
                            type="number"
                            className="form-control"
                            id="anioEstreno"
                            name="anioEstreno"
                            value={form.anioEstreno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="genero" className="form-label">Género</label>
                        <select
                            className="form-select"
                            id="genero"
                            name="genero"
                            value={form.genero}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            {generos.map((g) => (
                                <option key={g._id} value={g._id}>
                                    {g.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="director" className="form-label">Director</label>
                        <select
                            className="form-select"
                            id="director"
                            name="director"
                            value={form.director}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            {directores.map((d) => (
                                <option key={d._id} value={d._id}>
                                    {d.nombres}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="productora" className="form-label">Productora</label>
                        <select
                            className="form-select"
                            id="productora"
                            name="productora"
                            value={form.productora}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            {productoras.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-4">
                        <label htmlFor="tipo" className="form-label">Tipo</label>
                        <select
                            className="form-select"
                            id="tipo"
                            name="tipo"
                            value={form.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            {tipos.map((t) => (
                                <option key={t._id} value={t._id}>
                                    {t.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary btn-create">
                        {id ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/media')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MediaForm;
