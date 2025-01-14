// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submissions
app.post('/submit-data', async (req, res) => {
    const {
        caller_id,
        first_name,
        last_name,
        email,
        zip,
        sub_id,
        trusted_form_cert_url,
        trusted_form_cert,
        s1,
        s2,
        s3
    } = req.body;

    // Prepare data payload
    const data = {
        lead_token: process.env.API_TOKEN,
        caller_id,
        traffic_source_id: '564001', // Static value as per instructions
        first_name,
        last_name,
        email,
        zip,
        sub_id,
        trusted_form_cert_url,
        trusted_form_cert,
        s1,
        s2,
        s3
    };

    // Remove undefined or empty fields
    Object.keys(data).forEach(key => {
        if (data[key] === undefined || data[key] === '') {
            delete data[key];
        }
    });

    try {
        const response = await axios.post('https://live-calls-network.trackdrive.com/api/v1/leads', null, {
            params: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            res.status(200).json({
                success: true,
                message: 'Data submitted successfully!',
                lead: response.data.lead
            });
        } else {
            res.status(response.status).json({
                success: false,
                message: 'Failed to submit data.',
                errors: response.data.errors || {}
            });
        }
    } catch (error) {
        console.error('Error posting data:', error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while submitting data.'
        });
    }
});

// Fallback route to serve the HTML form
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
