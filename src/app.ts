import express, {Application, NextFunction, Response, Request} from 'express';
import connectDB from "./config/db.config";
import userRoutes from "./routes/user/user.route";

const app: Application = express();

//middleware
app.use(express.json());

//db connection
connectDB();

//routes
app.use('/api/v1/users', userRoutes)

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;