const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');
const { JSDOM } = require('jsdom');
const app = express();
const PORT = 4000;


// Configure Redis client
// const redis = new Redis("rediss://red-cffst6hgp3jjsea2p1c0:hsTt7ViwP8IrERyZaryFhRsIcV8x7xQ0@singapore-redis.render.com:6379");

const redis = new Redis({
  hostname: "localhost",
  port: "6379"
});

function replaceOgUrl(html) {
  const dom = new JSDOM(html);
  
  // Log the original HTML for debugging
  console.log("Original HTML:", html);

  const ogUrlMetaTag = dom.window.document.querySelector('meta[property="og:url"]');

  if (ogUrlMetaTag) {
    const content = ogUrlMetaTag.getAttribute('content');
    if (content && content.includes('whitetigerhome.in')) {
      ogUrlMetaTag.setAttribute('content', content.replace('whitetigerhome.in', 'acadlog.com'));
    }
  }

  // Replace canonical link
  const canonicalLink = dom.window.document.querySelector('link[rel="canonical"]');
  
  // Log the canonical link for debugging
  console.log("Canonical Link Element:", canonicalLink);

  if (canonicalLink) {
    const href = canonicalLink.getAttribute('href');
    if (href && href.includes('whitetigerhome.in')) {
      canonicalLink.setAttribute('href', href.replace('whitetigerhome.in', 'acadlog.com'));
    }
  }

  const updatedHtml = dom.serialize();
  // Log the updated HTML for debugging
  console.log("Updated HTML:", updatedHtml);

  return updatedHtml;
}



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
      const response = await axios.get(`https://whitetigerhome.in/web-stories/${storyUrl}`);
      let html = response.data;

      // Replace the og:url content
      html = replaceOgUrl(html);

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
