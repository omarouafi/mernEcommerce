import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap'

import Product from '../../components/Product/product.component'
import "./home.styles.scss"
import { productsFetchAsync } from '../../redux/products/product.actions';
import Loader from '../../components/Spinner/Spinner.component';
import Message from '../../components/Message/Message.component';
import Paginate from '../../components/Pagination/pagination.component';
import TopProducts from '../../components/Carousel/carousel.component';
import Helmet from '../../components/Helmet/helmet.component';



const Home = ({match}) => {
    

    const query = match.params.query || ''
    const page = match.params.page*1 || 1

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productRed);
    const {loading,error,products,pages} = productsList
    useEffect(()=>{
        dispatch(productsFetchAsync(query,page))
    },[dispatch,query,page])

    return (

        
        <main>
        <Container>

            {
                loading ?
                <Loader />
                : error ? 
                <Message variant='danger'>{error}</Message>
                :
                <>
                <Helmet title={"Welcome to proshop"} />
                <TopProducts />
            <h1>Latest Products</h1>
            <Row>
                {
                    
                    products.map((el) =>(
                        <Col sm={12} md={6} lg={4} xl={3} >
                            <Product product={el} />
                        </Col>
                        
                        
                        ) )
                    }
            </Row>
            </>
            }
            <Paginate pages={pages} page={page}  />
            </Container>
        </main>

    )
}

export default Home
