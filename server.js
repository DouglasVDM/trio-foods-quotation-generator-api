const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE_URL,
  password: process.env.PASSWORD,
  port: process.env.PORT
});


app.get('/', (req, res) => {
  res.send('trio-foods-quotation-generator-api')
});

app.get('/cape-cheese', async (req, res) => {
  try {
    const allCheese = await pool.query('SELECT * FROM cape_cheese');
    console.log('allCheese.row:', allCheese.rows)
    res.json(allCheese.rows)
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/times', (req, res) => res.send(showTimes()))

showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});