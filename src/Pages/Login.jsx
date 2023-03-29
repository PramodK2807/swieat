import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Register from "./Register"
import {toast} from 'react-toastify'
import {useAuth} from '../Context/AuthContext'
import Nav from "../Layout/Nav"
import '../style/Login.css'

const Login = () => {

  let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState(false);
    let [auth, setAuth] = useAuth()
    let navigate = useNavigate()
    let location = useLocation()

  
// useEffect(()=>{

// }, [])


  const loginHandle = async(e) => {
    e.preventDefault()
    if(!email || !password){
      setError(true)
      alert("Please enter email and password")
      return false
    }

    if(password.length < 8){
      setError(true)
      alert("Password must be at least 8 characters")
      return false
    }

    try {
      let result = await fetch(`${process.env.REACT_APP_API}/login`,{method:"POST",
      body: JSON.stringify({email, password}),
      headers: { "Content-Type": "application/json" },
    })

    let res = await result.json()
    // console.log(res)
    
    if(res.success){
      
      alert(res.message)
      setAuth({
        ...auth,
          user:res.user,
          token:res.token
      })
      localStorage.setItem('auth', JSON.stringify(res))
      navigate('/')
    }
    else{
      alert(res.message)
    }
    } 
    
    catch (error) {
      alert(error.message)
    }
    
  }


  return (
    <>
    <Nav/>
        
        <div className="login-form" style={{marginTop:"70px"}}>
          <div className="input-box">
            <div className="input-group">
            <label htmlFor="email" className="placeholder">Email</label>
              <input placeholder="Enter Email..." className="input" type="email"
              name='email' value={email} onChange={(e) => setEmail(e.target.value) }  id="email"  autoFocus required />
              
            </div>

            <div className="input-group">
            <label htmlFor="password" className="placeholder">Password</label>
              <input required type="password" placeholder="Enter Password..." name="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
              
            </div>

            <button type="submit" onClick={(e) => loginHandle(e)} className="loginbtn " style={{width:"100%"}} >Login</button>

            <div>
              <p>New user ? <NavLink style={{color:"blue"}} to='/register'>Register</NavLink> here</p>
            </div>
          </div>
        </div>
    </>
  )
}
export default Login