document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        zip: formData.get('zip'),
        phone: formData.get('phone'),
        lead_token: 'your-lead-token-here', // Replace with actual token
        traffic_source_id: 'your-traffic-source-id-here' // Replace with actual ID
    };

    // Send data to the API
    fetch('https://live-calls-network.trackdrive.com/api/v1/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('message').innerText = 'Lead submitted successfully!';
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error submitting lead.';
    });
});
