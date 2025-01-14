// client.js

document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        caller_id: document.getElementById('caller_id').value.trim(),
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        zip: document.getElementById('zip').value.trim(),
        sub_id: document.getElementById('sub_id').value.trim(),
        trusted_form_cert_url: document.getElementById('trusted_form_cert_url').value.trim(),
        trusted_form_cert: document.getElementById('trusted_form_cert').value.trim(),
        s1: document.getElementById('s1').value.trim(),
        s2: document.getElementById('s2').value.trim(),
        s3: document.getElementById('s3').value.trim(),
    };

    // Simple front-end validation (optional)
    if (!formData.caller_id || !formData.first_name || !formData.last_name || !formData.email || !formData.zip) {
        displayMessage('Please fill in all required fields.', 'error');
        return;
    }

    try {
        const response = await fetch('/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            displayMessage(result.message, 'success');
            document.getElementById('leadForm').reset();
        } else {
            const errorMsg = result.message || 'Failed to submit data.';
            displayMessage(errorMsg, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage('An unexpected error occurred.', 'error');
    }
});

// Function to display messages to the user
function displayMessage(message, type) {
    const messageDiv = document.getElementById('responseMessage');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}
