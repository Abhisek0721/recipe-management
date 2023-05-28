import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

interface CustomRequest extends Request {
  userId: string|Types.ObjectId
}

export const checkUser = async (req:CustomRequest, res:Response, next:NextFunction) => {
  let userId = req.body.userId;

  if (req.params.userId) {
    userId = null;
  }

  if (userId || req.params.userId) {
    try {
      let user = await User.findById(userId ? userId : req.params.userId);
      if (user) {
        req.userId = user._id;
        return next();
      }
      return res
        .status(400)
        .json({ auth: false, message: "No UserId in database!" });

    } catch (error:any) {
      return res.status(500).json(
        { 
          auth: false, 
          message: "Technical Server Error!",
          error: error?.stack
        }
      );

    }
  }

  return res
    .status(400)
    .json({ auth: false, message: "Invalid Argument! UserId not received!" });
};
