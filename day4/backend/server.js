const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'url_shortener',
  password: 'nemo123',
  port: 5432,
  max: 10
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.query(`
  CREATE TABLE IF NOT EXISTS urls (
    id VARCHAR(10) PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_url VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    click_count INTEGER DEFAULT 0
  )
`).then(() => console.log(' Table "urls" créée, OK'));


app.get('/', (req, res) => {
  res.json({
  "message": " URL Shortener Day 4 POSTGRESQL !",
  "database": "PostgreSQL connecté",
  "endpoints": ["/api/urls (POST)", "/api/urls (GET)", "/api/urls/:id (GET)", "/:id (redirect)"]
  });
});


app.post('/api/urls', async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl || !originalUrl.startsWith('http')) {
        return res.status(400).json({ error: 'URL invalide (doit commencer par http/https)' });
    }

    const id = Math.random().toString(36).substr(2, 6);
    const shortUrl = `http://localhost:${PORT}/${id}`;
    
    try {
    const result = await pool.query(
      `INSERT INTO urls (id, original_url, short_url) 
       VALUES ($1, $2, $3) RETURNING *`,
      [id, originalUrl, shortUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur BDD' });
  }
});

app.get('/api/urls', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM urls ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur BDD' });
  }
});


app.get('/api/urls/:id', async (req, res) => {
  const { id } = req.params;
   try {
    const result = await pool.query('SELECT * FROM urls WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'URL non trouvée' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur BDD' });
  }
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE urls SET click_count = click_count + 1 WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'URL non trouvée' });
    }
    res.redirect(301, result.rows[0].original_url);
  } catch (error) {
    res.status(500).json({ error: 'Erreur BDD' });
  }
});


app.listen(PORT, () => {
 console.log(` Day 4 PostgreSQL: http://localhost:${PORT}`);
console.log(' Test: POST /api/urls {"originalUrl": "https://google.com"}');
});
