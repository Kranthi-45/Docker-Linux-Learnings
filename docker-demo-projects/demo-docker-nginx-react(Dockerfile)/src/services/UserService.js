import axios from "axios";
const BASE_URL = 'http://localhost:8080/api/user'; // Update with your API URL

async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/all`);
  const data = await response.json();
  return data;
}

async function fetchUserById(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`);
  const data = await response.json();
  const formattedData = Array.isArray(data) ? data : [data]
  return formattedData;
}

async function createUser(user) {
  // const response = await fetch(BASE_URL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(user),
  // });
  // const data = await response.json();
  // return data;
  return axios.post(BASE_URL,user);
}

async function deleteUser(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

async function updateUser(user) {
  const response = await fetch(`${BASE_URL}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}

export { fetchUsers, createUser, deleteUser, updateUser, fetchUserById };
