import {Schema, Model, model} from "mongoose";
import { IUser } from "./userModel";

interface IRecipe {
    userId: IUser["_id"];
    title: string;
    description?: string;
    ingredients?: string[];
    instructions?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Create a schema for recipes
const recipeSchema:Schema = new Schema<IRecipe>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  ingredients: {
    type: [String],
    default: []
  },
  instructions: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date
});

const Recipe:Model<IRecipe> = model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
