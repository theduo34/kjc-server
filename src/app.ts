import express, {Application, NextFunction, Response, Request} from 'express';
import connectDB from "./config/db.config";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

const app: Application = express();

//global middleware
app.use(express.json());

connectDB();

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

export default app;