import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/conn.mjs';
import router from './routes/users.mjs';
dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
// Route for testing 
app.get('/', (req, res) => {
  res.send('Welcome to the API.');
});
 // Route setup
app.use('/api', router); // Mount your API routes under '/api'
// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  // Handle specific errors
  if (err.name === 'MongoError') {
    // Handle MongoDB errors
    return res.status(500).json({ message: 'MongoDB Error', error: err.message });
  }
  // Default error handling
  res.status(500).json({ message: 'Internal Server Error' });
});
// Start your Express server
(async () => {
  try {
    await connectDb(); // Connection to MongoDB Atlas or local MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
})();
