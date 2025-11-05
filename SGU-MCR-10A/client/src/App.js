import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import UserModal from './components/UserModal';
import UserTable from './components/UserTable';

// En Docker, nginx hace proxy de /api al backend, por lo que usamos URL relativa
// En desarrollo local, usar la URL completa
const API_URL = process.env.REACT_APP_API_URL || '/api/usuarios';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      alert('Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await axios.post(API_URL, userData);
      fetchUsers();
      setIsModalOpen(false);
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear el usuario');
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await axios.put(`${API_URL}/${id}`, userData);
      fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
      alert('Usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
        alert('Usuario eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar el usuario');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Usuarios - SGU</h1>
      </header>
      
      <main className="App-main">
        <div className="container">
          <div className="header-actions">
            <h2>Lista de Usuarios</h2>
            <button className="btn btn-primary" onClick={handleOpenCreateModal}>
              + Nuevo Usuario
            </button>
          </div>

          {loading ? (
            <div className="loading">Cargando...</div>
          ) : (
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={handleDeleteUser}
            />
          )}

          <UserModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            user={editingUser}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

