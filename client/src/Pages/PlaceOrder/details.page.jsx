import React,{useState,useEffect} from 'react'
import { Form,Row,Col,ListGroup,Button,Card, Container,Image } from 'react-bootstrap'
import {PayPalButton} from "react-paypal-button-v2"
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../../components/Message/Message.component'
import Loader from '../../components/Spinner/Spinner.component'
import FormContainer from '../../components/FormContainer/form.container'
import { saveShippingAction } from '../../redux/cart/cart.actions'
import CheckoutSteps from '../../components/CheckoutProcess/check.component'
import { createOrderAction, deliverOrdersAction, orderDetailsAction, orderPaidsAction } from '../../redux/order/order.action'
import axios from 'axios'
import { orderTypes } from '../../redux/order/order.types'

function OrderDetails({history,location,match}) {

    const cart = useSelector(state => state.cart)

    const addDecimals  = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    const itemsPrice = (cart.cartItems.reduce((acc,item) => acc + (item.price*item.qty) ,0)*1).toFixed(2)
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    const taxPrice = (itemsPrice*0.15).toFixed(2)
    const total = (itemsPrice*1 + shippingPrice*1 + taxPrice*1).toFixed(2)

    const {order,loading,error} = useSelector(state => state.orderDetailsReducer) 
    const {success} = useSelector(state => state.orderDeliverReducer) 
    const {currentUser} = useSelector(state => state.userLogin) 
    const {successPay,loading:loadingPay} = useSelector(state => state.orderPayReducer) 


    const [sdkReady,setSdkReady] = useState(false)

    const id = match.params.id

    const dispatch = useDispatch();

    useEffect(() => {

        const addScript = async()=> {
            const {data:clientId} = await axios.get("/api/config/paypal");
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                console.log("loaded");
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        console.log(successPay);
        if(!order || successPay || order._id !== id){
            dispatch({type:orderTypes.RESET_ORDER})
            dispatch(orderDetailsAction(id))
        }else if(!order.isPaid ){
            if(!window.paypal){
                addScript()
            }else{
                setSdkReady(true)
            }
        }
    },[dispatch,id,order,match,successPay,success])

    const handleSuccess =(paymentResult) => {
        dispatch(orderPaidsAction(order._id,paymentResult))
    }
    const markDelivered =() => {
        dispatch(deliverOrdersAction(order._id))
    }


    

    

    return (

        loading ?  <Loader />  : error ?  <Message variant="danger">
            {error}
        </Message>:

        <>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 step4/>
           </FormContainer>
            <Container>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                {
                                    order.isDelivered ? 
                                    <Message variant="success">Delivered</Message>
                                    :
                                    <Message variant="danger">Order not delivered</Message>

                                }
                                <p>
                                    name:{order.user.name}
                                </p>
                                <p>
                                    mailto:{order.user.email}
                                </p>
                                <p>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address}{' '},
                                    {order.shippingAddress.city} {' '},
                                    {order.shippingAddress.postalCode}{" "},
                                    {order.shippingAddress.country},
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                {
                                    order.isPaid ? 
                                    <Message variant="success">Paid</Message>
                                    :
                                    <Message variant="danger">Order not paid</Message>

                                }
                                <p>
                                    <strong>method: </strong>
                                    {order.paymentMethod}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>ORDER ITEMS</h2>
                                {
                                    order.orderItems.length === 0 ? <Message>Your cart is empty</Message>:
                                    <ListGroup variant="flush">
                                        {
                                            order.orderItems.map((item,index) => (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col md={2}>
                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                        </Col>
                                                        <Col>
                                                           <Link to={`/products/${item.product}`}>
                                                                {item.name}   
                                                            </Link> 
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty}x${item.price} = ${(item.qty*item.price).toFixed(2)} 
                                                        </Col>
                                                    </Row>

                                                </ListGroup.Item>
                                            ))
                                        
                                        
                                        }
                                    </ListGroup>
                                }
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Items
                                        </Col>
                                        <Col>
                                            ${itemsPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Shipping
                                        </Col>
                                        <Col>
                                            ${shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Tax
                                        </Col>
                                        <Col>
                                            ${taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Total
                                        </Col>
                                        <Col>
                                            ${total}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {
                                    currentUser && currentUser.user.isAdmin && order.isPaid && !order.isDelivered && (
                                        <Button onClick={markDelivered}>Mark as delivered</Button>
                                    ) 
                                }

                                {
                                    !order.isPaid && (

                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {
                                                !sdkReady ? <Loader/> : (
                                                    <PayPalButton amount={order.totalPrice} onSuccess={handleSuccess} />
                                                )
                                            }
                                        </ListGroup.Item>
                                    )
                                }
                           
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </>
    )
}

export default OrderDetails
