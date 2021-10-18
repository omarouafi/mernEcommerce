import { detail_Types } from "./p_detail.types";

export const detailReducer = (state={product:{reviews:[]}},action) => {

    switch (action.type) {
        case detail_Types.FETCH_PROD_DETAIL:
            return {...state,loading:true}
        case detail_Types.FETCH_PROD_SUCCESS:
            return {...state,loading:false,product:action.payload}
        case detail_Types.FETCH_PROD_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }

}
