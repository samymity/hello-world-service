import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/hello', { name, greeting });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || 'Something went wrong'));
    }
    setLoading(false);
  };

  const getRandomGreeting = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/random-greeting${name ? `?name=${name}` : ''}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || 'Something went wrong'));
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Hello World Service</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="greeting">Custom Greeting:</label>
          <input
            type="text"
            id="greeting"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            placeholder="Enter a greeting"
          />
        </div>

        <div className="buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Greeting'}
          </button>
          <button type="button" onClick={getRandomGreeting} disabled={loading}>
            Get Random Greeting
          </button>
        </div>
      </form>

      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App; 