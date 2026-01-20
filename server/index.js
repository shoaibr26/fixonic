import express from 'express'; // Import Express web framework
import configureSocket from './config/socket.js'; // Import custom Socket.IO configuration
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import cors from 'cors'; // Import CORS to allow cross-origin requests
import connectDB from './config/db.js'; // Import database connection function
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import contactRoutes from './routes/contactRoutes.js'; // Import contact form routes
import blogRoutes from './routes/blogRoutes.js'; // Import blog routes
import reviewRoutes from './routes/reviewRoutes.js'; // Import review routes
import contentRoutes from './routes/contentRoutes.js'; // Import content routes

dotenv.config(); // Initialize environment variables from .env file

connectDB(); // Establish connection to the database

const app = express(); // Initialize the Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(express.json()); // Enable middleware to parse JSON request bodies

app.use('/api/auth', authRoutes); // Register authentication routes under /api/auth
app.use('/api/contact', contactRoutes); // Register contact routes under /api/contact
app.use('/api/blogs', blogRoutes); // Register blog routes under /api/blogs
app.use('/api/reviews', reviewRoutes); // Register review routes under /api/reviews
app.use('/api/content', contentRoutes); // Register content routes under /api/content

// Define the root route to verify the server is running
app.get('/', (req, res) => { // Handle GET requests to the root URL
  res.send('Backend is running successfully...'); // Send a simple response string
}); // End of root route handler

const PORT = process.env.PORT || 5000; // Define the port, defaulting to 5000 if not in env

// Start the server and listen on the specified port, logging the status
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

configureSocket(server); // Initialize Socket.IO with the running server instance
