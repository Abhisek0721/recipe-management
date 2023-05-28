import { Response, NextFunction } from "express";
import properties from "../../config/properties";
import jwt from 'jsonwebtoken';
import User from "../models/userModel";
import CustomRequest from "../common/CustomRequestInterface";

export const checkUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token = req.body.token || req.params.token;

  if (!token) {
    return res.status(400).json({ auth: false, message: "Invalid Argument! Token not received!" });
  }

  try {
    const decoded = jwt.verify(token, properties.JWT_SECRET) as { userId: string };

    if (!decoded.userId) {
      return res.status(403).json({ auth: false, message: 'Invalid token!' });
    }

    const userId = decoded.userId;
    const user = await User.findById(userId || req.params.userId);

    if (user) {
      req.userId = user._id;
      return next();
    } else {
      return res.status(400).json({ auth: false, message: "No UserId in database!" });
    }
  } catch (error: any) {
    return res.status(500).json({ auth: false, message: "Technical Server Error!", error: error?.stack });
  }
};
