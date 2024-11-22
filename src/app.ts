import express, {Application} from 'express';

import connectDB from "./config/db.config";

const app: Application = express();

//middleware
app.use(express.json());

//db connection
connectDB();

//routes
app.get('/', (req, res) => {
  res.send("Hello World")
})

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;