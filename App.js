import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    userId: "",
    userPassword: "",
    userRole: "",
    createdAt: "",
    createdBy: "",
    modifiedAt: "",
    modifiedBy: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    // Clear the new user data after adding
    setNewUser({
      userId: "",
      userPassword: "",
      userRole: "",
      createdAt: "",
      createdBy: "",
      modifiedAt: "",
      modifiedBy: ""
    });
  };

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>User Management Page</h1>
          <div className="button-container">
            <button onClick={handleAddUser}>Add User</button>
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
        <div className="add-user-form">
          <h2>Add New User</h2>
          <input type="text" name="userId" value={newUser.userId} onChange={handleInputChange} placeholder="User ID" />
          <input type="text" name="userPassword" value={newUser.userPassword} onChange={handleInputChange} placeholder="Password" />
          <input type="text" name="userRole" value={newUser.userRole} onChange={handleInputChange} placeholder="User Role" />
          <input type="text" name="createdAt" value={newUser.createdAt} onChange={handleInputChange} placeholder="Created At" />
          <input type="text" name="createdBy" value={newUser.createdBy} onChange={handleInputChange} placeholder="Created By" />
          <input type="text" name="modifiedAt" value={newUser.modifiedAt} onChange={handleInputChange} placeholder="Modified At" />
          <input type="text" name="modifiedBy" value={newUser.modifiedBy} onChange={handleInputChange} placeholder="Modified By" />
        </div>
      </div>
  );
}

export default App;