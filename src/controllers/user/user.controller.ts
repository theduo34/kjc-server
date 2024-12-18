import User from "../../models/auth/auth.schema";
import { Request, Response } from "express";

//Read all users
const readUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({});

    if(users.length === 0) {
      res.status(400).json({ error: 'No users found' })
    }

    res.status(200).json(users);
  } catch (error: unknown) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

//Read an individual user
const readUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if(!user) {
      res.status(400).json({ error: 'User not found' })
    }

    res.status(200).json(user);
  } catch (error: unknown) {
    if(error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { readUser, readUsers }