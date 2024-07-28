// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 8080;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/events', upload.single('eventImage'), (req, res) => {
    const event = req.body;
    const image = req.file;
    console.log('Event Data:', event);
    console.log('Event Image:', image);
    res.send('Event created successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
