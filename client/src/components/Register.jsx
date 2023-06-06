import { useState } from "react"
import axios from 'axios'


function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //for submiting to api
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            //during local development
            await axios.post('http://localhost:3001/auth/register', {
               username,
               password 
            });
            alert("Registration completed, now login")
        } catch (err) {
            console.error(err)
        }
    }
  return (
    <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value) } />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value) } />
            </div>
            <button type="submit"> Register </button>
        </form>
    </div>
  )
}

export default Register