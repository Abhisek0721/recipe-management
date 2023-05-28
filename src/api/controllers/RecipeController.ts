import { Request, Response } from "express";
import Recipe from "../models/recipeModel";
import CustomRequest from "../common/CustomRequestInterface";

interface ICreateRecipe {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

class RecipeController {
    //API : /api/v1/recipe/createRecipe
    //Method : POST
    //Access : Public
    //Description : for creating recipe by the user
    createRecipe = async (req:CustomRequest, res:Response) => {
        let userId = req.userId;
        let {
            title,
            description,
            ingredients,
            instructions,
        }:ICreateRecipe = req.body;

        try {
            if(!title){
                return res.status(400).json(
                    {
                        status: false,
                        message: "title is missing!"
                    }
                );
            }
            let recipe = new Recipe(
                {
                    userId: userId,
                    title: title,
                    description: description,
                    ingredients: ingredients,
                    instructions: instructions
                }
            );
            recipe.save();
            return res.json(
                {
                    status: true,
                    recipeId: recipe._id,
                    message: "Recipe has been created successfully!"
                }
            );
        } catch (error:any) {
            return res.status(500).json(
                {
                    status: false,
                    message: "Techincal Error!",
                    error: error?.stack
                }
            );
        }
    }

    //API : /api/v1/recipe/getAllRecipes/:token
    //Method : GET
    //Access : Public
    //Description : get all recipes that were created by a user
    getAllRecipes = async (req:CustomRequest, res:Response) => {
        let userId = req.userId;
        try {
            let getRecipes = await Recipe.find({userId: userId});
            return res.json(
                {
                    status: true,
                    data: getRecipes
                }
            );
        } catch (error:any) {
            return res.status(500).json(
                {
                    status: false,
                    message: "Techincal Error!",
                    error: error?.stack
                }
            );
        }
    }

}

export default new RecipeController();