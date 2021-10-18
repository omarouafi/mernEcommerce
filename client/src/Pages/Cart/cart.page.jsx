import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeItemFromCart } from '../../redux/cart/cart.actions';
import {Row,Col,ListGroup,Card,Form, Container,Image,Button} from 'react-bootstrap'
import Message from "../../components/Message/Message.component"
import {Link} from 'react-router-dom'
function Cart({match,location,history}) {

    const product = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cartItems = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        if (product) {
            dispatch(addToCart(product,qty))
        }
    },[dispatch,product,qty])

    const removeCartHandler = (id) =>{
        dispatch(removeItemFromCart(id))
    }

    const handleCheckout = () =>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Container>
            {
                <Row>
                    <Col md={8}>
                        <h1>Shopping Cart</h1>
                        {
                            cartItems.length === 0 ? 
                            
                            <Message>Your cart is empty</Message>
                            :
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col md={4}>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,e.target.value))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map(el => 
                                                                (
                                                                    <option key={el+1} value={el+1}>
                                                                        {el+1}
                                                                    </option>
                                                                ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                                <Col md={2}>
                                                    <Button type='button' variant='light' onClick={() => {
                                                        removeCartHandler(item.product)
                                                    }}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        }
                    </Col>
                    <Col md={4}>

                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>
                                        SubTotal({ cartItems.reduce((acc,item) => acc + item.qty*1 , 0) }) items
                                    </h2>
                                    ${
                                        cartItems.reduce((acc,item) => acc+(item.qty*item.price) ,0).toFixed(2)
                                    }

                                </ListGroup.Item>
                                <ListGroup.Item>

                                    <Button type="button" className='btn-block' disabled={cartItems.length===0} onClick={handleCheckout}>
                                        Proceed To Checkout
                                    </Button>

                                </ListGroup.Item>
                            </ListGroup>
                        </Card>



                    </Col>
                </Row>

            }
        </Container>
    )
}

export default Cart
