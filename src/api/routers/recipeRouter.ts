import express, {Request, Response, NextFunction} from "express";
import RecipeController from "../controllers/RecipeController";
import { checkUser } from "../middlewares/checkUser";
import CustomRequest from "../common/CustomRequestInterface";
const router = express.Router();

const customCheckUser = (req:Request, res:Response, next:NextFunction)=>{
    checkUser(req as CustomRequest, res, next);
}

router.post("/createRecipe", customCheckUser, (req:Request, res:Response) => {
    RecipeController.createRecipe(req as CustomRequest, res);
});

router.get("/getAllRecipes/:token", customCheckUser, (req:Request, res:Response) => {
    RecipeController.getAllRecipes(req as CustomRequest, res);
});

router.get("/getRecipe/:token/:recipeId", customCheckUser, (req:Request, res:Response)=>{
    RecipeController.getRecipe(req as CustomRequest, res);
});

router.put("/updateRecipe", customCheckUser, (req:Request, res:Response)=>{
    RecipeController.updateRecipe(req as CustomRequest, res);
});

router.put("/addIngredient", customCheckUser, (req:Request, res:Response)=>{
    RecipeController.addIngredient(req as CustomRequest, res);
});

router.put("/addInstruction", customCheckUser, (req:Request, res:Response)=>{
    RecipeController.addInstruction(req as CustomRequest, res);
});

router.delete("/deleteRecipe/:token/:recipeId", customCheckUser, (req:Request, res:Response)=>{
    RecipeController.deleteRecipe(req as CustomRequest, res);
});


export default router;
