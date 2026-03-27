/**
 * InicioPublico.jsx - Página principal del catálogo público
 * 
 * Incluye:
 * - Hero carousel con las 5 últimas medias
 * - Grid de tarjetas con todo el catálogo
 * - Modal de detalle al hacer clic en una tarjeta
 */
import { useState, useEffect, useRef } from 'react';
import mediaService from '../services/mediaService';
import MediaCard from '../components/MediaCard';
import MediaDetailModal from '../components/MediaDetailModal';
import Loader from '../components/Loader';

const InicioPublico = () => {
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaSeleccionada, setMediaSeleccionada] = useState(null);
    const [slideActivo, setSlideActivo] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        cargarCatalogo();
    }, []);

    // Auto-rotación del carousel
    useEffect(() => {
        const destacadas = medias.slice(0, 5);
        if (destacadas.length > 1) {
            intervalRef.current = setInterval(() => {
                setSlideActivo(prev => (prev + 1) % destacadas.length);
            }, 5000);
        }
        return () => clearInterval(intervalRef.current);
    }, [medias]);

    const cargarCatalogo = async () => {
        try {
            const { data } = await mediaService.getAll();
            setMedias(data);
        } catch (error) {
            console.error('Error al cargar el catálogo:', error);
        } finally {
            setLoading(false);
        }
    };

    const irASlide = (idx) => {
        setSlideActivo(idx);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setSlideActivo(prev => (prev + 1) % Math.min(medias.length, 5));
        }, 5000);
    };

    if (loading) return <Loader />;

    const destacadas = medias.slice(0, 5);

    return (
        <div className="cine-page">
            {/* Hero Carousel */}
            {destacadas.length > 0 && (
                <div className="hero-banner">
                    {destacadas.map((media, idx) => (
                        <div
                            key={media._id}
                            className={`hero-slide ${idx === slideActivo ? 'hero-slide-active' : ''}`}
                        >
                            {/* Blurred background filling the entire banner */}
                            <div
                                className="hero-bg"
                                style={{
                                    backgroundImage: media.imagen
                                        ? `url(${media.imagen})`
                                        : 'none',
                                    backgroundColor: '#16213e'
                                }}
                            ></div>
                            
                            {/* Sharp poster aligned to the right, contained and fading seamlessly */}
                            {media.imagen && (
                                <div 
                                    className="hero-poster-layer d-none d-md-block"
                                    style={{ backgroundImage: `url(${media.imagen})` }}
                                ></div>
                            )}

                            <div className="hero-content">
                                <span className="hero-badge">{media.tipo?.nombre || 'Estreno'}</span>
                                <h1 className="hero-title">{media.titulo}</h1>
                                <p className="hero-sinopsis">
                                    {media.sinopsis || 'Descubre el contenido más reciente en CineWeb.'}
                                </p>
                                <div className="hero-meta">
                                    <span>{media.anioEstreno}</span>
                                    <span>•</span>
                                    <span>{media.genero?.nombre}</span>
                                    <span>•</span>
                                    <span>{media.director?.nombres}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Carousel indicators */}
                    {destacadas.length > 1 && (
                        <div className="hero-indicators">
                            {destacadas.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`hero-indicator ${idx === slideActivo ? 'hero-indicator-active' : ''}`}
                                    onClick={() => irASlide(idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Catálogo */}
            <div className="container">
                <h2 className="cine-section-title">Todo el Catálogo</h2>
                {medias.length === 0 ? (
                    <p className="cine-empty">No hay contenido disponible aún.</p>
                ) : (
                    <div className="media-grid">
                        {medias.map((media) => (
                            <MediaCard
                                key={media._id}
                                media={media}
                                onClick={() => setMediaSeleccionada(media)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {mediaSeleccionada && (
                <MediaDetailModal
                    media={mediaSeleccionada}
                    onClose={() => setMediaSeleccionada(null)}
                />
            )}
        </div>
    );
};

export default InicioPublico;
