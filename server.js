// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle form submissions
app.post('/submit-data', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post('https://live-calls-network.trackdrive.com/api_endpoint', data, {
            headers: {
                'Authorization': `Bearer ${process.env.API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Error posting data:', error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to post data'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
