const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');
const app = express();
const cors = require('cors');
const PORT = 4000;

// Configure Redis client
const redis = new Redis("rediss://red-cffst6hgp3jjsea2p1c0:hsTt7ViwP8IrERyZaryFhRsIcV8x7xQ0@singapore-redis.render.com:6379");

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

app.use(cors());
app.use('/assets-foxiz', express.static('assets-foxiz'));

function replaceOgUrl(html, source = "whitetigerhome",isWebStory) {
  const linkTag1 = `<link rel="preload" href="https://acadlog.com/assets-foxiz/fonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin="anonymous"></link>`;
  const linkTag2 = `<link rel="preload" href="https://acadlog.com/assets-foxiz/fonts/fa-regular-400.woff2" as="font" type="font/woff2" crossorigin="anonymous"></link>`;
  const linkTag3 = `<link rel="preload" href="https://acadlog.com/assets-foxiz/fonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin="anonymous"></link>`;
  const linkTag4 = `<link rel="preload" href="https://acadlog.com/assets-foxiz/fonts/fa-v4compatibility.woff2" as="font" type="font/woff2" crossorigin="anonymous"></link>`;
  const linkTag5 = `<link rel="preload" href="https://acadlog.com/assets-foxiz/fonts/icons.woff2" as="font" type="font/woff2" crossorigin="anonymous"></link>`;
  const linkTag6 = `<link rel="stylesheet" id="foxiz-main-css" href="https://acadlog.com/assets-foxiz/css/main.css?ver=2.1.5" media="all">`
  // Insert the link tag under the header section
  if(!isWebStory){
    html = html.replace(/(<\/head>)/i, `${linkTag1}$1`);
    html = html.replace(/(<\/head>)/i, `${linkTag2}$1`);
    html = html.replace(/(<\/head>)/i, `${linkTag3}$1`);
    html = html.replace(/(<\/head>)/i, `${linkTag4}$1`);
    html = html.replace(/(<\/head>)/i, `${linkTag5}$1`);
    html = html.replace(/(<\/head>)/i, `${linkTag6}$1`);
  }
  let updatedHtml = html;
  if (source === "whitetigerhome") {
    // Replace 'og:url' content
    updatedHtml = updatedHtml.replace(
      /<meta property="og:url" content="https:\/\/whitetigerhome\.in([^"]*)"/g,
      '<meta property="og:url" content="https://acadlog.com/updates/blog$1"'
    );

    // Replace canonical link
    updatedHtml = updatedHtml.replace(
      /<link rel="canonical" href="https:\/\/whitetigerhome\.in([^"]*)"/g,
      '<link rel="canonical" href="https://acadlog.com/updates/blog$1"'
    );

    // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
    updatedHtml = updatedHtml.replace(
      /https:\/\/whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
      'https://acadlog.com/updates/blog$1'
    );

    // New replacement for anchor tags
    updatedHtml = updatedHtml.replace(
      /<a([^>]*)href="https:\/\/whitetigerhome\.in([^"]*)"/g,
      '<a$1href="https://acadlog.com/updates/blog$2"'
    );

    return updatedHtml;
  } else if (source === "sarkarinaukri.whitetigerhome.in") {
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
  } else if (source === "govtjobalerts.whitetigerhome.in") {
    // Replace 'og:url' content
    updatedHtml = updatedHtml.replace(
      /<meta property="og:url" content="https:\/\/govtjobalerts.whitetigerhome\.in([^"]*)"/g,
      '<meta property="og:url" content="https://acadlog.com/updates/job-alert$1"'
    );

    // Replace canonical link
    updatedHtml = updatedHtml.replace(
      /<link rel="canonical" href="https:\/\/govtjobalerts.whitetigerhome\.in([^"]*)"/g,
      '<link rel="canonical" href="https://acadlog.com/updates/job-alert$1"'
    );

    // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
    updatedHtml = updatedHtml.replace(
      /https:\/\/govtjobalerts.whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
      'https://acadlog.com/updates/job-alert$1'
    );

    // New replacement for anchor tags
    updatedHtml = updatedHtml.replace(
      /<a([^>]*)href="https:\/\/govtjobalerts.whitetigerhome\.in([^"]*)"/g,
      '<a$1href="https://acadlog.com/updates/job-alert$2"'
    );

    return updatedHtml;
  } else if (source === "whylearnthings") {
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
  } else if (source === "usajobsgov.whitetigerhome.in") {
    // Replace 'og:url' content
    updatedHtml = updatedHtml.replace(
      /<meta property="og:url" content="https:\/\/usajobsgov.whitetigerhome\.in([^"]*)"/g,
      '<meta property="og:url" content="https://acadlog.com$1"'
    );

    // Replace canonical link
    updatedHtml = updatedHtml.replace(
      /<link rel="canonical" href="https:\/\/usajobsgov.whitetigerhome\.in([^"]*)"/g,
      '<link rel="canonical" href="https://acadlog.com$1"'
    );

    // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
    updatedHtml = updatedHtml.replace(
      /https:\/\/usajobsgov.whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
      'https://acadlog.com$1'
    );

    // New replacement for anchor tags
    updatedHtml = updatedHtml.replace(
      /<a([^>]*)href="https:\/\/usajobsgov.whitetigerhome\.in([^"]*)"/g,
      '<a$1href="https://acadlog.com$2"'
    );
    return updatedHtml;
  } else {
    // Replace 'og:url' content
    updatedHtml = updatedHtml.replace(
      /<meta property="og:url" content="https:\/\/whitetigerhome\.in([^"]*)"/g,
      '<meta property="og:url" content="https://acadlog.com/updates/blog$1"'
    );

    // Replace canonical link
    updatedHtml = updatedHtml.replace(
      /<link rel="canonical" href="https:\/\/whitetigerhome\.in([^"]*)"/g,
      '<link rel="canonical" href="https://acadlog.com/updates/blog$1"'
    );

    // General replacement for 'whitetigerhome.in' to 'acadlog.com', excluding URLs with 'wp-content'
    updatedHtml = updatedHtml.replace(
      /https:\/\/whitetigerhome\.in(?!.*wp-content)([^"]*)/g,
      'https://acadlog.com/updates/blog$1'
    );

    return updatedHtml;
  }
}

app.get('/usajobsgov*', async (req, res) => {
  let path = req.params[0];
  let isWebStory = path.includes("/web-stories/");
  if (path.includes('.xml')) {
    try {
      // Fetching and forwarding the XML content as is
      const response = await axios.get(`https://usajobsgov.whitetigerhome.in/${path}`);
      let xml = response.data;
      // Replace the specific part of the URL in the XML content
      xml = xml.replace('usajobsgov.whitetigerhome.in/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl', 'acadlog.com/usajobsgov/yoast-xml/main-sitemap.xsl');
      xml = xml.replace(/usajobsgov.whitetigerhome\.in/g, 'acadlog.com');
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      console.log(err)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  }else if(path.includes('/feed')){
    try {
      const response = await axios.get(`https://usajobsgov.whitetigerhome.in/${path}`);
      let xml = response.data;
      res.setHeader('Content-Type', 'text/xml');
      xml = xml.replace(/usajobsgov.whitetigerhome\.in(?!.*wp-content)/g, 'acadlog.com/updates/job-alert');
      res.status(200).send(xml);
    } catch (error) {
      console.log(error)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  } else {
    try {
      const response = await axios.get(`https://usajobsgov.whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html, "usajobsgov.whitetigerhome.in",isWebStory);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (err) {
      res.status(404).send('Page not found');
    }
  }
});

app.get('/usa*', async (req, res) => {
  let path = req.params[0];
  let isWebStory = path.includes("/web-stories/");
  // Check if the path contains '.xml'
  if (path.includes('.xml')) {
    try {
      // Fetching and forwarding the XML content as is
      const response = await axios.get(`https://whylearnthings.com/${path}`);
      let xml = response.data;
      // Replace the specific part of the URL in the XML content
      xml = xml.replace('whylearnthings.com/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl', 'acadlog.com/yoast-xml/main-sitemap.xsl');
      xml = xml.replace(/whylearnthings\.com/g, 'acadlog.com/usa');
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      console.log(err)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  }else if(path.includes('/feed')){
    try {
      const response = await axios.get(`https://whylearnthings.com/${path}`);
      let xml = response.data;
      res.setHeader('Content-Type', 'text/xml');
      xml = xml.replace(/whylearnthings\.com(?!.*wp-content)/g, 'acadlog.com/usa');
      res.status(200).send(xml);
    } catch (error) {
      console.log(error)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  } else {
    // Existing code to handle non-XML requests
    try {
      const response = await axios.get(`https://whylearnthings.com/${path}`);
      let html = response.data;
      html = replaceOgUrl(html, "whylearnthings",isWebStory);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (err) {
      res.status(500).send('An error occurred while fetching the content');
    }
  }
});

app.get('/blog*', async (req, res) => {
  let path = req.params[0];
  if(path.length>1){
  let url = `https://acadlog-api.onrender.com/api/blog/public${path}`
  let dataFromAcad = null
  try{
    dataFromAcad = await axios.get(url);
  }catch(err){

  }
  if(dataFromAcad!=null || dataFromAcad!=undefined){
    try {
      const response = await axios.get(`https://acadlog.com/updates/blog-old${path}`);
      let html = response.data;
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (err) {
      res.status(500).send('An error occurred while fetching the content');
    }
    return
  }
}
  let isWebStory = path.includes("/web-stories/");
  if (path.includes('.xml')) {
    try {
      // Fetching and forwarding the XML content as is
      const response = await axios.get(`https://whitetigerhome.in/${path}`);
      let xml = response.data;
      // Replace the specific part of the URL in the XML content
      xml = xml.replace('whitetigerhome.in/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl', 'acadlog.com/yoast-xml/main-sitemap.xsl');
      xml = xml.replace(/whitetigerhome\.in/g, 'acadlog.com/updates/blog');
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      console.log(err)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  }else if(path.includes('/feed')){
    try {
      const response = await axios.get(`https://whitetigerhome.in/${path}`);
      let xml = response.data;
      res.setHeader('Content-Type', 'text/xml');
      xml = xml.replace(/whitetigerhome\.in(?!.*wp-content)/g, 'acadlog.com/updates/blog');
      res.status(200).send(xml);
    } catch (error) {
      console.log(error)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  } else {
    try {
      const response = await axios.get(`https://whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html, "whitetigerhome",isWebStory);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (err) {
      res.status(500).send('An error occurred while fetching the content');
    }
  }
});

app.get('/sarkarinaukri*', async (req, res) => {
  let path = req.params[0];
  let isWebStory = path.includes("/web-stories/");

  if (path.includes('.xml')) {
    try {
      // Fetching and forwarding the XML content as is
      const response = await axios.get(`https://sarkarinaukri.whitetigerhome.in/${path}`);
      let xml = response.data;
      // Replace the specific part of the URL in the XML content
      xml = xml.replace('sarkarinaukri.whitetigerhome.in/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl', 'acadlog.com/yoast-xml/main-sitemap.xsl');
      xml = xml.replace(/sarkarinaukri.whitetigerhome\.in/g, 'acadlog.com/sarkarinaukri');
      console.log(xml)
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      console.log(err)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  }else if(path.includes('/feed')){
    try {
      const response = await axios.get(`https://sarkarinaukri.whitetigerhome.in/${path}`);
      let xml = response.data;
      res.setHeader('Content-Type', 'text/xml');
      xml = xml.replace(/sarkarinaukri.whitetigerhome\.in(?!.*wp-content)/g, 'acadlog.com/sarkarinaukri');
      res.status(200).send(xml);
    } catch (error) {
      console.log(error)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  } else {
    try {
      const response = await axios.get(`https://sarkarinaukri.whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html, "sarkarinaukri.whitetigerhome.in",isWebStory);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (err) {
      res.status(500).send('An error occurred while fetching the content');
    }
  }
});

app.get('/govtjobalerts*', async (req, res) => {
  let path = req.params[0];
  let isWebStory = path.includes("/web-stories/");
  if (path.includes('.xml')) {
    try {
      // Fetching and forwarding the XML content as is
      const response = await axios.get(`https://govtjobalerts.whitetigerhome.in/${path}`);
      let xml = response.data;
      // Replace the specific part of the URL in the XML content
      xml = xml.replace('govtjobalerts.whitetigerhome.in/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl', 'acadlog.com/yoast-xml/main-sitemap.xsl');
      xml = xml.replace(/govtjobalerts.whitetigerhome\.in/g, 'acadlog.com/updates/job-alert');
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      console.log(err)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  }else if(path.includes('/feed')){
    try {
      const response = await axios.get(`https://govtjobalerts.whitetigerhome.in/${path}`);
      let xml = response.data;
      res.setHeader('Content-Type', 'text/xml');
      xml = xml.replace(/govtjobalerts.whitetigerhome\.in(?!.*wp-content)/g, 'acadlog.com/updates/job-alert');
      res.status(200).send(xml);
    } catch (error) {
      console.log(error)
      res.status(500).send('An error occurred while fetching the XML content');
    }
  } else {
    try {
      const response = await axios.get(`https://govtjobalerts.whitetigerhome.in/${path}`);
      let html = response.data;
      html = replaceOgUrl(html, "govtjobalerts.whitetigerhome.in",isWebStory);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } catch (err) {
      res.status(404).send('Page not found');
    }
  }
});



// Export the Express API
module.exports = app;