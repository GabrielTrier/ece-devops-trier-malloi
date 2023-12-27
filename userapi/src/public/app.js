function createUser() {
  const username = document.getElementById('username').value;
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;

  fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      firstname,
      lastname,
    }),
  })
  .then(response => {
    if (response.status === 201) {
      return { status: 'success', msg: 'User created successfully' };
    } else {
      throw new Error('Failed to create user');
    }
  })
  .then(data => {
    if (data.status === 'success') {
      alert(data.msg); // Show success message after user creation
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to create user');
  });
}


function getUser() {
  const getUsername = document.getElementById('getUsername').value;

  fetch(`/user/${getUsername}`)
  .then(response => response.json())
  .then(data => {
      alert(JSON.stringify(data.msg));
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
function deleteUser() {
  const userId = document.getElementById('deleteUsername').value;
  fetch(`/user/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 200) {
      return { status: 'success', msg: 'User deleted successfully' };
    } else {
      throw new Error('Failed to delete user');
    }
  })
  .then(data => {
    if (data.status === 'success') {
      alert(data.msg); // Show success message after deletion
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to delete user');
  });
}

