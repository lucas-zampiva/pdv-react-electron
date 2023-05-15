import React, { useState, useEffect } from 'react';
import './App.css';
const { ipcRenderer } = window.require('electron');

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    ipcRenderer.send('getAllUsers');
    ipcRenderer.on('getAllUsers', (event, rows) => {
      setUsers(rows);
    });

    return () => {
      ipcRenderer.removeAllListeners('getAllUsers');
    };
  }, []);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      ipcRenderer.send('updateUser', { id: selectedUser.id, name, email });
    } else {
      ipcRenderer.send('addUser', { name, email });
    }
    setName('');
    setEmail('');
    setSelectedUser(null);
    ipcRenderer.send('getAllUsers');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDeleteUser = (id) => {
    ipcRenderer.send('deleteUser', id);
    ipcRenderer.send('getAllUsers');
  };
  return (
    <div className="App">
      <h1>CRUD de Usuários</h1>
      <form>
        <label>
          Nome:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          E-mail:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <button type="button" onClick={handleSaveUser}>
          Salvar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" onClick={() => handleEditUser(user)}>
                  Editar
                </button>
                <button type="button" onClick={() => handleDeleteUser(user.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


