import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { useCart } from "../Context/CartContext"
import QuickSearch from '../components/QuickSupport'

const Nav = () => {
    const [navColor, setNavColor] = useState(false)
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()

    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
          setNavColor(true);
        } else {
          setNavColor(false);
        }
      };
      window.addEventListener("scroll", changeNavbarColor);

    const handleLogout = (e) => {
      e.preventDefault();
      setAuth({
        ...auth,
        user: null,
      });
      localStorage.removeItem("auth");
    }

    useEffect(() => {

    }, [auth])
  return (
    <>
    <QuickSearch/>
    <nav className={navColor ? " navcoloronscroll" : ""} style={{position:"sticky", top:'0', width:"100%", zIndex:"55", background:"black", justifyContent:"space-around"}} >
                <div className="logo" style={{display:"flex", color:"white", alignItems:"center", flexDirection:"column", fontWeight:'bold'}}>
                    
                        <NavLink to='/' className="m-0 p-0 text-light">SwiEat</NavLink>
                        <p className="m-0 tagline" style={{fontSize:'10px'}}>We Deliver Trust</p>
                    
                </div>

                <ul style={{display:'flex', alignItems:'center', gap:"20px"}}>
                  <li><NavLink to='/'>Home</NavLink></li>
                  {/* <li><NavLink to='/'>Login</NavLink></li> */}
                  {
                    !auth?.user ? (<li className="btn"><NavLink to='/login' >Login</NavLink></li>) : ''
                  }

                  <li ><NavLink to='/cart'><i className="fs-5 fa-sharp fa-solid fa-cart-shopping"></i>{cart.length}</NavLink></li>

                  {
                    auth?.user ? (<li className="btn"><NavLink to='/' onClick={(e) => handleLogout(e)} >Logout</NavLink></li>)
                    :
                    ""
                  }
                </ul>

            </nav>

            </>
  )
}
export default Nav