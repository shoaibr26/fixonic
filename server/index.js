import express from 'express'; // Import Express web framework

import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import cors from 'cors'; // Import CORS to allow cross-origin requests
import connectDB from './config/db.js'; // Import database connection function
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import contactRoutes from './routes/contactRoutes.js'; // Import contact form routes
import blogRoutes from './routes/blogRoutes.js'; // Import blog routes
import reviewRoutes from './routes/reviewRoutes.js'; // Import review routes
import contentRoutes from './routes/contentRoutes.js'; // Import content routes
import brandRoutes from './routes/brandRoutes.js';
import repairRoutes from './routes/repairRoutes.js';

dotenv.config(); // Initialize environment variables from .env file

connectDB(); // Establish connection to the database

const app = express(); // Initialize the Express application

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// })); // Enable Cross-Origin Resource Sharing (CORS) middleware
// Configure CORS with a whitelist and proper preflight handling
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://fixonic.vercel.app/",
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin) return next(); // non-browser request

  const isAllowed =
    allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production";

  if (!isAllowed) return next();

  // Always set Vary when Origin is present so caches distinguish responses
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Respond to preflight OPTIONS requests immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json()); // Enable middleware to parse JSON request bodies

app.use('/api/auth', authRoutes); // Register authentication routes under /api/auth
app.use('/api/contact', contactRoutes); // Register contact routes under /api/contact
app.use('/api/blogs', blogRoutes); // Register blog routes under /api/blogs
app.use('/api/reviews', reviewRoutes); // Register review routes under /api/reviews
app.use('/api/content', contentRoutes); // Register content routes under /api/content
app.use('/api/brands', brandRoutes);
app.use('/api/repairs', repairRoutes);

// Define the root route to verify the server is running
app.get('/', (req, res) => { // Handle GET requests to the root URL
  res.send('Backend is running successfully...'); // Send a simple response string
}); // End of root route handler

const PORT = process.env.PORT || 5000; // Define the port, defaulting to 5000 if not in env

// Start the server and listen on the specified port, logging the status
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


