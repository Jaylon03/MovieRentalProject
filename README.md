Movie Rental System 🎬
A full-stack web application for managing movie rentals, built using React, Node.js, and MySQL.
The system allows users to browse movies, rent them, and view their rental history, while administrators can manage movie inventory and customer information.

Features 🌟
User-Friendly Interface: Browse available movies, search by title, and view details seamlessly.
Rental Management: Rent movies and track rental history.
Admin Panel: Manage movie inventory and customer data (role-based access).
Secure Authentication: User sign-up, login, and role-based access control.
Real-Time Updates: Dynamic data fetching and updates using RESTful APIs.
Responsive Design: Optimized for desktop and mobile devices.
Tech Stack 🛠️
Frontend: React.js (HTML, CSS, JavaScript)
Backend: Node.js with Express.js
Database: MySQL
Version Control: Git and GitHub
Hosting (optional): Deployed on [hosting platform if used, e.g., Heroku, Vercel].
Installation and Setup 🚀
Prerequisites
Node.js and npm installed
MySQL installed and running
Steps to Run Locally
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/movie-rental-system.git
cd movie-rental-system
Install dependencies:

bash
Copy code
npm install
cd client && npm install
Set up the database:

Create a MySQL database: movie_rental
Import the database schema from db/schema.sql (include a schema.sql file in your project).
Configure environment variables:
Create a .env file in the root directory and add the following:

env
Copy code
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=movie_rental
PORT=5000
Start the application:

Backend:
bash
Copy code
npm start
Frontend:
bash
Copy code
cd client
npm start
Open your browser and navigate to http://localhost:3000.
