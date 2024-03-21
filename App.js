import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      const modifiedData = response.data.map(user => ({
        userId: user.userId,
        userPassword: user.userPassword,
        userRole: user.userRole,
        createdAt: user.createdAt,
        createdBy: user.createdBy,
        modifiedAt: user.modifiedAt,
        modifiedBy: user.modifiedBy
      }));
      setUsers(modifiedData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>User Management Page</h1>
          <div className="button-container">
            <button>Add User</button>
            <button>Delete User</button>
            <button>Edit User</button>
          </div>
          <div className="users-table">
            <table>
              <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Password</th>
                <th>User Role</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Modified At</th>
                <th>Modified By</th>
              </tr>
              </thead>
              <tbody>
              {users.map((user, index) => (
                  <tr key={index} className={user === selectedUser ? "selected" : ""} onClick={() => handleUserClick(user)}>
                    <td>{index + 1}</td>
                    <td>{user.userId}</td>
                    <td>{user.userPassword}</td>
                    <td>{user.userRole}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.createdBy}</td>
                    <td>{user.modifiedAt}</td>
                    <td>{user.modifiedBy}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </header>
      </div>
  );
}

export default App;