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

function replaceOgUrl(html, source="whitetigerhome") {
  let updatedHtml = html;
  if(source==="whitetigerhome"){
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

  // New replacement for anchor tags
  updatedHtml = updatedHtml.replace(
  /<a([^>]*)href="https:\/\/whitetigerhome\.in([^"]*)"/g,
  '<a$1href="https://acadlog.com/blog$2"'
);

  return updatedHtml;
  } else if(source==="sarkarinaukri.whitetigerhome.in"){
    // Replace 'og:url' content
      updatedHtml = updatedHtml.replace(
        /<meta property="og:url" content="https:\/\/sarkarinaukri.whitetigerhome\.in([^"]*)"/g,
        '<meta property="og:url" content="https://acadlog.com/sarkarinaukri$1"'
      );

      // Replace canonical link
      updatedHtml = updatedHtml.replace(
        /<link rel="canonical" href="https:\/\/sarkarinaukri.whitetigerhome\.in([^"]*)"/g,
        '<link rel="canonical" href="https://acadlog.com/sarkarinaukri$1"'
      );

      // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
      updatedHtml = updatedHtml.replace(
        /https:\/\/sarkarinaukri.whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
        'https://acadlog.com/sarkarinaukri$1'
      );

      // New replacement for anchor tags
      updatedHtml = updatedHtml.replace(
      /<a([^>]*)href="https:\/\/sarkarinaukri.whitetigerhome\.in([^"]*)"/g,
      '<a$1href="https://acadlog.com/sarkarinaukri$2"'
      );

      return updatedHtml;
      } else if(source==="govtjobalerts.whitetigerhome.in"){
        // Replace 'og:url' content
      updatedHtml = updatedHtml.replace(
      /<meta property="og:url" content="https:\/\/govtjobalerts.whitetigerhome\.in([^"]*)"/g,
      '<meta property="og:url" content="https://acadlog.com/govtjobalerts$1"'
      );

      // Replace canonical link
      updatedHtml = updatedHtml.replace(
      /<link rel="canonical" href="https:\/\/govtjobalerts.whitetigerhome\.in([^"]*)"/g,
      '<link rel="canonical" href="https://acadlog.com/govtjobalerts$1"'
      );

      // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
      updatedHtml = updatedHtml.replace(
      /https:\/\/govtjobalerts.whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
      'https://acadlog.com/govtjobalerts$1'
      );

      // New replacement for anchor tags
      updatedHtml = updatedHtml.replace(
      /<a([^>]*)href="https:\/\/govtjobalerts.whitetigerhome\.in([^"]*)"/g,
      '<a$1href="https://acadlog.com/govtjobalerts$2"'
      );

    return updatedHtml;
    }else if(source==="whylearnthings"){
    // Replace 'og:url' content
    updatedHtml = updatedHtml.replace(
      /<meta property="og:url" content="https:\/\/whylearnthings\.com([^"]*)"/g,
      '<meta property="og:url" content="https://acadlog.com/usa$1"'
    );
  
    // Replace canonical link
    updatedHtml = updatedHtml.replace(
      /<link rel="canonical" href="https:\/\/whylearnthings\.com([^"]*)"/g,
      '<link rel="canonical" href="https://acadlog.com/usa$1"'
    );
  
    // General replacement for 'whylearnthings.com' to 'acadlog.com', excluding URLs with 'wp-content'
    updatedHtml = updatedHtml.replace(
      /https:\/\/whylearnthings\.com(?!.*wp-content)([^"]*)/g,
      'https://acadlog.com/usa$1'
    );  

    // New replacement for anchor tags
    updatedHtml = updatedHtml.replace(
      /<a([^>]*)href="https:\/\/whylearnthings\.com([^"]*)"/g,
      '<a$1href="https://acadlog.com/usa$2"'
    );
    return updatedHtml;
  }else{
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
}


app.get('/usa*', async (req, res) => {
  let path = req.params[0]
  try {
      const response = await axios.get(`https://whylearnthings.com/${path}`);
      let html = response.data;
      html = replaceOgUrl(html,"whylearnthings");
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }catch(err){
      res.status(500).send('An error occurred while fetching the content');
    }
});

app.get('/blog*', async (req, res) => {
  let path = req.params[0]
  try {
      const response = await axios.get(`https://whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html,"whitetigerhome");
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }catch(err){
      res.status(500).send('An error occurred while fetching the content');
    }
});

app.get('/sarkarinaukri*', async (req, res) => {
  let path = req.params[0]
  try {
      const response = await axios.get(`https://sarkarinaukri.whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html,"sarkarinaukri.whitetigerhome.in");
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }catch(err){
      res.status(500).send('An error occurred while fetching the content');
    }
});

app.get('/govtjobalerts*', async (req, res) => {
  let path = req.params[0]
  try {
      const response = await axios.get(`https://govtjobalerts.whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html,"govtjobalerts.whitetigerhome.in");
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }catch(err){
      res.status(500).send('An error occurred while fetching the content');
    }
});

// Export the Express API
module.exports = app;