
import axios from "axios"
import { userTypes } from "./user.types"

export const loginAction = ({email,password}) => async (dispatch) =>  {

    try {
        dispatch({type:userTypes.USER_START})
        
        const {data} = await axios({
            method:'POST',
            url:'/api/users/login',
            data:{email,password}
    })
    console.log(data);
    
    dispatch({type:userTypes.USER_SUCESS,payload:data})
    
    localStorage.setItem('currentUser',JSON.stringify(data))
    
    } catch (error) {
        dispatch({type:userTypes.USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}

export const logout = () => async (dispatch) =>  {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("user")
        dispatch({type:userTypes.LOGOUT})
}


export const registerAction = ({email,name,password}) => async (dispatch) =>  {

    try {
        dispatch({type:userTypes.USER_START})
        
        const {data} = await axios({
            method:'POST',
            url:'/api/users/signup',
            data:{email,password,name}
    })
    
    
    dispatch({type:userTypes.USER_SUCESS,payload:data})
    
    localStorage.setItem('currentUser',JSON.stringify(data))
    
    } catch (error) {
        dispatch({type:userTypes.USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}

export const getUserAction = (id) => async (dispatch,getState) =>  {

    try {
        dispatch({type:userTypes.GET_USER_START})
        
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        const {data} = await axios.get(
            
            `/api/users/${id}`,
            config
        )
    
    
    dispatch({type:userTypes.GET_USER_SUCCESS,payload:data})
    dispatch({type:userTypes.USER_SUCESS,payload:data})
    
    localStorage.setItem('user',JSON.stringify(data))
    
    } catch (error) {
        dispatch({type:userTypes.GET_USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}



export const updateUserAction = ({name,email,password}) => async (dispatch,getState) =>  {

    try {
        dispatch({type:userTypes.UPDATE_USER_START})
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        const {data} = await axios.patch(
            `/api/users/me`,
            {name,email,password},
            config

    )
    
    
    dispatch({type:userTypes.UPDATE_USER_SUCESS,payload:data})
    
    localStorage.setItem('currentUser',JSON.stringify(data))
    
    } catch (error) {
        dispatch({type:userTypes.GET_USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}
export const listUsersAction = () => async (dispatch,getState) =>  {

    try {
        dispatch({type:userTypes.LIST_USERS_START})
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        const {data} = await axios.get(
            `/api/users`,
            config

    )
    
    
    dispatch({type:userTypes.LIST_USERS_SUCESS,payload:data})
    
    
    } catch (error) {
        dispatch({type:userTypes.LIST_USERS_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}


export const deleteUserAction = (id) => async (dispatch,getState) =>  {

    try {
        dispatch({type:userTypes.DELETE_USER_START})
        const config = {
            headers:{
                
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/users/${id}`,
            config

    )
    
    
    dispatch({type:userTypes.DELETE_USER_SUCESS,payload:data})
    
    
    } catch (error) {
        dispatch({type:userTypes.DELETE_USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}



export const adminGetUserAction = (id,data) => async (dispatch,getState) =>  {

    try {
        dispatch({type:userTypes.ADMIN_GET_USER_START})
        const config = {
            headers:{
                
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        const {data} = await axios.get(
            `/api/users/${id}`,
            
            config

    )
    
    
    dispatch({type:userTypes.ADMIN_GET_USER_SUCESS,payload:data})
    
    
    } catch (error) {
        dispatch({type:userTypes.ADMIN_GET_USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}
export const adminUpdateUserAction = (id,se) => async (dispatch,getState) =>  {

    try {
        dispatch({type:userTypes.ADMIN_UPDATE_USER_START})
        const config = {
            headers:{
                'Content-Type':"Application/Json",
                Authorization:`Bearer ${getState().userLogin.currentUser.token}`
            }
        }

        const {data} = await axios.patch(
            `/api/users/${id}`,
            se,
            config

    )
    
    
    dispatch({type:userTypes.ADMIN_UPDATE_USER_SUCESS,payload:data})
    
    
    } catch (error) {
        dispatch({type:userTypes.ADMIN_UPDATE_USER_FAIL,payload:(error.response && error.response.data ? error.response.data.message : error.message  )})    
    }
    
}
