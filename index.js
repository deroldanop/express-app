const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set the view engine to use HTML files
app.set('view engine', 'html');
// Use the built-in middleware to serve static files
app.use(express.static(path.join(__dirname, 'views')));
// Use the body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Custom middleware for logging request data
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route to render the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Route to render the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  console.log('Form data:', req.body);
  res.send('Success');
});

// Route to download the image
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'example.jpg');
  res.download(filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

