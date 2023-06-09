import RecipeModel from "../models/Recipes.js";
import express from "express"
import mongoose from "mongoose";
import UserModel from "../models/Users.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router();


router.get("/", async (req, res) => {
    try {
       const recipes = await RecipeModel.find({}) 
       res.json(
        recipes
       )
    } catch (error) {
        res.json(error)
    }
});
router.post("/create", verifyToken, async (req, res) => {

    const recipe = new RecipeModel(req.body)
    try {
       await recipe.save() 
       res.json(
        recipe
       )
    } catch (error) {
        res.json(error)
    }
});
router.put("/save", verifyToken, async (req, res) => {

    

    // const recipe = new RecipeModel(req.body)
    const {userId, recipeId } = req.body
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
    //    await recipe.save()
        user.savedRecipes.push(recipe);
        await user.save();
       res.json({
        savedRecipes: user.savedRecipes
    })
    } catch (error) {
        res.json(error)
    }
});

router.get("/saved/ids/:userId", verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json({
            savedRecipes: user?.savedRecipes
        })
    } catch (error) {
        res.json(error)
    }
})

router.get("/saved/:userId", verifyToken, async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.json({
            savedRecipes
        })
    } catch (error) {
        res.json(error)
    }
})

const recipesRouter = router
export default recipesRouter