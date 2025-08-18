document.getElementById('signup').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/signup';
})

document.getElementById('signin').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/signin';
})

function searchDest() {
    return document.getElementById("SearchDest").value.trim();
}

document.getElementById('SearchDest').addEventListener('keydown', async function(e) {
    let place;
    if(e.key === "Enter")   place = searchDest();
    else    return;
    if(!place)  return;
    console.log(place);
    try {
        const res = await fetch(`/api/query?q=${encodeURIComponent(place)}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        });
        const ans = await res.json();
        // const cleaned = ans.places_to_visit.replace(/```json|```/g, '').trim();
        // const parsed = JSON.parse(cleaned);
        console.log(ans);
        // parsed.places_to_visit.forEach(element => console.log(element));
    } catch (error) {
        console.log(error);
    }
})



// try {
//         const res = await fetch('/api/login', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: jsonString
//         })
//         const ans = await res.json();
//         if (!ans.statusCode)    showNotification(ans.data, 'custom');
//         else {
//             showNotification('Logged in Successfully!', 'success');
//             setTimeout( () => {
//                 window.location.reload();
//                 window.location.href = '/tour';
//             } , 500);
//         }
//     } catch (error) {
//         showNotification('Failed to Login', 'error');
//         console.log(error);
//     }