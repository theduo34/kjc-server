import mongoose, { Schema, Document} from "mongoose";

interface IRegister extends Document {
  email: string;
  password: string;
  roles?: string;
}

const userModel = new Schema<IRegister>(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      // match: /.+@.+\..+/,
      // trim: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minLength: 8,
      maxLength: 36,
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must have at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long']
    },
    roles: {
      type: String,
      enum: ['seeker', 'recruiter'],
      default: 'seeker'
    },
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.models.User || mongoose.model<IRegister>('User', userModel);
export default UserModel;

