import { useState, useEffect } from "react"
import axios from 'axios';
import useGetUserId from "../hooks/useGetUser";
import {useCookies} from "react-cookie"


function Home() {

  const userId  = useGetUserId()

  const [cookies, ] = useCookies(["access_token"])

  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
       const res = await axios.get("http://localhost:3001/recipes")
       setRecipes(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    const fetchSavedRecipe = async () => {
      try {
       const res = await axios.get(`http://localhost:3001/recipes/saved/ids/${userId}`, {
        headers: {authorization: cookies.access_token}
       })
       setSavedRecipes(res.data.savedRecipes)
      } catch (error) {
        console.error(error)
      }
    }
    
    fetchRecipe()

    if (cookies.access_token) fetchSavedRecipe()
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const res = await axios.put("http://localhost:3001/recipes/save", {
        recipeId,
        userId
      }, {
        headers: {authorization: cookies.access_token}
       })
      setSavedRecipes(res.data.savedRecipes)
     } catch (error) {
       console.error(error)
     }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id)

  return (
    <div>
      <h1>Recipe</h1>
      <ul>
        {
          recipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home