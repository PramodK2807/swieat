import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useCart } from "../Context/CartContext"
import Layout from "../Layout/Layout"

const RestMenu = () => {

    const [menu, setMenu] = useState([])
    const [cart, setCart] = useCart()
    const params = useParams()


    useEffect(() => {
        getMenu()
    },[cart])

    const getMenu = async() => {
        let data = await fetch(`${process.env.REACT_APP_API}/restaurant/menu/${params.id}`)
        let result = await data.json()
        // console.log(result);
        setMenu(result)
    }

    const handleCart = async(item) => {
        let exist = await cart.find(cartItem => cartItem._id === item._id )
        if(exist){
            toast.error("Item is already in cart")
        }
        else{
            const newCart = [...cart, {...item, qty:1}]
            setCart(newCart)
            localStorage.setItem("cart", JSON.stringify(newCart))
            toast.success("Item added successfully")
        }
    }

    

    
  return (
    <Layout>
        <div className="container">

        
        <div className="row g-3 mt-2 justify-content-between" >
            {
                menu.length > 0 &&
                menu.map((menuItem, i) => {
                    return(
                        <div className="col-md-6 p-3 RestMenuCard " key={i}>
                            <div className="row align-items-center g-3">
                                <div className="col-5">
                                    <img style={{width:"100%", height:'170px', borderRadius:'10px'}} src={menuItem.menu_image} alt={menuItem.menu_name} />
                                </div>
                                <div className="col-6">
                                    <p className="menu-name">
                                        {menuItem.menu_name}
                                    </p>
                                    <p className="menu-price my-2">
                                        {menuItem.description.slice(0,35)}...
                                    </p>
                                    <p className="mt-4 " style={{fontSize:'18px'}} >
                                        Cost : ₹{menuItem.menu_price}
                                    </p>
                                    <button onClick={() => handleCart(menuItem)} className="mt-3 btn addtocart" style={{width:"80%",padding:'8px 0', border:'none', color:'white', fontWeight:"bold"}}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
    </Layout>
  )
}
export default RestMenu