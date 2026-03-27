/**
 * MediaDetailModal.jsx - Modal de ficha técnica de una media
 * 
 * Se abre al hacer clic en una MediaCard. Se cierra al hacer clic fuera del recuadro.
 * Estilo dark cinema coherente con la página pública.
 */
const MediaDetailModal = ({ media, onClose }) => {
    if (!media) return null;

    const imagenDefault = 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Sin+Imagen';

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="media-modal-backdrop" onClick={handleBackdropClick}>
            <div className="media-modal-card">
                <button className="media-modal-close" onClick={onClose}>✕</button>
                <div className="media-modal-content">
                    <div className="media-modal-poster">
                        <img
                            src={media.imagen || imagenDefault}
                            alt={media.titulo}
                            onError={(e) => { e.target.src = imagenDefault; }}
                        />
                    </div>
                    <div className="media-modal-info">
                        <span className="media-modal-type">{media.tipo?.nombre || 'Media'}</span>
                        <h2 className="media-modal-title">{media.titulo}</h2>
                        <div className="media-modal-meta-row">
                            <span>{media.anioEstreno}</span>
                            {media.genero?.nombre && <><span>•</span><span>{media.genero.nombre}</span></>}
                            {media.serial && <><span>•</span><span className="media-modal-serial">{media.serial}</span></>}
                        </div>
                        {media.sinopsis && (
                            <p className="media-modal-sinopsis">{media.sinopsis}</p>
                        )}
                        <div className="media-modal-details">
                            {media.director?.nombres && (
                                <div className="media-modal-detail-item">
                                    <span className="detail-label">Director</span>
                                    <span className="detail-value">{media.director.nombres}</span>
                                </div>
                            )}
                            {media.productora?.nombre && (
                                <div className="media-modal-detail-item">
                                    <span className="detail-label">Productora</span>
                                    <span className="detail-value">{media.productora.nombre}</span>
                                </div>
                            )}
                            {media.url && (
                                <div className="media-modal-detail-item">
                                    <span className="detail-label">URL</span>
                                    <a href={media.url} target="_blank" rel="noopener noreferrer" className="detail-value detail-link">{media.url}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaDetailModal;
