document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        zip: formData.get('zip'),
        phone: formData.get('phone'),
        lead_token: '37deebd7904c4deab896221f8b0c1570',
        traffic_source_id: '564001' // Added actual traffic source ID
    };

    fetch('https://masstort.allcoveragemedia.com/td-tort/proxy.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = 'Lead submitted successfully!';
        }
    })
    .catch(error => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = 'Error submitting lead: ' + error.message;
        }
    });
});
