import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import { createUser, deleteUser, fetchUserById, fetchUsers, updateUser } from '../services/UserService';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [editingUserDetails, setEditingUserDetails] = useState(null);
  // const [editingUserId, setEditingUserId] = useState(null); 

  const showSuccessAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000); // 3000 milliseconds = 3 seconds
  };

  useEffect(() => {
    fetAllUsers();
  }, []);

  const fetAllUsers = () => {
    fetchUsers().then((data) => setUsers(data));
  }

  const handleAddUser = (user) => {
    createUser(user).then((data) => {
      // setUsers([...users, data]);
      console.log("added successfully ", data);
      fetAllUsers();
    });
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then((data) => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      console.log("deleted successfully ", data);
    });
    fetAllUsers();
  };

  const handleEditUser = (user) => {
    // setEditingUserId(userId);
    console.log("editing details of ", user);
    setEditingUserDetails(user);
  };

  const handleUpdateUser = (editedUser) => {
    updateUser(editedUser).then((data) => {
      const updatedUsers = users.map((user) =>
        user.id === editedUser.id ? data : user
      );
      setUsers(updatedUsers);
      // setEditingUserId(null);
      console.log("updated successfully ", data);
      showSuccessAlert();
    });
  }

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <h1 className='text-center'>User Management</h1>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>

          </div>
          <div className='col-md-6'>
            <UserForm
              handleAddUser={handleAddUser}
              handleUpdateUser={handleUpdateUser}
              showAlert={showAlert}
              editingUserDetails={editingUserDetails}
              showSuccessAlert={showSuccessAlert}
            /> <br />
            <UserList
              users={users}
              handleDeleteUser={handleDeleteUser}
              handleEditUser={handleEditUser}
              handleUpdateUser={handleUpdateUser}
              showAlert={showAlert}
              showSuccessAlert={showSuccessAlert}
            // editingUserId={editingUserId} // Pass the editingUserId to the UserList component 
            />
          </div>
          <div className='col-md-3'>

          </div>
        </div>
      </div>
    </>
  );
}

export default UserManagement;
