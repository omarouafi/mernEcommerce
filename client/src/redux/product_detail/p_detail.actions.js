import axios from "axios"
import { detail_Types } from "./p_detail.types"

export const fetchProdDetail = (id) => async dispatch => {
    try {
        
        dispatch({type:detail_Types.FETCH_PROD_DETAIL})

        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({type:detail_Types.FETCH_PROD_SUCCESS,payload:data})

    } catch (error) {
        dispatch({type:detail_Types.FETCH_PROD_FAILURE,payload:(error.response && error.response.data.message ? error.response.data.message:error.message   )})
    }
}