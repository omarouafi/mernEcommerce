import React,{useEffect} from 'react'
import {Table,Button,Row,Col, Container} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../../components/Spinner/Spinner.component'
import Message from '../../components/Message/Message.component'
import { deleteProductAction, productsFetchAsync } from '../../redux/products/product.actions'
import { productTypes } from '../../redux/products/product.types'
import Paginate from '../../components/Pagination/pagination.component'

const ProductsList = ({history,match}) => {

    const {error,products,loading,pages,page} = useSelector(state=>state.productRed)
    const {error:errDel,success,loading:loadingDel} = useSelector(state=>state.deleteProductReducer)
    const {currentUser} = useSelector(state=>state.userLogin)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({type:productTypes.RESET_PRODS})
        if(currentUser && currentUser.user.isAdmin){
            dispatch(productsFetchAsync('',match.params.page))
        }else{
            history.push('/')
        }
    },[currentUser,dispatch,history,success,match])

    const handleDelete = (id) => {
       dispatch(deleteProductAction(id))
    }

    return (
        <Container>
        { loading ? <Loader/> : error ? <Message>{error}</Message> :     (
        <>
        
        <Row>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className="text-right">
                <LinkContainer to="/admin/products/add">
                
                <Button className="my-3">
                    <i className="fa fa-plus"></i> Add product
                </Button>
                </LinkContainer>
            </Col>
        </Row>
        

        
            {success ? <Message variant="success">Deleted successfully</Message> : null}


        <Table stripped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => (

                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                       
                            
                            <td>
                                <LinkContainer to={`products/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                    <Button onClick={(e) =>  {handleDelete(product._id)}} variant="danger" className="btn-sm">
                                        <i className="fa fa-trash"></i>
                                    </Button>
                            </td>

                        </tr>
                    ))
                }
            </tbody>

        </Table>


            
        </>)}

        <Paginate pages={pages} page={page} isAdmin />
        </Container>
    )
}

export default ProductsList
