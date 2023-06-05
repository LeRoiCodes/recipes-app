import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/"> Home</Link>
        <Link to="/create"> Create Recipe</Link>
        <Link to="/save"> Saved Recipes</Link>
        <Link to="/auth"> Login/Register</Link>
    </div>
  )
}

export default Navbar