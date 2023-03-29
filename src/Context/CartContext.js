import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext()

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        let localItem = localStorage.getItem('cart')
        if(localItem){
            setCart(JSON.parse(localItem))
        }
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]} >
            {children}
        </CartContext.Provider>
    )
}


const useCart = () => useContext(CartContext)
export {useCart, CartProvider}