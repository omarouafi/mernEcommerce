

import {userTypes} from './user.types'

export const loginReducer = (state={},action) =>{

    switch (action.type) {
        case userTypes.USER_START:
            return {...state,loading:true}
        case userTypes.LOGOUT:
            return {...state,currentUser:null,error:null}

        case userTypes.USER_SUCESS:
            return {...state,error:undefined,loading:false,currentUser:action.payload}
            
        case userTypes.USER_FAIL:
            
            return {...state,loading:false,currentUser:undefined,error:action.payload}
    
        
       
        default:
            return state
    }

}


export const userDetailsRedcuer = (state={user:{}},action) => {

    switch (action.type) {
        case userTypes.GET_USER_START:
            
            return {...state,loading:true,error:undefined}
    
        case userTypes.GET_USER_SUCCESS:
            
            return {...state,loading:false,error:undefined,user:action.payload}
    
        case userTypes.GET_USER_FAIL:
            
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }

}


export const userUpdateRedcuer = (state={},action) => {

    switch (action.type) {
        case userTypes.UPDATE_USER_START:
            
            return {...state,loading:true,error:undefined}
    
        case userTypes.UPDATE_USER_SUCCESS:
            
            return {...state,loading:false,error:undefined,currentUser:action.payload}
    
        case userTypes.UPDATE_USER_FAIL:
            
            return {...state,loading:false,error:action.payload}
    
        default:
            return state;
    }

}

export const listUsersReducer = (state={users:[]},action) => {

    switch (action.type) {
        case userTypes.LIST_USERS_START:
            
            return {...state,loading:true,error:undefined}
    
        case userTypes.LIST_USERS_SUCESS:
            
            return {...state,loading:false,error:undefined,users:action.payload.users}
    
        case userTypes.LIST_USERS_FAIL:
            
            return {...state,loading:false,error:action.payload}
    
        default:
            return state;
    }

}

export const deleteUserReducer = (state={},action) => {

    switch (action.type) {
        case userTypes.DELETE_USER_START:
            
            return {...state,loading:true,error:undefined}
    
        case userTypes.DELETE_USER_SUCESS:
            
            return {...state,loading:false,error:undefined,success:true}
    
        case userTypes.DELETE_USER_FAIL:
            
            return {...state,loading:false,error:action.payload}
    
        default:
            return state;
    }

}



export const adminUserGetRedcuer = (state={},action) => {

    switch (action.type) {
        case userTypes.ADMIN_GET_USER_START:
            
            return {...state,loading:true,error:undefined}
    
        case userTypes.ADMIN_GET_USER_SUCESS:
            
            return {...state,loading:false,error:undefined,user:action.payload.user}
    
        case userTypes.ADMIN_GET_USER_FAIL:
            
            return {...state,loading:false,error:action.payload}
    
        default:
            return state;
    }

}

export const adminUserUpdateRedcuer = (state={},action) => {

    switch (action.type) {
        case userTypes.ADMIN_UPDATE_USER_START:
            
            return {...state,loading:true,error:undefined}
    
        case userTypes.ADMIN_UPDATE_USER_SUCESS:
            
            return {...state,loading:false,error:undefined,success:true}
    
        case userTypes.ADMIN_UPDATE_USER_FAIL:
            
            return {...state,loading:false,error:action.payload}
    
        default:
            return state;
    }

}