/**
 * MediaForm.jsx - Formulario para crear/editar una media
 * 
 * Incluye:
 * - Auto-generación de URL basada en título + año
 * - Selects con opción de crear nuevos (género, director, productora)
 * - Subida de imagen vía input file
 * - Serial generado automáticamente por el backend
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

/**
 * Genera slug seguro para URL a partir de texto y año.
 * "El Horizonte Perdido" + 2026 → "el-horizonte-perdido-2026"
 */
const generarSlug = (titulo, anio) => {
    const slug = titulo
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar tildes
        .replace(/[^a-z0-9\s-]/g, '') // solo caracteres seguros
        .trim()
        .replace(/\s+/g, '-'); // espacios a guiones
    return anio ? `${slug}-${anio}` : slug;
};

const MediaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
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

    const [serialActual, setSerialActual] = useState('');
    const [imagenFile, setImagenFile] = useState(null);

    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para inline-create
    const [nuevoGenero, setNuevoGenero] = useState('');
    const [nuevoDirector, setNuevoDirector] = useState('');
    const [nuevaProductora, setNuevaProductora] = useState('');
    const [showNuevoGenero, setShowNuevoGenero] = useState(false);
    const [showNuevoDirector, setShowNuevoDirector] = useState(false);
    const [showNuevaProductora, setShowNuevaProductora] = useState(false);

    useEffect(() => {
        cargarOpciones();
    }, []);

    // Auto-generar URL cuando cambian titulo o anioEstreno
    useEffect(() => {
        if (!id && form.titulo) {
            const slug = generarSlug(form.titulo, form.anioEstreno);
            setForm(prev => ({ ...prev, url: `https://cineweb/${slug}` }));
        }
    }, [form.titulo, form.anioEstreno, id]);

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
            setSerialActual(data.serial || '');
            setForm({
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
            navigate('/admin/media');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setImagenFile(e.target.files[0]);
    };

    // --- Inline create handlers ---
    const crearGeneroInline = async () => {
        if (!nuevoGenero.trim()) return;
        try {
            const { data } = await generoService.create({ nombre: nuevoGenero, descripcion: '', estado: 'Activo' });
            setGeneros(prev => [...prev, data]);
            setForm(prev => ({ ...prev, genero: data._id }));
            setNuevoGenero('');
            setShowNuevoGenero(false);
            showSuccess(`Género "${nuevoGenero}" creado`);
        } catch (error) {
            showError(error.response?.data?.msg || 'Error al crear género');
        }
    };

    const crearDirectorInline = async () => {
        if (!nuevoDirector.trim()) return;
        try {
            const { data } = await directorService.create({ nombres: nuevoDirector, estado: 'Activo' });
            setDirectores(prev => [...prev, data]);
            setForm(prev => ({ ...prev, director: data._id }));
            setNuevoDirector('');
            setShowNuevoDirector(false);
            showSuccess(`Director "${nuevoDirector}" creado`);
        } catch (error) {
            showError(error.response?.data?.msg || 'Error al crear director');
        }
    };

    const crearProductoraInline = async () => {
        if (!nuevaProductora.trim()) return;
        try {
            const { data } = await productoraService.create({ nombre: nuevaProductora, descripcion: '', estado: 'Activo' });
            setProductoras(prev => [...prev, data]);
            setForm(prev => ({ ...prev, productora: data._id }));
            setNuevaProductora('');
            setShowNuevaProductora(false);
            showSuccess(`Productora "${nuevaProductora}" creada`);
        } catch (error) {
            showError(error.response?.data?.msg || 'Error al crear productora');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (key !== 'imagen') {
                formData.append(key, form[key]);
            }
        });

        if (imagenFile) {
            formData.append('imagen', imagenFile);
        }

        try {
            if (id) {
                await mediaService.update(id, formData);
                showSuccess('Media actualizada correctamente');
            } else {
                await mediaService.create(formData);
                showSuccess('Media creada correctamente');
            }
            navigate('/admin/media');
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
                {id && serialActual && (
                    <div className="mb-3">
                        <span className="form-label d-block" style={{ fontWeight: 600 }}>Serial</span>
                        <span className="badge bg-secondary" style={{ fontSize: '0.95rem', padding: '6px 14px' }}>{serialActual}</span>
                        <small className="text-muted ms-2">(Generado automáticamente, no editable)</small>
                    </div>
                )}

                <div className="row">
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
                    <div className="col-md-4 mb-3">
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
                </div>

                {/* URL auto-generada */}
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL <small className="text-muted">(generada automáticamente)</small></label>
                    <input
                        type="text"
                        className="form-control"
                        id="url"
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        readOnly={!id}
                        required
                        style={{ backgroundColor: !id ? 'rgba(255,255,255,0.04)' : undefined }}
                    />
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
                        <label htmlFor="imagen" className="form-label">Imagen de portada {id && '(Opcional)'}</label>
                        {id && form.imagen && (
                            <div className="d-block mb-1">
                                <a href={form.imagen} target="_blank" rel="noopener noreferrer" style={{fontSize: '0.85rem'}}>Ver imagen actual</a>
                            </div>
                        )}
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="form-control"
                            id="imagen"
                            name="imagen"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
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
                                <option key={t._id} value={t._id}>{t.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Género: select + inline create */}
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Género</label>
                        <div className="d-flex gap-2">
                            <select
                                className="form-select"
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {generos.map((g) => (
                                    <option key={g._id} value={g._id}>{g.nombre}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowNuevoGenero(!showNuevoGenero)} title="Crear nuevo">+</button>
                        </div>
                        {showNuevoGenero && (
                            <div className="input-group mt-2">
                                <input type="text" className="form-control form-control-sm" placeholder="Nuevo género..." value={nuevoGenero} onChange={(e) => setNuevoGenero(e.target.value)} />
                                <button type="button" className="btn btn-primary btn-sm" onClick={crearGeneroInline}>Crear</button>
                            </div>
                        )}
                    </div>

                    {/* Director: select + inline create */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Director</label>
                        <div className="d-flex gap-2">
                            <select
                                className="form-select"
                                name="director"
                                value={form.director}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {directores.map((d) => (
                                    <option key={d._id} value={d._id}>{d.nombres}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowNuevoDirector(!showNuevoDirector)} title="Crear nuevo">+</button>
                        </div>
                        {showNuevoDirector && (
                            <div className="input-group mt-2">
                                <input type="text" className="form-control form-control-sm" placeholder="Nuevo director..." value={nuevoDirector} onChange={(e) => setNuevoDirector(e.target.value)} />
                                <button type="button" className="btn btn-primary btn-sm" onClick={crearDirectorInline}>Crear</button>
                            </div>
                        )}
                    </div>

                    {/* Productora: select + inline create */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Productora</label>
                        <div className="d-flex gap-2">
                            <select
                                className="form-select"
                                name="productora"
                                value={form.productora}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                {productoras.map((p) => (
                                    <option key={p._id} value={p._id}>{p.nombre}</option>
                                ))}
                            </select>
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowNuevaProductora(!showNuevaProductora)} title="Crear nuevo">+</button>
                        </div>
                        {showNuevaProductora && (
                            <div className="input-group mt-2">
                                <input type="text" className="form-control form-control-sm" placeholder="Nueva productora..." value={nuevaProductora} onChange={(e) => setNuevaProductora(e.target.value)} />
                                <button type="button" className="btn btn-primary btn-sm" onClick={crearProductoraInline}>Crear</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-primary btn-create">
                        {id ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/admin/media')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MediaForm;
