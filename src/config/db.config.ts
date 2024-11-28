import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const mongooseURL = process.env.MONGO_URI;

const connectDB = async () => {
  if (!mongooseURL) {
    console.log('MongoDB URI is missing.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongooseURL);
    console.log('MongoDB connected');
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
