import React from 'react';
import './UserTable.css';

const UserTable = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay usuarios registrados. ¡Crea uno nuevo!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombreCompleto}</td>
              <td>{user.correoElectronico}</td>
              <td>{user.numeroTelefono}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => onEdit(user)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => onDelete(user.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

