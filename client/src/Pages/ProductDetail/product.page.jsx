import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import { Col, Row,Image, ListGroup,Card, Button, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../../components/Rating/rating.component'
import './product.styles.scss'
import { fetchProdDetail } from '../../redux/product_detail/p_detail.actions';
import Loader from '../../components/Spinner/Spinner.component';
import Message from '../../components/Message/Message.component';
import { reviewProductAction } from '../../redux/products/product.actions';


const ProductPage = ({match,history}) =>{
    
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector(state => state.productDetail);
    const {error:errRev,loading:loadRev,success} = useSelector(state => state.reviewProductReducer);
    const {currentUser} = useSelector(state => state.userLogin);

    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(1)
    const [comment,setComment] = useState('')
    
    useEffect(() => {
        dispatch(fetchProdDetail(match.params.id));
    }, [dispatch,match.params.id,success])
    
    
    const AddToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitReview = (e) => {
        e.preventDefault()
        dispatch(reviewProductAction(match.params.id,{rating,comment}))
        setRating(1)
        setComment('')
        
    }

    return (
        <Container className="">
            <Link to='/' className="btn btn-light my-3">
                Go back
            </Link>
            {
                loading? <Loader />:error? <Message variant="danger">{error}</Message>:
            <>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                   <ListGroup variant='flush'> 
                       <ListGroup.Item>
                           <h3>
                           {product.name}
                           </h3>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
                       </ListGroup.Item>
                       <ListGroup.Item>
                            Price:${product.price}
                       </ListGroup.Item>
                       <ListGroup.Item>
                            Description:\n{product.description}
                       </ListGroup.Item>
                   </ListGroup> 
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                <strong>

                                    ${product.price}
                                </strong>
                                </Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0? 'In Stock':'out of stock'}
                                </Col>
                            </Row>
                            </ListGroup.Item>

                            {
                                product.countInStock>0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Qty
                                            </Col>
                                            <Col>
                                                <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map( el => (
                                                            <option key={el+1} value={el+1}>{el+1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }

                            <ListGroup.Item>
                            <Row>
                                <Button disabled={product.countInStock===0} className="btn-block" type="btn" onClick={AddToCartHandler} >Add To Cart</Button>
                            </Row>
                            </ListGroup.Item>
                        </ListGroup>                   
                    </Card>                   
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                <ListGroup variant="flush">
                <h2>Reviews</h2>
                    {product.reviews.length === 0 ? (<Message>This product has no reviews</Message>) : (
                        
                            product.reviews.map(({name,rating,comment,createdAt}) => (
                                <ListGroup.Item>
                                    <strong>{name}</strong>
                                    <Rating value={rating} />
                                    <p>{createdAt.substring(0,10)}</p>
                                    <p>{comment}</p>
                                </ListGroup.Item>

                            ))

            
                        )}

                        <ListGroup.Item>
                                {success && (<Message variant="success">Review added</Message>)}
                                {errRev && (<Message variant="danger">{errRev}</Message>)}
                                <h2>Write a Customer Review</h2>
                                {
                                    currentUser ? ( 

                                        <Form onSubmit={submitReview}>
                                           <Form.Group>  
                                               <Form.Label>
                                                   Rating
                                               </Form.Label>
                                               <Form.Control as="select" value={rating} onChange={ e => setRating(e.target.value)}>
                                                    <option value="">select...</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                               </Form.Control>
                                           </Form.Group>  

                                           <Form.Group>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as="textarea" row="3" value={comment} onChange={e => setComment(e.target.value) }>

                                                </Form.Control>
                                           </Form.Group>

                                           <Button type="submit">Submit</Button>
                                        </Form>


                                    ) : <Message>Please <a href="/login">login</a> to write a review</Message>
                                }

                        </ListGroup.Item>

                </ListGroup>
                </Col>
                
                



            </Row>
            </>
            }
        </Container>        
    )
}

export default ProductPage
