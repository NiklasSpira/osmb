import path from 'path';
import express from 'express';
import cors, { CorsOptions } from 'cors';

const app = express();

// Define CORS options to specify allowed origins, methods, and headers
const corsOptions: CorsOptions = {
  origin: '*', // Allow all origins; adjust as needed for production
  methods: ['GET', 'POST'], // Allow only GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies to be sent with requests
  maxAge: 3600 // Cache preflight response for 1 hour
};

// Apply CORS middleware before any other middlewares or routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'dist/public/osmb/browser' directory
app.use(express.static(path.join(__dirname, '../public/dist/osmb/browser')));

// Handle OPTIONS requests to support CORS preflight
app.options('*', cors(corsOptions));

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
