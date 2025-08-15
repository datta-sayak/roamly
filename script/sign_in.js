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

  const secretKey = 'your-secret-key'; // Replace with secure key
  const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();

  //edit this part
  fetch('/your-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload: encrypted })
  })
  .then(res => res.json())
  .then(response => {
    if (response.success) {
      showMessage('success');
    } else {
      showMessage('error');
    }
  })
  .catch(() => {
    showMessage('error');
  });
});