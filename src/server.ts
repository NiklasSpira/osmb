import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import cors, { CorsOptions } from 'cors';
import session from 'express-session';
import userRouter from './routes/user.route';
import imageRouter from './routes/image.route';
import dotenv from 'dotenv';

declare module 'express-session' {
  export interface SessionData {
      userId: number;
  }
}

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Helper function to get environment variables and throw an error if missing
const getEnv = (key: string): string => {
  console.log(key)
  const value = process.env[key];
  console.log(value)
  if (value === undefined) {
    throw new Error(`⚠️ Missing required environment variable: ${key}`);
  }
  return value;
};

// Load static paths and public routes
const FRONTEND_PATH = getEnv('FRONTEND_PATH');
const PICTURE_PATH = getEnv('PICTURES_PATH');
const PROFILE_PICTURE_PATH = getEnv('PROFILE_PICTURES_PATH');
const PUBLIC_ROUTES = getEnv('PUBLIC_ROUTES').split(',');
const app = express();
const prisma = new PrismaClient()
// Define CORS options to specify allowed origins, methods, and headers
const corsOptions: CorsOptions = {
  origin: '*', // Allow all origins; adjust as needed for production
  methods: ['GET', 'POST'], // Allow only GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies to be sent with requests
  maxAge: 3600 // Cache preflight response for 1 hour
};
app.use(session({
  secret: 'any', // Session secret (change for production)
  resave: false, // Do not save the session if it was not modified
  saveUninitialized: true, // Save session even if it is new, but not modified
  cookie: { secure: false }, // Set cookie properties (should be secure in production)
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // Periodically check for session expiration (every 2 minutes)
    dbRecordIdIsSessionId: true, // Use session ID as record ID in the database
    dbRecordIdFunction: undefined // Custom function for record ID (optional)
  })
}));

const authMiddleware =  (req: Request, res: Response, next: NextFunction) => {
  // Define routes that should be accessible without authentication
    

  // Skip authentication for public routes
  if (PUBLIC_ROUTES.some((path) => req.url.endsWith(path))) {
    return next();
  }
  // If no session, reject the request
  if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
};

// Apply CORS middleware before any other middlewares or routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'dist/public/osmb/browser' directory
// Serve frontend (if you are using Angular or another frontend in 'public/dist/osmb/browser')
app.use(express.static(path.join(__dirname, '..', FRONTEND_PATH)));

// Serve images (uploaded pictures)
app.use('/pictures', express.static(path.join(__dirname, '../', PICTURE_PATH)));

app.use('/profile_pictures', express.static(path.join(__dirname, '..', PROFILE_PICTURE_PATH)));

app.use(authMiddleware);
// Handle OPTIONS requests to support CORS preflight
app.options('*', cors(corsOptions));
app.use('/api/user', userRouter);
app.use('/api/image/', imageRouter);

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
