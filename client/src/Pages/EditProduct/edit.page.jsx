import React,{useState,useEffect} from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { adminGetUserAction, adminUpdateUserAction, loginAction } from '../../redux/user/user.action'
import Message from '../../components/Message/Message.component'
import Loader from '../../components/Spinner/Spinner.component'
import FormContainer from '../../components/FormContainer/form.container'
import { fetchProdDetail } from '../../redux/product_detail/p_detail.actions'
import { updateProductAction } from '../../redux/products/product.actions'
import axios from "axios"

function EditProduct({history,match}) {

    const [price,setPrice] = useState('')
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [brand,setBrand] = useState('')
    const [image,setImage] = useState('')
    const [uploading,setUploading] = useState(false)
    const [description,setDescription] = useState('')
    const [countInStock,setCountInStock] = useState('')


    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.userLogin);
    const {product,loading,error} = useSelector(state => state.productDetail);
    const {success,loading:loadingUp,error:errUp} = useSelector(state => state.updateProductReducer);

    console.log(product);
    useEffect(() => {
        if (currentUser && currentUser.user.isAdmin) {
            if(!product || product._id !== match.params.id){
                dispatch(fetchProdDetail(match.params.id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setBrand(product.brand)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
            
            
        }else{
            history.push("/")
        }
    },[dispatch,match,currentUser,history,product,success])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProductAction(match.params.id,{name,image,price,countInStock,description,category,brand}))
        dispatch(fetchProdDetail(match.params.id))
        
        
    }
    const handleUpload = async (e) => {
        e.preventDefault()
        
        const file = e.target.files[0]
        const form = new FormData()
        form.append('image',file)

        try {
            setUploading(true)
            
            const config = {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }

            const {data} = await axios.post('/api/upload',form,config)
            setImage(data)
            setUploading(false)

            
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
        
    }

    return (
        <FormContainer>
            <h1>Update Product</h1>

            {success ? <Message variant='success'>Product updated successfully</Message> : null}
            {errUp ? <Message variant='danger'>{errUp}</Message> : null}
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
                    <Form.File custom label="Choose an Image" id="image-upload" onChange={handleUpload} />
                    { uploading && <Loader/> }
              
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
                    Update
                </Button>
             
            </Form>
            

        </FormContainer>
    )
}

export default EditProduct
