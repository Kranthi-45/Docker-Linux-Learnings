import React from 'react';

function UserList({ users, handleEditUser, handleDeleteUser }) {
  return (
    <table className="table table-striped">      
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.userName}</td>
            <td>{user.password}</td>
            <td>
              <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={() => handleEditUser(user)}>Edit</button> &nbsp;
              <button className="btn btn-danger"  onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
