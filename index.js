const express = require('express')
const axios = require('axios');
const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/:storyUrl',async (req, res) => {
     const { storyUrl } = req.params;

    try {
      const response = await axios.get(`https://acadlog.in/web-stories/${storyUrl}`);
      const html = response.data;

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the content');
    }
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app
