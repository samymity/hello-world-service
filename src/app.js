// Hello World Microservice
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Input validation middleware
const validateInput = (req, res, next) => {
  if (req.body.name && typeof req.body.name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string' });
  }
  if (req.body.greeting && typeof req.body.greeting !== 'string') {
    return res.status(400).json({ error: 'Greeting must be a string' });
  }
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'hello-world-service',
    uptime: process.uptime()
  });
});

// Main hello world endpoint
app.get('/hello', (req, res) => {
  const name = req.query.name || 'World';
  res.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    service: 'hello-world-service'
  });
});

// POST endpoint for personalized greetings with validation
app.post('/hello', validateInput, (req, res) => {
  const { name, greeting } = req.body;
  const finalGreeting = greeting || 'Hello';
  const finalName = name || 'World';
  
  res.json({
    message: `${finalGreeting}, ${finalName}!`,
    timestamp: new Date().toISOString(),
    service: 'hello-world-service'
  });
});

// Random greeting endpoint
app.get('/random-greeting', (req, res) => {
  const greetings = [
    'Hello', 'Hi', 'Hey', 'Greetings', 'Welcome',
    'Bonjour', 'Hola', 'Ciao', 'Namaste', 'G\'day'
  ];
  const name = req.query.name || 'World';
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  res.json({
    message: `${randomGreeting}, ${name}!`,
    greeting: randomGreeting,
    timestamp: new Date().toISOString(),
    service: 'hello-world-service'
  });
});

// API documentation endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'hello-world-service',
    version: '1.0.0',
    endpoints: {
      '/': 'API documentation (this endpoint)',
      '/health': 'Health check endpoint',
      '/hello': 'GET: Basic greeting with optional name query parameter',
      '/hello (POST)': 'Personalized greeting with name and greeting in request body',
      '/random-greeting': 'Random greeting with optional name query parameter'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Hello World microservice running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API documentation: http://localhost:${PORT}/`);
  console.log(`Try: http://localhost:${PORT}/hello?name=Claude`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});