<?php
// Set the API endpoint URL
$api_url = 'https://live-calls-network.trackdrive.com/api/v1/leads';

// Capture the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Create a cURL request to the API
$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute the request
$response = curl_exec($ch);
curl_close($ch);

// Send the response back to the client
echo $response;
?>
