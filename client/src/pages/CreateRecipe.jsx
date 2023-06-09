import { useState } from "react"
import axios from 'axios'
import useGetUserId from "../hooks/useGetUser"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";



function CreateRecipe() {

  //from a custom hook
  const userId = useGetUserId();

  const [cookies, ] = useCookies(["access_token"])

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId
  });

  


  const handleChange = (e) => {
    const {name, value} = e.target;
    setRecipe({ ...recipe, [name]: value})
  }
  const addIngredients = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
  }
  const handleIngredientChange = (e, index) => {
    const { value} = e.target;
    const ingredients = recipe.ingredients
    ingredients[index] = value
    setRecipe({ ...recipe, ingredients})
  }
  const onSubmit = async (e) =>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/recipes/create', recipe, {
        headers: {authorization: cookies.access_token}
       })
      alert("Recipe Created")
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="create">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        {/* <label htmlFor="description">Description</label>
        <textarea id="description" name="description" /> */}
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map( (ingredient, index) => (
          <input key={index} type="text" name="ingredients" value={ingredient} onChange={(e) => handleIngredientChange(e, index)}/>
        ))}
        <button type="button" onClick={addIngredients}>Add Ingredients </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" onChange={handleChange} />
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
        <button type="submit" > Create </button>
      </form>
    </div>
  )
}

export default CreateRecipe