function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if(!data.fullName || !data.username || !data.email || !data.password || !data.category){
        showNotification('Please fill all the details', 'custom');
        return;
    }
    data.isGuide = data.category === 'Guide';
    delete data.category;
    const jsonString = JSON.stringify(data);

    try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonString
        })
        const ans = await res.json();
        if (!ans.statusCode)    showNotification(ans.data, 'custom');
        else    showNotification('Registered Successfully!', 'success');

    } catch (error) {
        showNotification('Failed to Register!', 'error');
        console.log(error);
    }

});