import React,{useEffect} from 'react'
import {Table,Button,Row,Col, Container} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../../components/Spinner/Spinner.component'
import Message from '../../components/Message/Message.component'
import { deleteProductAction, productsFetchAsync } from '../../redux/products/product.actions'
import { productTypes } from '../../redux/products/product.types'
import { getOrdersAction } from '../../redux/order/order.action'

const OrdersList = ({history}) => {

    const {error,orders,loading} = useSelector(state=>state.getOrdersReducer)
    const {currentUser} = useSelector(state=>state.userLogin)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(currentUser && currentUser.user.isAdmin){
            dispatch(getOrdersAction())
        }else{
            history.push('/')
        }
    },[currentUser,dispatch,history])

    const handleDelete = (id) => {
       
    }

    return (
        <Container>
        { loading ? <Loader/> : error ? <Message>{error}</Message> :     (
        <>
        
            <h1>Orders</h1>
    
        <Table stripped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order => (

                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.paidAt}</td>
                            <td>{!order.isDelivered ? ( <i className="fa fa-times" style={{color:'red'}}></i> )
                             : <i className="fa fa-check" style={{color:"green"}}></i> }</td>
                             <td>
                                 <LinkContainer to={`/order/${order._id}`}>
                                    <Button className="btn-sm">Detail</Button>
                                 </LinkContainer>
                             </td>
                       
                        </tr>
                    ))
                }
            </tbody>

        </Table>


            
        </>)}
        </Container>
    )
}

export default OrdersList
