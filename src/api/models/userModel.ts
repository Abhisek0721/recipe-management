import mongoose, {Schema, Model, Types} from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import properties from "../../config/properties";

interface IUser {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema:Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,5})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: false,
    minlength: [6, "Password must be at least 6 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const getSignedJwtToken = (userId: Types.ObjectId):string => {
    const token = jsonwebtoken.sign({ userId: userId }, properties.JWT_SECRET, {
        expiresIn: '24h',
    });
    return token;
}

const User:Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
