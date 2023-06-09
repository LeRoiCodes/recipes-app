import { useState, useEffect } from "react"
import axios from 'axios';
import useGetUserId from "../hooks/useGetUser";
import { useCookies } from "react-cookie";

function SavedRecipes() {
  const userId  = useGetUserId()

  const [cookies, ] = useCookies(["access_token"])

  const [recipes, setRecipes] = useState([])
  // const [savedRecipes, setSavedRecipes] = useState([])

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
       const res = await axios.get(`http://localhost:3001/recipes/saved/${userId}`, {
        headers: {authorization: cookies.access_token}
       })
       setRecipes(res.data.savedRecipes)
      } catch (error) {
        console.error(error)
      }
    }
    
    fetchSavedRecipe()
  }, []);

  return (
    <div>
      <h1> Saved Recipe</h1>
      <ul>
        {
          recipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
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

export default SavedRecipes