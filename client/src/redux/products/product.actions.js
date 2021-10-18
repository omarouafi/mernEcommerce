import axios from 'axios'
import { propTypes } from 'react-bootstrap/esm/Image'
import {productTypes} from './product.types'

const fetchProductsStart = () => ({
    type:productTypes.FETCH_PRODS_START
})

const fetchProductSuccess = (items) => ({
    type:productTypes.FETCH_PRODS_SUCCESS,
    payload:items
})
const fetchProductFailure = (error) => ({
    type:productTypes.FETCH_PRODS_FAILURE,
    payload:error
})


export const productsFetchAsync = (query='',page=1) => async dispatch => {

    try {
        dispatch(fetchProductsStart())

        const {data} = await axios.get(`/api/products?name=${query}&page=${page}`)
        dispatch(fetchProductSuccess(data))
        
        
    } catch (error) {
        dispatch(fetchProductFailure(
            (error.response && error.response.data.message ? error.response.data.message : error.message)
        ))
        
    }

}
export const topProductsAction = () => async dispatch => {

    try {
        dispatch({type:productTypes.TOP_PRODS_START})

        const {data} = await axios.get(`/api/products/top`)
        dispatch({type:productTypes.TOP_PRODS_SUCCESS,payload:data})
        
        
    } catch (error) {
        dispatch({type:productTypes.TOP_PRODS_FAILURE,payload:
            (error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

export const deleteProductAction = (id) => async (dispatch,getState) => {

    try {
        dispatch({type:productTypes.DELETE_PRODS_START})
        

        const config = {
            headers : {
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        await axios.delete(`/api/products/${id}`,config)
        dispatch({type:productTypes.DELETE_PRODS_SUCCESS})
        
        
    } catch (error) {
        dispatch({type:productTypes.DELETE_PRODS_FAILURE,payload:
            (error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

export const updateProductAction = (id,data) => async (dispatch,getState) => {

    try {
        dispatch({type:productTypes.UPDATE_PRODS_START})
        

        const config = {
            headers : {
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        await axios.patch(`/api/products/${id}`,data,config)
        dispatch({type:productTypes.UPDATE_PRODS_SUCCESS})
        
        
    } catch (error) {
        dispatch({type:productTypes.UPDATE_PRODS_FAILURE,payload:
            (error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

export const addProductAction = (data) => async (dispatch,getState) => {

    try {
        dispatch({type:productTypes.CREATE_PRODS_START})
        

        const config = {
            headers : {
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        await axios.post(`/api/products/`,data,config)
        dispatch({type:productTypes.CREATE_PRODS_SUCCESS})
        
        
    } catch (error) {
        dispatch({type:productTypes.CREATE_PRODS_FAILURE,payload:
            (error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}

export const reviewProductAction = (id,data) => async (dispatch,getState) => {

    try {
        dispatch({type:productTypes.REVIEW_PRODS_START})
        

        const config = {
            headers : {
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        await axios.post(`/api/products/${id}/reviews`,data,config)
        dispatch({type:productTypes.REVIEW_PRODS_SUCCESS})
        
        
    } catch (error) {
        dispatch({type:productTypes.REVIEW_PRODS_FAILURE,payload:
            (error.response && error.response.data.message ? error.response.data.message : error.message)
        })
        
    }

}




