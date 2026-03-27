/**
 * RegistroPage.jsx - Página de registro de usuario
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const RegistroPage = () => {
    const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmarPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmarPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            await authService.register({
                nombre: form.nombre,
                email: form.email,
                password: form.password
            });
            navigate('/login');
        } catch (err) {
            const mensaje = err.response?.data?.msg || 'Error al registrar usuario';
            setError(mensaje);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header text-center">
                    <img src="/logo.svg" alt="Cineweb Logo" className="mb-3" style={{ height: '70px' }} />
                    <h2 className="mb-1">Crear Cuenta</h2>
                    <p className="text-muted">Únete a CineWeb</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mínimo 6 caracteres"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmarPassword"
                            name="confirmarPassword"
                            placeholder="Repite tu contraseña"
                            value={form.confirmarPassword}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistroPage;
