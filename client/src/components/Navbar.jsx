import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Navbar() {

  const navigate = useNavigate()

  const [cookies, setCookies ] = useCookies(["access_tokem"])

  // log out of website
  const logout = () => {
    setCookies("access_tokem", "");
    window.localStorage.removeItem("userId");
    navigate("/auth")
  }
  return (
    <div className='navbar'>
        <Link to="/"> Home</Link>
        <Link to="/create"> Create Recipe</Link>
        <Link to="/save"> Saved Recipes</Link>
        {
          !cookies.access_tokem ? (
            <Link to="/auth"> Login/Register</Link>
          ) : (
            <button onClick={logout}> Logout </button>
          )
        }
        
    </div>
  )
}

export default Navbar