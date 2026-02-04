const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({
    message : ' Url Shortner backend carré!',
    api : '/shorten (POST)',
    example: 'POST {url: "https//google.com"}',
    timestamp: new Date().toISOString()
  });
});

let urls = [];
 app.post('/shorten', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL manquant' });
    }

    const shortId = Math.random().toString(36).substr(2, 6);

    urls.push({ 
    id: shortId, 
    originalUrl: url,
    createdAt: new Date().toISOString()
  });
  
  res.status(201).json({
    shortUrl: `http://localhost:3000/${shortId}`,
    id: shortId
  });
 });

 app.get('/:id', (req, res) => {
  const { id } = req.params;
  const urlObj = urls.find(u => u.id === id);
  
  if (!urlObj) {
    return res.status(404).json({ error: 'URL courte non trouvée' });
  }

  res.redirect(301, urlObj.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
