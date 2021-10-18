import { orderTypes } from "./order.types";


const createOrderReducer = (state={},action)=>{

    switch (action.type) {
        case orderTypes.CREATE_ORDER_START:
            return {
                ...state,
                loading:false,

            }
            
        case orderTypes.CREATE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                order:action.payload,

            }
            
        case orderTypes.CREATE_ORDER_FAIL:
            
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    
        default:
            return state
    }
}


export const orderDetailsReducer = (state={loading:true},action) => {

    switch (action.type) {
        case orderTypes.DETAILS_ORDER_START:
            return {
                ...state,
                loading:true,

            }
            
        case orderTypes.DETAILS_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payload,

            }
            
        case orderTypes.DETAILS_ORDER_FAIL:
            
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    
        default:
            return state
    }


}


export const orderPayReducer = (state={successPay:false},action) => {

    switch (action.type) {
        case orderTypes.PAY_ORDER_START:
            return {
                ...state,
                loading:true,


            }
            
        case orderTypes.PAY_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                successPay:true,

            }
            
        case orderTypes.PAY_ORDER_FAIL:
            
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    
            
        case orderTypes.RESET_ORDER:
            
            return{successPay:false}
    
        default:
            return state
    }


}
export const orderDeliverReducer = (state={},action) => {

    switch (action.type) {
        case orderTypes.DELIVERED_ORDER_START:
            return {
                ...state,
                loading:true,


            }
            
        case orderTypes.DELIVERED_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,

            }
            
        case orderTypes.DELIVERED_ORDER_FAIL:
            
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    
            
        case orderTypes.RESET_ORDER:
            
            return{successPay:false}
    
        default:
            return state
    }


}


export const getOrdersReducer = (state={orders:[]},action) => {

    switch (action.type) {
        case orderTypes.GET_ORDERS_START:
            return {
                ...state,
                loading:true,


            }
            
        case orderTypes.GET_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.payload,

            }
            
        case orderTypes.GET_ORDERS_FAIL:
            
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    
            
       
        default:
            return state
    }


}

export default createOrderReducer