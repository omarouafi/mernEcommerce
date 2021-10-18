import React,{useState,useEffect} from 'react'
import { Form,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../../components/Message/Message.component'
import Loader from '../../components/Spinner/Spinner.component'
import FormContainer from '../../components/FormContainer/form.container'
import { fetchProdDetail } from '../../redux/product_detail/p_detail.actions'
import { addProductAction, updateProductAction } from '../../redux/products/product.actions'

function AddProduct({history,match}) {

    const [price,setPrice] = useState('')
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [brand,setBrand] = useState('')
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    const [countInStock,setCountInStock] = useState('')


    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.userLogin);
    const {product,loading,error} = useSelector(state => state.productDetail);
    const {success,loading:loadingUp,error:errAdd} = useSelector(state => state.createProductReducer);

    console.log(product);
    useEffect(() => {
        if (!currentUser || !currentUser.user.isAdmin) {
           
            history.push("/")
        }
        if(success){
            history.push("/admin/products")
            
        }
    },[dispatch,currentUser,history,success])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addProductAction({name,image,price,countInStock,description,category,brand}))
        
        
    }

    return (
        <FormContainer>
            <h1>Add Product</h1>

            {loadingUp ? <Message>Adding...</Message> : null}
            {success ? <Message variant='success'>Product added successfully</Message> : null}
            {errAdd ? <Message variant='danger'>{errAdd}</Message> : null}
            {error ? <Message variant='danger'>{error}</Message> : null}
            { loading ? <Loader /> : null}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>
                        Name 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value) } />
                </Form.Group>
               
                <Form.Group controlId="price">
                    <Form.Label>
                        Price 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the price" value={price} onChange={(e) => setPrice(e.target.value) } />
                </Form.Group>
               
               
                <Form.Group controlId="image">
                    <Form.Label>
                        Image 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the image" value={image} onChange={(e) => setImage(e.target.value) } />
                </Form.Group>
               
                <Form.Group controlId="category">
                    <Form.Label>
                        category 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the category" value={category} onChange={(e) => setCategory(e.target.value) } />
                </Form.Group>
               
                <Form.Group controlId="brand">
                    <Form.Label>
                        Brand 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the brand" value={brand} onChange={(e) => setBrand(e.target.value) } />
                </Form.Group>
               
                <Form.Group controlId="description">
                    <Form.Label>
                        Description 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the description" value={description} onChange={(e) => setDescription(e.target.value) } />
                </Form.Group>
               
                <Form.Group controlId="countInStock">
                    <Form.Label>
                        Count In Stock 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter the countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value) } />
                </Form.Group>
               
                <Button type="text" variant="primary">
                    <i className="fa fa-plus"></i> Add
                </Button>
             
            </Form>
            

        </FormContainer>
    )
}

export default AddProduct
