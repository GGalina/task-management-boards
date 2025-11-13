import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDocument from '../swagger.json';
import boardRouter from './routes/boardRoutes';
import HttpError from './helpers/HttpError';

dotenv.config();

const app = express();

// Logger
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(morgan(formatsLogger));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/boards', boardRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

// Type guard for HttpError
function isHttpError(err: unknown): err is HttpError {
  return (
    err instanceof Error &&
    'status' in err &&
    typeof (err as { status?: unknown }).status === 'number' &&
    'message' in err &&
    typeof (err as { message?: unknown }).message === 'string'
  );
}

// Error handler
app.use(
  (err: unknown, _req: Request, res: Response) => {
    if (isHttpError(err)) {
      res.status(err.status).json({ message: err.message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message || 'Server Error' });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

export default app;
