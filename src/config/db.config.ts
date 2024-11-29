import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const mongooseURI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!mongooseURI) {
    console.log('MongoDB URI is missing.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongooseURI,{
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    }).then(() => console.log('MongoDB Connected'));
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
