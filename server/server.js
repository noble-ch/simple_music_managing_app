// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import songRoutes from './src/routes/songRoutes.js';

// Initialize dotenv to manage environment variables
dotenv.config();

// Create an instance of the Express app
const app = express();

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());

// Define the port from environment variables or use 5000 as the default
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// API routes
app.use('/api', songRoutes);

// Basic route to verify the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Songs Management API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
