import React,{useEffect} from 'react'
import { Row,Col,ListGroup,Button,Card, Container,Image } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Message from '../../components/Message/Message.component'
import FormContainer from '../../components/FormContainer/form.container'
import CheckoutSteps from '../../components/CheckoutProcess/check.component'
import { createOrderAction } from '../../redux/order/order.action'

function PlaceOrder({history,location}) {

    const cart = useSelector(state => state.cart)

    const addDecimals  = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    const itemsPrice = (cart.cartItems.reduce((acc,item) => acc + (item.price*item.qty) ,0)*1).toFixed(2)
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    const taxPrice = (itemsPrice*0.15).toFixed(2)
    const total = (itemsPrice*1 + shippingPrice*1 + taxPrice*1).toFixed(2)
    const {success,loading,order} = useSelector(state => state.createOrderReducer) 

    

    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
    },[history,success])


    const placeOrder = (e) => {
       e.preventDefault();
       dispatch(createOrderAction({
           orderItems:cart.cartItems,
           shippingAddress:cart.shippingAddress,
           paymentMethod:cart.paymentMethod,
           shippingPrice,
           taxPrice,
           totalPrice:total

       })) 
    }

    return (
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
                                <p>
                                    <strong>Address:</strong>
                                    {cart.shippingAddress.address}{' '},
                                    {cart.shippingAddress.city} {' '},
                                    {cart.shippingAddress.postalCode}{" "},
                                    {cart.shippingAddress.country},
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>method: </strong>
                                    {cart.paymentMethod}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>ORDER ITEMS</h2>
                                {
                                    cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>:
                                    <ListGroup variant="flush">
                                        {
                                            cart.cartItems.map((item,index) => (
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
                            <Button type="button" onClick={placeOrder}>
                                Place Order
                            </Button>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </>
    )
}

export default PlaceOrder
