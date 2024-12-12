import express, {Application, NextFunction, Response, Request} from 'express';
import connectDB from "./config/db.config";
import userRouter from "./routes/userRoutes/user.route";
import cors from 'cors'
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app: Application = express();

//global middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors())
// app.options('*', cors())
// app.use(helmet())

// const limiter = rateLimit({
//   max: 1000,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too much request from this IP, Please try again in an hour!'
// })
// app.use('/api', limiter)

//db connection
connectDB();

//routes
app.use('/api/v1/users', userRouter)

// 404 Handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(404)
//     .json({ message: 'Route not found' });
// });

// Global Error Handler
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500)
//     .json({ message: 'Internal Server Error' });
// });

export default app;