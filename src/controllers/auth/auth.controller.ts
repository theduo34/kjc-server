import { Request, Response } from "express";
import User from "../../models/auth/auth.schema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const JWTPrivateKey = process.env.JWT_PRIVATE_KEY as string

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    //Check  all fields are provided
    if (!email || !password) {
      res.status(400).json({ error: 'Email or password is required' });
      return;
    }
    //Check in the db if user with email already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: 'User with this email already exists', })
      return;
    }
    //Respond with user successfully registration
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error: unknown) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    //Check if Email and Password are provided
    if(!email || !password) {
      res.status(400).json({ error: 'Email and password  are required' });
      return;
    }
    //Find user and compare provided password with the stored hashed password
    const user = await User.findOne({ email });
    const isPasswordValid = await user.comparePassword(password)
    if(!user || !isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    //Generate a JWT token
    //console.log(`secret: ${crypto.randomBytes(32).toString("hex")}`);
    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, JWTPrivateKey, { expiresIn: '1hr' });

    res.status(200).json({ message: 'Logged in successfully', token })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message})
    } else {
      res.status(500).json({error: 'Internal Server Error'});
    }
  }
}

export { createUser, loginUser, }