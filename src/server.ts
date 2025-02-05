import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import cors, { CorsOptions } from 'cors';
import session from 'express-session';
import userRouter from './routes/user.route';
import imageRouter from './routes/image.route';
import dotenv from 'dotenv';
import commentRouter from './routes/comment.route';

declare module 'express-session' {
  export interface SessionData {
      userId: number;
  }
}

dotenv.config({ path: path.resolve(__dirname, '.env') });

//Helper function to get environment variables and throw an error if missing
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

//Load static paths and public routes
const FRONTEND_PATH = getEnv('FRONTEND_PATH');
const PICTURE_PATH = getEnv('PICTURES_PATH');
const PROFILE_PICTURE_PATH = getEnv('PROFILE_PICTURES_PATH');
const PUBLIC_ROUTES = getEnv('PUBLIC_ROUTES').split(',');
const app = express();
const prisma = new PrismaClient()
// Define CORS options to specify allowed origins, methods, and headers
const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600
};

app.use(session({
  secret: 'any',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined
  })
}));


const authMiddleware =  (req: Request, res: Response, next: NextFunction) => {
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

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../', FRONTEND_PATH)));

app.use('/pictures', express.static(path.join(__dirname, '../', PICTURE_PATH)));

app.use('/profile_pictures', express.static(path.join(__dirname, '..', PROFILE_PICTURE_PATH)));

app.use(authMiddleware);

app.options('*', cors(corsOptions));

app.use('/api/user', userRouter);

app.use('/api/image/', imageRouter);

app.use('/api/comment/', commentRouter);

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
