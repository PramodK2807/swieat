import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
import Nav from "../Layout/Nav"

const Register = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCPassword] = useState()
  const [mobile, setMobile] = useState()
  const [name, setName] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()

  const signUpHandle = async() => {
    if(!email || !password || !cpassword || !mobile || !name) {
      setError(true)
      alert("Please fill all required fields")
      return false
    }

    if (password !== cpassword ) {
      setError(true);
      alert("Password doesn't match");
      return false;
    }

    if(password.length < 8 ){
      setError(true);
      alert("Password must be at least 8 characters");
      return false;
    }

    if(mobile.length !== 10 ){
      setError(true);
      alert("Enter Correct Mobile Number");
      return false;
    }

    try {
      let response = await fetch(`${process.env.REACT_APP_API}/register`, {method:"POST",
      body:JSON.stringify({name, email, password, cpassword, mobile}),
      headers: { "Content-Type" : "application/json" },
    })

    let data = await response.json();
      if (data.success) {
        alert(data.message);
        navigate('/login')
      }
      else{
        alert(data.message);
      }
    } 
    catch (error) {
      alert("Something went wrong")
    }
  }

  return (
    <>
        <Nav/>
        
        <div className="login-form" style={{marginTop:"70px"}}>
          <div className="input-box">
            
            <div className="input-group">
            <label htmlFor="name" className="placeholder">Name</label>
              <input placeholder="Enter Name..." className="input" type="text"
              name='name' value={name} onChange={(e) => setName(e.target.value) }  id="name"  autoFocus required />
            </div>
            
            <div className="input-group">
            <label htmlFor="mobile" className="placeholder">Mobile</label>
              <input placeholder="Enter Mobile..." className="input" type="number"
              name='mobile' value={mobile} onChange={(e) => setMobile(e.target.value) }  id="mobile" required />
            </div>

            <div className="input-group">
            <label htmlFor="email" className="placeholder">Email</label>
              <input placeholder="Enter Email..." className="input" type="email"
              name='email' value={email} onChange={(e) => setEmail(e.target.value) }  id="email" required />
            </div>

            <div className="input-group">
            <label htmlFor="password" className="placeholder">Password</label>
              <input required type="password" placeholder="Enter Password..." name="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
            </div>

            <div className="input-group">
            <label htmlFor="password" className="placeholder">Confirm Password</label>
              <input required type="password" placeholder="Enter Confirm Password..." name="cpassword" className="input" value={cpassword} onChange={(e) => setCPassword(e.target.value)} id='cpassword' />
            </div>

            <button type="submit" onClick={(e) => signUpHandle(e)} className="loginbtn " style={{width:"100%"}} >Register</button>

            <div>
              <p>Already a user ? <NavLink style={{color:"blue"}} to='/login'>Login</NavLink> here</p>
            </div>
          </div>
        </div>
    </>
  )
}
export default Register
