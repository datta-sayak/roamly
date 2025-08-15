//import CryptoJS from 'crypto-js';

function showMessage(type, msg) {
    const successDiv = document.getElementById('success');
    const errorDiv = document.getElementById('error');

    //successDiv.classList.remove('active');
    //errorDiv.classList.remove('active');

    const target = type === 'error' ? successDiv : errorDiv;
    target.classList.add('active');
    console.log(msg);

    setTimeout(() => {
        target.classList.remove('active');
    }, 3000);
}

document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.isGuide = data.category === 'Guide';
    delete data.category;
    const jsonString = JSON.stringify(data);
    //const secretKey = 'yoooyo'; // Replace with secure key
    //const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();

    try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonString
        })
        const data = await res.json();
        if (!res.ok) showMessage("error", data.data);
        else showMessage("success", data.data);

    } catch (error) {
        console.log(error);
    }


});