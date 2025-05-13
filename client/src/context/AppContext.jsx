import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { dummyProducts } from '../assets/assets'
import toast from "react-hot-toast";

//Create a context
export const AppContext = createContext();

//create a provider 
export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    const [seller, setSeller] = useState(null)
    const [isSeller,setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products,setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
    
    //fetch product from assets
    const fetchProducts = async ()=>{
        setProducts(dummyProducts)
    }
    //add product to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] +=1
        }else{
            cartData[itemId] = 1
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //Update cart Item Qunatity
    const updateCartItem = (itemId,qunatity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = qunatity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove product from cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -=1;
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        } 
        toast.success("Removed from Cart")
        setCartItems(cartData)

    }

    //Get cart item count
    const getCartCount = ()=>{
        let totalCount = 0;
        for( const item in cartItems){
            totalCount += cartItems[item]
        }
        return totalCount
    }

    //Get cart total Amount
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            if(cartItems[items] >0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount*100)/100;
    }


    // fetchProducts call this whenever page is loaded
    useEffect(()=>{
        fetchProducts()
    },[])

    const value = {navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,
        products,currency,addToCart,updateCartItem,removeFromCart,cartItems,searchQuery, setSearchQuery,
        getCartAmount, getCartCount, seller, setSeller}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

//we can use useAppContext in any other component to access data that is stored in the value 
export const useAppContext = ()=>{
    return useContext(AppContext)
}