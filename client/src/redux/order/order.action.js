import axios from "axios"
import { orderTypes } from "./order.types"



export const createOrderAction = (order) => async (dispatch,getState) => {

    try {
        dispatch({type:orderTypes.CREATE_ORDER_START})



        const config = {
            headers:{
                'Content-Type':"Application/json",
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            },

        }
        console.log(getState().userLogin.currentUser.token);
        
        const {data} = await axios.post('/api/orders',order,config)
        dispatch({type:orderTypes.CREATE_ORDER_SUCCESS,payload:data})
        
        
    } catch (error) {
        dispatch({type:orderTypes.CREATE_ORDER_FAIL,
            payload:(error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}



export const orderDetailsAction = (id) => async (dispatch,getState) => {

    try {
        dispatch({type:orderTypes.DETAILS_ORDER_START})



        const config = {
            headers:{
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            },

        }
        
        const {data} = await axios.get(`/api/orders/${id}`,config)
        dispatch({type:orderTypes.DETAILS_ORDER_SUCCESS,payload:data})
        
        
    } catch (error) {
        dispatch({type:orderTypes.DETAILS_ORDER_FAIL,
            payload:(error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

export const getOrdersAction = () => async (dispatch,getState) => {

    try {
        dispatch({type:orderTypes.GET_ORDERS_START})



        const config = {
            headers:{
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            },

        }
        
        const {data} = await axios.get(`/api/orders/`,config)
        dispatch({type:orderTypes.GET_ORDERS_SUCCESS,payload:data})
        
        
    } catch (error) {
        dispatch({type:orderTypes.GET_ORDERS_FAIL,
            payload:(error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

export const deliverOrdersAction = (id) => async (dispatch,getState) => {

    try {
        dispatch({type:orderTypes.DELIVERED_ORDER_START})



        const config = {
            headers:{
                
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }
        console.log(config);
        
        await axios.put(`/api/orders/${id}/deliver`,{},config)
        dispatch({type:orderTypes.DELIVERED_ORDER_SUCCESS})
        
        
    } catch (error) {
        dispatch({type:orderTypes.DELIVERED_ORDER_FAIL,
            payload:(error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}



export const orderPaidsAction = (orderId,paymentResult) => async (dispatch,getState) => {

    try {
        dispatch({type:orderTypes.PAY_ORDER_START})



        const config = {
            headers:{
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            },

        }
        
        const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
        console.log(data);
        dispatch({type:orderTypes.PAY_ORDER_SUCCESS})
        
        
    } catch (error) {
        dispatch({type:orderTypes.PAY_ORDER_FAIL,
            payload:(error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

