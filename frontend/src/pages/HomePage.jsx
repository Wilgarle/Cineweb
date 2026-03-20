/**
 * HomePage.jsx - Página de inicio del panel administrativo
 */
import { Link } from 'react-router-dom';

const modules = [
    { title: 'Géneros', desc: 'Gestiona los géneros de películas y series.', path: '/generos' },
    { title: 'Directores', desc: 'Gestiona los directores de producciones.', path: '/directores' },
    { title: 'Productoras', desc: 'Gestiona las productoras de cine y televisión.', path: '/productoras' },
    { title: 'Tipos', desc: 'Gestiona los tipos de contenido multimedia.', path: '/tipos' },
    { title: 'Media', desc: 'Gestiona películas y series del catálogo.', path: '/media' },
];

const HomePage = () => {
    return (
        <div>
            <div className="text-center mb-5 mt-3">
                <h1 className="fw-bold" style={{ color: '#2c3e50' }}>
                    Panel de Administración
                </h1>
                <p className="text-muted mt-2" style={{ fontSize: '1.05rem' }}>
                    Gestiona el catálogo de películas y series de CineWeb.
                </p>
            </div>
            <div className="row g-4 justify-content-center">
                {modules.map((mod) => (
                    <div className="col-md-4 col-sm-6" key={mod.path}>
                        <div className="card home-card shadow-sm">
                            <div className="card-body d-flex flex-column p-4">
                                <h5 className="card-title">{mod.title}</h5>
                                <p className="card-text flex-grow-1">{mod.desc}</p>
                                <Link to={mod.path} className="btn btn-outline-primary btn-sm mt-2 align-self-start">
                                    Acceder
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
