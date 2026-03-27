/**
 * SeriesPublico.jsx - Página de solo Series con filtro por género y modal de detalle
 */
import { useState, useEffect } from 'react';
import mediaService from '../services/mediaService';
import generoService from '../services/generoService';
import MediaCard from '../components/MediaCard';
import MediaDetailModal from '../components/MediaDetailModal';
import Loader from '../components/Loader';

const SeriesPublico = () => {
    const [series, setSeries] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');
    const [loading, setLoading] = useState(true);
    const [mediaSeleccionada, setMediaSeleccionada] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [mediasRes, generosRes] = await Promise.all([
                mediaService.getAll(),
                generoService.getAll()
            ]);
            const soloSeries = mediasRes.data.filter(
                (m) => m.tipo?.nombre === 'Serie'
            );
            setSeries(soloSeries);
            setGeneros(generosRes.data.filter(g => g.estado === 'Activo'));
        } catch (error) {
            console.error('Error al cargar series:', error);
        } finally {
            setLoading(false);
        }
    };

    const seriesFiltradas = generoSeleccionado
        ? series.filter((s) => s.genero?._id === generoSeleccionado)
        : series;

    if (loading) return <Loader />;

    return (
        <div className="cine-page">
            <div className="container">
                <div className="cine-page-header">
                    <h2 className="cine-section-title">Series</h2>
                    <select
                        className="cine-filter-select"
                        value={generoSeleccionado}
                        onChange={(e) => setGeneroSeleccionado(e.target.value)}
                    >
                        <option value="">Todos los géneros</option>
                        {generos.map((g) => (
                            <option key={g._id} value={g._id}>{g.nombre}</option>
                        ))}
                    </select>
                </div>

                {seriesFiltradas.length === 0 ? (
                    <p className="cine-empty">No hay series disponibles con ese filtro.</p>
                ) : (
                    <div className="media-grid">
                        {seriesFiltradas.map((media) => (
                            <MediaCard key={media._id} media={media} onClick={() => setMediaSeleccionada(media)} />
                        ))}
                    </div>
                )}
            </div>

            {mediaSeleccionada && (
                <MediaDetailModal media={mediaSeleccionada} onClose={() => setMediaSeleccionada(null)} />
            )}
        </div>
    );
};

export default SeriesPublico;
