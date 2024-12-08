import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express(); // Initialize app

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

// Routes
app.get("/movies", (req, res) => {
  const query = "SELECT * FROM movies_table";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving movies");
      return;
    }
    res.json(results);
  });
});

app.post("/checkout", (req, res) => {
  const { name, email, phoneNumber, address, cardNumber } = req.body;

  if (!name || !email || !phoneNumber || !address || !cardNumber) {
    res.status(400).send("All fields are required.");
    return;
  }

  const query = `
    INSERT INTO customer_table (Name, Email, PhoneNumber, Address, Card)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, email, phoneNumber, address, cardNumber], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error processing checkout.");
    } else {
      res.status(201).send("Checkout successful!");
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
