import React, { useState, useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    numeroTelefono: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombreCompleto: user.nombreCompleto || '',
        correoElectronico: user.correoElectronico || '',
        numeroTelefono: user.numeroTelefono || ''
      });
    } else {
      setFormData({
        nombreCompleto: '',
        correoElectronico: '',
        numeroTelefono: ''
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (!formData.nombreCompleto || !formData.correoElectronico || !formData.numeroTelefono) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (!isValidEmail(formData.correoElectronico)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }

    if (!isValidPhone(formData.numeroTelefono)) {
      alert('Por favor ingrese un número de teléfono válido (solo números)');
      return;
    }

    if (user) {
      onSubmit(user.id, formData);
    } else {
      onSubmit(formData);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[0-9]+$/.test(phone);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombreCompleto">Nombre Completo</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correoElectronico">Correo Electrónico</label>
            <input
              type="email"
              id="correoElectronico"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroTelefono">Número de Teléfono</label>
            <input
              type="text"
              id="numeroTelefono"
              name="numeroTelefono"
              value={formData.numeroTelefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {user ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;

