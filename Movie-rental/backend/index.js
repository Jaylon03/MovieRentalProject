// index.js
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Route to get all movies
app.get('/movies', (req, res) => {
  const query = 'SELECT * FROM movies_table';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Add new movie

app.post('/movies', (req,res) =>{
  const {title, genre,price,year} = req.body;
  const query = 'INSERT INTO  movies_table (Title, Genre, Price, Year) VALUES (?, ?, ?, ?)';
  db.query(query, [title, genre, price, year], (err, result) =>{
    if(err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({message: 'Movie added succesfully!', movieId: result.insertId})
  });
});

app.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const query = 'DELETE FROM movies_table WHERE MovieID = ?'; // Ensure "movies_table" is your correct table name
  db.query(query, [movieId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.json({ message: 'Movie deleted successfully!' });
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
