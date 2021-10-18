import {combineReducers} from 'redux'
import { cartReducer } from './cart/cart.reducer';
import { productReducer,topProductReducer,reviewProductReducer,createProductReducer,deleteProductReducer,updateProductReducer } from './products/product.reducer';
import { detailReducer } from './product_detail/p_detail.reducer';
import {adminUserUpdateRedcuer, deleteUserReducer, listUsersReducer, loginReducer, adminUserGetRedcuer,userDetailsRedcuer} from '../redux/user/user.reducer'
import createOrderReducer,{orderDeliverReducer,orderDetailsReducer,orderPayReducer,getOrdersReducer} from './order/order.reducer';


export default combineReducers({
    productRed:productReducer,
    productDetail:detailReducer,
    createProductReducer,
    deleteProductReducer,
    updateProductReducer,
    cart:cartReducer,
    userLogin:loginReducer,
    userDetail:userDetailsRedcuer,
    createOrderReducer,
    orderDetailsReducer,
    orderPayReducer,
    listUsers:listUsersReducer,
    deleteUser:deleteUserReducer,
    adminUpdateUser:adminUserUpdateRedcuer,
    adminUserGetRedcuer,
    getOrdersReducer,
    orderDeliverReducer,
    reviewProductReducer,
    topProductReducer
    
});