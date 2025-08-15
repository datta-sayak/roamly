//import CryptoJS from 'crypto-js';

function showMessage(type) {
  const successDiv = document.getElementById('success');
  const errorDiv = document.getElementById('error');

  successDiv.classList.remove('active');
  errorDiv.classList.remove('active');

  const target = type === 'success' ? successDiv : errorDiv;
  target.classList.add('active');

  setTimeout(() => {
    target.classList.remove('active');
  }, 3000);
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const jsonString = JSON.stringify(data);

  //const secretKey = 'yoooyo'; // Replace with secure key
  //const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  console.log(jsonString)
  console.log("--------------")
  //edit this part
  fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonString })
  })
  .then(res => res.json())
  .then(response => {
    if (response.success) {
      showMessage('success');
    } else {
      showMessage('error');
    }
  })
  .catch((error) => {
    console.log(error);
    showMessage('error');
  });
});