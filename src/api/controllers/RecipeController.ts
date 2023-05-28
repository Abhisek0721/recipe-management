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

    //API : /api/v1/recipe/getRecipe/:token/:recipeId
    //Method : GET
    //Access : Public
    //Description : get a particular recipe that was created by a user
    getRecipe = async (req:CustomRequest, res:Response) => {
        let userId = req.userId;
        try {
            let recipeId = req.params.recipeId;
            if(!recipeId){
                return res.status(400).json(
                    {
                        status: false,
                        message: "recipeId is missing!"
                    }
                );
            }
            let getRecipe = await Recipe.find(
                {
                    _id: recipeId,
                    userId: userId
                }
            );
            return res.json(
                {
                    status: true,
                    data: getRecipe
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

    //API : /api/v1/recipe/updateRecipe
    //Method : PUT
    //Access : Public
    //Description : update a particular recipe that was created by a user
    updateRecipe = async (req:CustomRequest, res:Response) => {
        let userId = req.userId;
        let recipeId = req.body.recipeId;
        let {
            title,
            description,
            ingredients,
            instructions,
        }:ICreateRecipe = req.body;
        try {
            if(!recipeId || !title){
                return res.status(400).json(
                    {
                        stauts: false,
                        message: "recipeId or title is missing!"
                    }
                );
            }
            await Recipe.updateOne(
                {
                    _id: recipeId,
                    userId: userId
                },
                {
                    $set: {
                        title: title,
                        description: description,
                        ingredients: ingredients,
                        instructions: instructions,
                        updatedAt: Date.now()
                    }
                }
            );
            return res.json(
                {
                    status: true,
                    message: "Recipe has been updated successfully!",
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


    //API : /api/v1/recipe/addIngredient
    //Method : PUT
    //Access : Public
    //Description : for adding ingredient in recipe by user
    addIngredient = async (req:CustomRequest, res:Response) => {
        let userId = req.userId;
        let recipeId = req.body.recipeId;
        let ingredient = req.body.ingredient;
        try {
            if(!recipeId || !ingredient){
                return res.status(400).json(
                    {
                        stauts: false,
                        message: "recipeId or ingredient is missing!"
                    }
                );
            }
            await Recipe.updateOne(
                {
                    _id: recipeId,
                    userId: userId
                },
                {
                    $push: {
                        ingredients: ingredient
                    }
                }
            );
            return res.json(
                {
                    status: true,
                    message: "New Ingredient has been added successfully!",
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

    //API : /api/v1/recipe/addInstruction
    //Method : PUT
    //Access : Public
    //Description : for adding ingredient in recipe by user
    addInstruction = async (req:CustomRequest, res:Response) => {
        let userId = req.userId;
        let recipeId = req.body.recipeId;
        let instruction = req.body.instruction;
        try {
            if(!recipeId || !instruction){
                return res.status(400).json(
                    {
                        stauts: false,
                        message: "recipeId or instruction is missing!"
                    }
                );
            }
            await Recipe.updateOne(
                {
                    _id: recipeId,
                    userId: userId
                },
                {
                    $push: {
                        instructions: instruction
                    }
                }
            );
            return res.json(
                {
                    status: true,
                    message: "New Instruction has been added successfully!",
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

    //API : /api/v1/recipe/deleteRecipe/:token/:recipeId
    //Method : DELETE
    //Access : Public
    //Description : for deletion of recipe that was created by user
    deleteRecipe = async (req:CustomRequest, res:Response) =>{
        let userId = req.userId;
        let recipeId = req.params.recipeId;
        try {
            if(!recipeId){
                return res.status(400).json(
                    {
                        stauts: false,
                        message: "recipeId is missing!"
                    }
                );
            }
            let deletedResponse = await Recipe.deleteOne(
                {
                    _id: recipeId,
                    userId: userId
                }
            );
            return res.json(
                {
                    status: true,
                    message: "New Instruction has been added successfully!",
                    info: deletedResponse
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