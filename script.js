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
        lead_token: '37deebd7904c4deab896221f8b0c1570', // Your actual token
        traffic_source_id: 'your-traffic-source-id-here' // Replace with actual ID if required
    };

    // Send data to your PHP proxy
    fetch('https://masstort.allcoveragemedia.com/proxy.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Check if response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        // Handle the success response
        document.getElementById('message').innerText = 'Lead submitted successfully!';
    })
    .catch(error => {
        // Handle errors
        document.getElementById('message').innerText = 'Error submitting lead: ' + error.message;
    });
});
