import {Request, Response} from "express";
import UserModel from "../../models/user/user.model";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({message: "User created successfully.", user: newUser});
  }
  catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({error: error.name});
    }
    else {
      res.status(500).json({error: 'Internal server error.'});
    }
  }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params
    const user = await UserModel.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({message: "User updated successfully.", user});
  }
  catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({error: error.name});
    }
    else {
      res.status(500).json({error: 'Internal server error.'});
    }
  }
}

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.find({});
    if (!user) {
      res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({user});
  }
  catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(404).json({message: error.name})
    }
    else {
      res.status(500).json({error: 'Internal server error.'});
    }
  }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({message: "User doesn't exist"});
    }
    res.status(200).json({user});
  }
  catch (error: any){
    if (error.name === "ValidationError") {
      res.status(400).json({error: error.name});
    }
    else {
      res.status(500).json({error: 'Internal server error.'});
    }
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params
    const user = UserModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({message: "User doesn't exist"});
    }
    res.status(200).json({message: "User deleted successfully."});
  }
  catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({message: error.name})
    }
    else {
      res.status(500).json({error: 'Internal server error'});
    }
  }
}

export {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
}