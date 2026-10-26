require('dotenv').config();

const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON body parsing
app.use(express.json());

// Serve static files from the public/ folder
app.use(express.static(path.join(__dirname, 'public')));

// GET / route — serve public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api/profiles — return up to 20 profiles with primary photo
app.get('/api/profiles', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.user_id, p.first_name, p.last_name, p.birth_date,
             p.bio, p.gender, p.location_name, ph.url as photo_url
      FROM profiles p
      LEFT JOIN photos ph ON p.user_id = ph.user_id AND ph.is_primary = true
      LIMIT 20
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/profiles/:id — return a single profile by user_id
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.user_id, p.first_name, p.last_name, p.birth_date,
             p.bio, p.gender, p.location_name, ph.url as photo_url
      FROM profiles p
      LEFT JOIN photos ph ON p.user_id = ph.user_id AND ph.is_primary = true
      WHERE p.user_id = $1
    `, [req.params.id]);

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/swipe — record a swipe action
app.post('/api/swipe', async (req, res) => {
  try {
    const { swiper_id, swiped_id } = req.body;
    await pool.query(
      'INSERT INTO swipes (swiper_id, swiped_id) VALUES ($1, $2)',
      [swiper_id, swiped_id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});