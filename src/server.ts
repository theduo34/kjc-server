import app from './app';
import dotenv from "dotenv";

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT ERROR');
  console.log(err.name, err.message);
})

dotenv.config();

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  })
})