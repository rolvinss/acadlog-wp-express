const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');
const app = express();
const PORT = 4000;

// Configure Redis client
const redis = new Redis({
  host: 'red-cffst6hgp3jjsea2p1c0', // Replace with your host
  port: '6379', // Replace with your port
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

app.get('/:storyUrl', async (req, res) => {
  const { storyUrl } = req.params;

  // Try to fetch the data from Redis cache first
  try {
    const cachedData = await redis.get(storyUrl);
    
    if (cachedData) {
      // Send the cached data if found
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(cachedData);
    } else {
      // Fetch the data if not in cache
      const response = await axios.get(`https://acadlog.in/web-stories/${storyUrl}`);
      const html = response.data;

      // Store the data in Redis cache for future use
      await redis.set(storyUrl, html, 'EX', 1); // 3600 seconds expiration time

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the content');
  }
});

app.get('/about', (req, res) => {
  res.send('This is my about route..... ');
});

// Export the Express API
module.exports = app;
