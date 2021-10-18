import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from './rootReducer'
import thunk from 'redux-thunk'


const middlewares = [thunk]

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userFromLocal = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const userDetailFromLocal = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const shippingAddressFromLocal = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentFromLocal = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const intitialState = {
    cart : {
        cartItems:cartItemsFromLocalStorage,
        shippingAddress:shippingAddressFromLocal,
        paymentMethod:paymentFromLocal,
        },

    userLogin:{currentUser: userFromLocal},
    userDetail:{user: userDetailFromLocal},
    

    } 



export const store = createStore(reducers,intitialState,composeWithDevTools(applyMiddleware(...middlewares)));