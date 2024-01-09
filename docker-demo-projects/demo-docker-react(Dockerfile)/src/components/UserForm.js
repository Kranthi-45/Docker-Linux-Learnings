import React, { useEffect, useState } from 'react';

function UserForm({ handleAddUser, handleUpdateUser, showAlert, showSuccessAlert, editingUserDetails }) {
  console.log("edit userform", editingUserDetails)
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    // Add more fields here
  });
  const [editFormData, setEditFormData] = useState({
    // id:'',
    userName: '',
    password: '',
    // Add more fields here
  });

  useEffect(() => {
    // Update editFormData when editingUserDetails changes
    setEditFormData({
      // id: editingUserDetails?.id || '',
      userName: editingUserDetails?.userName || '',
      password: editingUserDetails?.password || '',
      // Add more fields here
    });
  }, [editingUserDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userName && formData.password) {
      handleAddUser(formData);
      setFormData({
        userName: '',
        password: '',
        // Reset other fields here
      });
      showSuccessAlert();
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editFormData.userName && editFormData.password) {
      editFormData.id = editingUserDetails?.id;
      handleUpdateUser(editFormData);
      setEditFormData({
        // userId:'',
        userName: '',
        password: '',
        // Reset other fields here
      });
      showSuccessAlert();
    }
  };

  const handleCancel = () => {
    setFormData({
      userName: '',
      password: '',
      // Reset other fields here
    });
    setEditFormData({
      userName: '',
      password: '',
      // Reset other fields here
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            className='form-control'
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className='form-control'
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more input fields here */}
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Add</button> &nbsp;
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Reset</button>  <br /> <br />
        {showAlert && (
          <div className="alert alert-success">
            <strong>Successfully Done!</strong>.
          </div>
        )}
      </form>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" >Update User</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  {/* <input className="userId" name="userName" value={editFormData.id} onChange={handleInputChange} /> */}
                  <label htmlFor="userName">User Name:</label>
                  <input
                    type="text"
                    className='form-control'
                    name="userName"
                    placeholder="User Name"
                    value={editFormData.userName}
                    onChange={handleInputChangeEdit}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className='form-control'
                    name="password"
                    placeholder="Password"
                    value={editFormData.password}
                    onChange={handleInputChangeEdit}
                  />
                </div>
                {/* Add more input fields here */}
                <button type="button" className="btn btn-success" onClick={handleUpdate}>Save</button> &nbsp;
                <button type="button" className="btn btn-secondary" data-dismiss='modal' >Cancel</button>  <br /> <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForm;
