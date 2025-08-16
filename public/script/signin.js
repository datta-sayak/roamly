function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

document.getElementById('signinForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if(!data.username){
        showNotification('Please enter username', 'custom');
        return;
    }
    if(!data.password){
        showNotification('Please enter password', 'custom');
        return;
    }

    const jsonString = JSON.stringify(data);

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonString
        })
        const ans = await res.json();
        if (!ans.statusCode)    showNotification(ans.data, 'custom');
        else {
            showNotification('Logged in Successfully!', 'success');
            setTimeout( () => {
                window.location.reload();
                window.location.href = '/tour';
            } , 500);
        }
    } catch (error) {
        showNotification('Failed to Login', 'error');
        console.log(error);
    }
    document.getElementById("signinForm").reset();


});