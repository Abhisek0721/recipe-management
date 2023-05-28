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

router.get("/getAllRecipes", customCheckUser, (req:Request, res:Response) => {
    RecipeController.getAllRecipes(req as CustomRequest, res);
});

export default router;
