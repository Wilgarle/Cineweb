/**
 * MediaCard.jsx - Card reutilizable para mostrar posters de películas/series
 * Acepta onClick para abrir el modal de detalle.
 */
const MediaCard = ({ media, onClick }) => {
    const imagenDefault = 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Sin+Imagen';

    return (
        <div className="media-card" onClick={onClick}>
            <div className="media-card-img-wrapper">
                <img
                    src={media.imagen || imagenDefault}
                    alt={media.titulo}
                    className="media-card-img"
                    onError={(e) => { e.target.src = imagenDefault; }}
                />
                <div className="media-card-overlay">
                    <span className="media-card-year">{media.anioEstreno}</span>
                    <span className="media-card-genre">{media.genero?.nombre || ''}</span>
                </div>
            </div>
            <div className="media-card-body">
                <h3 className="media-card-title">{media.titulo}</h3>
                <div className="media-card-meta">
                    <span>{media.tipo?.nombre || ''}</span>
                    <span className="media-card-serial">{media.serial}</span>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;
