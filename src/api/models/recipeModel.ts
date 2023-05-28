import {Schema, Model, model} from "mongoose";

interface IRecipe {
    title: string;
    description?: string,
    ingredients?: string[],
    instructions?: string[],
    createdAt?: Date,
    updatedAt?: Date
}

// Create a schema for recipes
const recipeSchema:Schema = new Schema<IRecipe>({
  title: {
    type: String,
    required: true
  },
  description: String,
  ingredients: [String],
  instructions: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date
});

const Recipe:Model<IRecipe> = model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
