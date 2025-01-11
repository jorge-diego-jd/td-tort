document.getElementById("leadForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    // Collect form data
    const formData = new FormData(event.target);

    const leadData = {
        lead_token: formData.get("lead_token"),
        caller_id: formData.get("caller_id"),
        traffic_source_id: formData.get("traffic_source_id"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        zip: formData.get("zip"),
    };

    // Send the data to the proxy.php (which will forward it to the target API)
    fetch("https://aca.allcoveragemedia.com/td-tort/proxy.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Lead submitted successfully!");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
});
