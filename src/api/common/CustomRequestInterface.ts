import { Types } from "mongoose";
import { Request } from "express";

interface CustomRequest extends Request {
    userId: string | Types.ObjectId;
}

export default CustomRequest;