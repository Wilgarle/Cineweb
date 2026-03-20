/**
 * alerts.js - Helpers de SweetAlert2
 * 
 * ¿Qué hace?
 * Centraliza las alertas de confirmación, éxito y error
 * para que todos los componentes usen el mismo estilo.
 * 
 * ¿Por qué?
 * Evita repetir la configuración de SweetAlert2 en cada página.
 * Si quieres cambiar el estilo de las alertas, solo se modifica aquí.
 */
import Swal from 'sweetalert2';

// Alerta de confirmación antes de eliminar
export const confirmDelete = async (nombre = 'este registro') => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `Se eliminará ${nombre}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
};

// Alerta de éxito
export const showSuccess = (mensaje = 'Operación exitosa') => {
    Swal.fire({
        title: '¡Éxito!',
        text: mensaje,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
    });
};

// Alerta de error
export const showError = (mensaje = 'Ocurrió un error') => {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonColor: '#d33'
    });
};
