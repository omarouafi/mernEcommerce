import axios from "axios"
import { cartTypes } from "./cart.types";

 
export const addToCart = (id,qty) => async (dispatch,getState) =>  {

    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({type:cartTypes.ADD_TO_CART,payload:{
        product:id,
        name:data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty
    }})

    

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}


export const removeItemFromCart = (id) => (dispatch,getState) =>  {

    dispatch({type:cartTypes.REMOVE_FROM_CART,payload:id})

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))


}

export const saveShippingAction = (address) => (dispatch,getState) =>  {

    dispatch({type:cartTypes.SAVE_SHIPPING,payload:address})

    localStorage.setItem('shippingAddress',JSON.stringify(getState().cart.shippingAddress))
    
    
}

export const savePaymentAction = (paymentMethod) => (dispatch,getState) =>  {
    
    dispatch({type:cartTypes.SAVE_PAYMENT,payload:paymentMethod})
    localStorage.setItem('paymentMethod',JSON.stringify(getState().cart.paymentMethod))



}