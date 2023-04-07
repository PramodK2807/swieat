import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import Nav from "../Layout/Nav";

const Cart = () => {

    const [auth, setAuth] = useAuth()
    const [cart, setCart ] = useCart()
    const [total, setTotal] = useState()
    const [payable, setPayable] = useState()
    const [ delivery, setDelivery ] = useState(40)
    const [ qty, setQty ] = useState(1)

  const handleDelete = (deleteId) => {
    // console.log(item._id);
    const itemId = deleteId._id;
    try {
      let myCart = [...cart]
      
      let index = myCart.findIndex(item => item._id === itemId )
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
      
  } catch (error) {
      console.log(error)
  }
  }


  const totalPrice = () => {
    var cartPrice = 0 
    cart.map((item) => {
      cartPrice = item.menu_price*item.qty + cartPrice
      // console.log(cartPrice);
    })

    setTotal(cartPrice)

    let totalPay = total > 399 ? `${total}` : cartPrice + delivery
    // console.log(totalPay);
    setPayable(totalPay)
  }


  const increment = (items) => {
    cart.map((item) => {
      if(item._id === items._id){
        item.qty = item.qty + 1
        setQty(item.qty)
      }
    })
    setCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const decrement = (items) => {
    cart.map((item) => {
      if(item._id === items._id ){
        if(item.qty === 1){
          alert("Minimum quantity selected")
        }
        else{
          item.qty -= 1
          setQty(item.qty)
        }
      }
      setCart(cart)
    })
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  

  useEffect(() => {
    totalPrice()

  }, [total, payable, delivery, cart, qty, increment, decrement])



  
  return (
    <div>
      <Nav />

      <div
        className="container"
        style={{ position: "relative", marginTop: "70px" }}
      >
        <div className="row">
          <div className="col-md-8 py-2">
            <div
              className="row my-3 justify-content-between  cart-shadow"
              style={{ background: "white" }}>
              <div className="col-12 my-3" style={{
                  fontWeight: "bold",
                  fontSize: "27px",
                  paddingLeft: "10px", }}>
                My Cart ({cart?.length} items)
              </div>
            </div>

            <div className="row">
            {
              cart.length > 0 ?
              cart.map((cartItems) => {
                return(
                  <div className="row " style={{position:"relative"}}>
                    <div className="col-8 py-2">
                      <div className="row" sty>
                        <div className="veg">
                          <div className="row justify-content-between align-items-center">
                            <div className="col-2">
                              <img style={{height:"20px", width:"20px"}} src={cartItems?.menu_type ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/1200px-Indian-vegetarian-mark.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png"  } alt="" />
                            </div>
                            
                          </div>
                        </div>
                        
                        <p className="menu-name">
                          {cartItems.menu_name}
                        </p>
                        <div className=" total-price">
                              Total : ₹ {cartItems.menu_price  }
                        </div>
                        
                        <div className="row align-items-center justify-content-between mx-0 my-2">
                        

                          <div className="col-10 p-0">
                            <div className="cartFuncBtn">
                              <button onClick={() => decrement(cartItems)} className="minus"><i class="fa-solid fa-minus"></i></button>
                              <button>{cartItems.qty}</button>
                              <button onClick={() => increment(cartItems)} className="plus"><i class="fa-solid fa-plus"></i></button>
                            </div>
                          </div>

                          <div className="col-2 mt-2">
                          <i onClick={() => handleDelete(cartItems)} class="fa-solid fa-trash-can" style={{cursor:"pointer", fontSize:'22px', color:"red"}}></i>
                        </div>
                          


                        </div>

                      </div>
                    </div>
                    <div className="col-4 pb-2 cartItem-img" >
                      <img style={{width:"100%",borderRadius:"8px" }} src={cartItems.menu_image} alt="" />
                        
                    </div>
                    <hr  />
                  </div>
                  
                )
              })
              :
              <>
              <img style={{width:"80%" , margin:'auto'}} src="http://hsnbazar.com/images/empty-cart.png" alt="empty" />

              <NavLink className='btn' style={{width:"50%", margin:'20px auto', background:"#1cc81c", color:"white", fontSize:"20px"}} to={`/restaurant/menu/${Math.floor(Math.random() * (14-1+1) * 1)}`}  >Order some meal</NavLink>
              </>
            }
            </div>

            
          </div>

          {/* CHECKOUT */}
          <div className="col-md-4 cart-shadow my-3 total"  style={{background:"white"}}>
                    <p style={{fontWeight:'bold', fontSize:'27px'}} className='my-3'>PRICE DETAILS</p>
                    <hr />
                    
                    <div className="row justify-content-between ">
                        <div className="col-8">Total Price :</div>
                        <div className="col-4">₹ {total}</div>
                    </div>
                    
                    
                    <div className="row justify-content-between my-3" style={{fontSize:'15px', color:"green"}}>
                        <div className="col-8">Delivery Charges</div>
                        <div className="col-4">{cart.length > 0 ? total > 399 ? "Free" : '₹ 40' : 0 }</div>
                    </div>
                    <hr />


                    <div className="row justify-content-between fw-bold fs-5 my-2">
                        <div className="col-8  ">Total Price </div>
                        <div className="col-4">₹ {cart.length > 0 ? payable : 0}</div>
                    </div>

                    {/* <hr /> */}

                    {/* <p style={{color:'#007500', fontWeight:'bold'}}>You will save ₹ {discount} on this order</p> */}

                    <hr />
                    <p>Note : Order above 399 to get free delivery</p>

                    {
                        auth?.token ? (
                            <button className="pay py-2" style={{width:"100%", fontWeight:"bold", border:'none', background:'#f1c40f', padding:'5px 0', borderRadius:'6px'}}>Proceed to Pay</button>
                        ) : (
                            <button className="pay py-2"   style={{width:"100%", fontWeight:"bold", border:'none', background:'#f1c40f', padding:'5px 0', borderRadius:'6px'}}><NavLink to='/login'>Login to Pay</NavLink></button>
                            )
                    }
                </div>
            
        </div>
      </div>
    </div>
  );
};
export default Cart;
