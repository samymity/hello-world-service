// Hello World Microservice
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'hello-world-service'
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

// POST endpoint for personalized greetings
app.post('/hello', (req, res) => {
  const { name, greeting } = req.body;
  const finalGreeting = greeting || 'Hello';
  const finalName = name || 'World';
  
  res.json({
    message: `${finalGreeting}, ${finalName}!`,
    timestamp: new Date().toISOString(),
    service: 'hello-world-service'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Hello World microservice running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
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