const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');
const app = express();
const PORT = 4000;

// Configure Redis client
const redis = new Redis("rediss://red-cffst6hgp3jjsea2p1c0:hsTt7ViwP8IrERyZaryFhRsIcV8x7xQ0@singapore-redis.render.com:6379");

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});
function replaceOgUrl(html) {
  let updatedHtml = html;

  // Replace 'og:url' content
  updatedHtml = updatedHtml.replace(
    /<meta property="og:url" content="https:\/\/whitetigerhome\.in([^"]*)"/g,
    '<meta property="og:url" content="https://acadlog.com/blog$1"'
  );

  // Replace canonical link
  updatedHtml = updatedHtml.replace(
    /<link rel="canonical" href="https:\/\/whitetigerhome\.in([^"]*)"/g,
    '<link rel="canonical" href="https://acadlog.com/blog$1"'
  );

  // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
  updatedHtml = updatedHtml.replace(
    /https:\/\/whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
    'https://acadlog.com/blog$1'
  );

  return updatedHtml;
}


app.get('/*', async (req, res) => {
  let path = req.params[0].split("blog/")[1]
  try {
      const response = await axios.get(`https://whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }catch(err){
      res.status(500).send('An error occurred while fetching the content');
    }
});

// app.get('/blog/hi/:blogUrl', async (req, res) => {
//   const { blogUrl } = req.params;

//   // Try to fetch the data from Redis cache first
//   try {
//     const cachedData = await redis.get(blogUrl);
    
//     if (cachedData) {
//       // Send the cached data if found
//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).send(cachedData);
//     } else {
//       // Fetch the data if not in cache
//       const response = await axios.get(`https://whitetigerhome.in/blog/hi/${blogUrl}`);
//       let html = response.data;
//       html = replaceOgUrl(html);
//       // Store the data in Redis cache for future use
//       await redis.set(blogUrl, html, 'EX', 0); // 3600 seconds expiration time

//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).send(html);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching the content');
//   }
// });

// app.get('/blog/:blogUrl', async (req, res) => {
//   const { blogUrl } = req.params;

//   // Try to fetch the data from Redis cache first
//   try {
//     const cachedData = await redis.get(blogUrl);
    
//     if (false) {
//       // Send the cached data if found
//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).send(cachedData);
//     } else {
//       // Fetch the data if not in cache
//       const response = await axios.get(`https://whitetigerhome.in/blog/${blogUrl}`);
//       let html = response.data;
//       html = replaceOgUrl(html);
//       // Store the data in Redis cache for future use
//       await redis.set(blogUrl, html, 'EX', 3600); // 3600 seconds expiration time

//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).send(html);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching the content');
//   }
// });

// app.get('/:storyUrl', async (req, res) => {
//   const { storyUrl } = req.params;

//   // Try to fetch the data from Redis cache first
//   try {
//     const cachedData = await redis.get(storyUrl);
    
//     if (cachedData) {
//       // Send the cached data if found
//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).send(cachedData);
//     } else {
//       // Fetch the data if not in cache
//       const response = await axios.get(`https://whitetigerhome.in/web-stories/${storyUrl}`);
//       let html = response.data;
//       html = replaceOgUrl(html);
//       // Store the data in Redis cache for future use
//       await redis.set(storyUrl, html, 'EX', 3600); // 3600 seconds expiration time

//       res.setHeader('Content-Type', 'text/html');
//       res.status(200).send(html);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching the content');
//   }
// });

app.get('/about', (req, res) => {
  res.send('This is my about route..... ');
});

// Export the Express API
module.exports = app;