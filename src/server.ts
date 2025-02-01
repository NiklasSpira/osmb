import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import cors, { CorsOptions } from 'cors';
import { addNewUser } from './controllers/user.controller';
import { addNewImage } from './controllers/image.controller';
import { toggleLike } from './controllers/imageLike.controller';
import session from 'express-session';
import userRouter from './routes/user.route';
declare module 'express-session' {
  export interface SessionData {
      userId: number;
  }
}
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

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Define routes that should be accessible without authentication
  const publicPaths = ['/register', '/login'];

  // Skip authentication for public routes
  if (publicPaths.some((path) => req.url.startsWith(path))) {
    return next();
  }
  // If no session, reject the request
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Apply CORS middleware before any other middlewares or routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'dist/public/osmb/browser' directory
app.use(express.static(path.join(__dirname, '../public/dist/osmb/browser')));

// Handle OPTIONS requests to support CORS preflight
app.options('*', cors(corsOptions));
app.use('/', userRouter)

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
