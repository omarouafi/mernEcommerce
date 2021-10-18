import {productTypes} from './product.types'

const INITIAL_STATE = {
    products:[],
    loading:false,
    error:undefined
}

export const productReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case productTypes.FETCH_PRODS_START:
            return {...state,loading:true}
        case productTypes.FETCH_PRODS_SUCCESS:
            return {...state,loading:false,products:action.payload.products,pages:action.payload.pages,page:action.payload.page}
        case productTypes.FETCH_PRODS_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }   
}


export const topProductReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case productTypes.TOP_PRODS_START:
            return {...state,loading:true}
        case productTypes.TOP_PRODS_SUCCESS:
            return {...state,loading:false,products:action.payload}
        case productTypes.TOP_PRODS_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }   
}

export const createProductReducer = (state={},action) => {
    switch(action.type){
        case productTypes.CREATE_PRODS_START:
            return {...state,loading:true}
        case productTypes.CREATE_PRODS_SUCCESS:
            return {...state,loading:false,success:true}
        case productTypes.CREATE_PRODS_FAILURE:
            return {...state,loading:false,error:action.payload}
        case productTypes.RESET_PRODS:
            return {}
        default:
            return state
    }   
}

export const deleteProductReducer = (state={},action) => {
    switch(action.type){
        case productTypes.DELETE_PRODS_START:
            return {...state,loading:true}
        case productTypes.DELETE_PRODS_SUCCESS:
            return {...state,loading:false,success:true}
        case productTypes.DELETE_PRODS_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }   
}

export const updateProductReducer = (state={},action) => {
    switch(action.type){
        case productTypes.UPDATE_PRODS_START:
            return {...state,loading:true}
        case productTypes.UPDATE_PRODS_SUCCESS:
            return {...state,loading:false,success:true}
        case productTypes.UPDATE_PRODS_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }   
}

export const reviewProductReducer = (state={},action) => {
    switch(action.type){
        case productTypes.REVIEW_PRODS_START:
            return {...state,loading:true}
        case productTypes.REVIEW_PRODS_SUCCESS:
            return {...state,loading:false,success:true}
        case productTypes.REVIEW_PRODS_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }   
}

