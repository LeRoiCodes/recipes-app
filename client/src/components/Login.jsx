import { useState } from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //for storing token in cookies
  const [, setCookies] = useCookies(["access_token"])


  // for navigation
  const navigate = useNavigate()

  //for submiting to api
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3001/auth/login', {
        username,
        password 
     });

      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userId", res.data.userId)
      navigate("/")
    } catch (err){
      console.error(err)
    }
}
  return (
    <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value) } />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value) } />
            </div>
            <button type="submit"> Login </button>
        </form>
    </div>
  )
}
export default Login


