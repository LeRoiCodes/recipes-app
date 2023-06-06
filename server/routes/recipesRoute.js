import RecipeModel from "../models/Recipes.js";
import express from "express"
import mongoose from "mongoose";


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
router.post("/create", async (req, res) => {

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


const recipesRouter = router
export default recipesRouter