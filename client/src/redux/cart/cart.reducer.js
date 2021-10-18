
import {cartTypes} from './cart.types'

export const cartReducer = (state={cartItems:[],shippingAddress:{}},action) => {

    switch (action.type) {
        case cartTypes.ADD_TO_CART:
            const existItem = state.cartItems.find(item => item.product === action.payload.product)
            
            if(existItem){
                
                return {
                    ...state,
                    cartItems:state.cartItems.map(item => item.product === existItem.product ? action.payload : item)
                } 


            }else{
                return {
                    ...state, 
                    cartItems:[...state.cartItems,action.payload]}
            }
    
        case cartTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems:state.cartItems.filter(item => item.product !== action.payload)
            }    
        case cartTypes.SAVE_SHIPPING:
            return {
                ...state,
                shippingAddress:action.payload
            }    
        case cartTypes.SAVE_PAYMENT:
            return {
                ...state,
                paymentMethod:action.payload
            }    

        default:
            return state
    }


}