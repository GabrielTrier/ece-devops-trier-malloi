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
  .then(response => response.json())
  .then(data => {
      alert(data.msg);
  })
  .catch(error => {
      console.error('Error:', error);
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
function deleteUserById(userId) {
  fetch(`/user/${userId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      alert(data.msg); // Show success or error message after deletion
    })
    .catch(error => {
      console.error('Error:', error);
    });
}