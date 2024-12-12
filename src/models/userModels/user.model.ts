import mongoose, { Schema, Document} from "mongoose";
import bcrypt from 'bcrypt'

interface IRegister extends Document {
  email: string;
  password: string;
  roles?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userModel = new Schema<IRegister>(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
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
);

userModel.pre<IRegister>("save", async function (next)  {
  const user = this;
  if(!user.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch(error: any) {
    next(error)
  }
});

userModel.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
}

const UserModel = mongoose.models.User || mongoose.model<IRegister>('User', userModel);
export default UserModel;

