require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
    res.send('Unity Dynamic Config Server is running.');
});

// Dynamic config endpoint
// Example: /config/1 returns value of LINK1 from .env
app.get('/config/:id', (req, res) => {
    const id = req.params.id;
    const variableName = `LINK${id}`;
    const value = process.env[variableName];

    if (value) {
        res.json({
            id: id,
            key: variableName,
            value: value
        });
    } else {
        res.status(404).json({
            error: `Variable ${variableName} not found in .env`
        });
    }
});

// Example POST endpoint as requested
app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    res.json({
        message: 'Data received successfully',
        echo: receivedData
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
