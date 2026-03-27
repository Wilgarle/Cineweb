/**
 * HomePage.jsx - Página de inicio del panel administrativo (tema oscuro)
 */
import { Link } from 'react-router-dom';

// Clean SVG icons for each module
const modules = [
    { 
        title: 'Géneros', desc: 'Gestiona los géneros de películas y series.', path: '/admin/generos', 
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg> 
    },
    { 
        title: 'Directores', desc: 'Gestiona los directores de producciones.', path: '/admin/directores', 
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path><rect x="3" y="6" width="12" height="12" rx="2"></rect></svg> 
    },
    { 
        title: 'Productoras', desc: 'Gestiona las productoras de cine y televisión.', path: '/admin/productoras', 
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"></path></svg> 
    },
    { 
        title: 'Tipos', desc: 'Gestiona los tipos de contenido multimedia.', path: '/admin/tipos', 
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path></svg> 
    },
    { 
        title: 'Media', desc: 'Gestiona películas y series del catálogo.', path: '/admin/media', 
        icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg> 
    },
];

const HomePage = () => {
    return (
        <div>
            <div className="text-center mb-5 mt-3">
                <h1 className="fw-bold page-title">
                    Panel de Administración
                </h1>
                <p className="text-secondary mt-2" style={{ fontSize: '1.05rem' }}>
                    Gestiona el catálogo de películas y series de CineWeb.
                </p>
            </div>
            <div className="row g-4 justify-content-center">
                {modules.map((mod) => (
                    <div className="col-md-4 col-sm-6" key={mod.path}>
                        <div className="card home-card shadow-sm">
                            <div className="card-body d-flex flex-column p-4">
                                <div style={{ color: '#4da3ff', marginBottom: '1rem' }}>{mod.icon}</div>
                                <h5 className="card-title">{mod.title}</h5>
                                <p className="card-text flex-grow-1">{mod.desc}</p>
                                <Link to={mod.path} className="btn btn-primary btn-sm mt-2 align-self-start">
                                    Acceder →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
