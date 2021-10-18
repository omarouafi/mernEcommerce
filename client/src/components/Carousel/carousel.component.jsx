import React, { useEffect } from 'react'
import { Carousel,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { topProductsAction } from '../../redux/products/product.actions'

import Message from '../Message/Message.component'
import Loader from '../Spinner/Spinner.component'

function TopProducts() {

    const {products,loading,error} = useSelector(state => state.topProductReducer)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(topProductsAction())
    },[dispatch])

    console.log(products);
    return ( loading ? <Loader /> : error? <Message variant="danger">{error}</Message> :
       ( <Carousel pause='hover' className="bg-dark">
            {
                products.map(product => (
                    <Carousel.Item>
                        <Link to={`/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} />
                            <Carousel.Caption className="carousel-caption"> <h2>{product.name}</h2></Carousel.Caption>
                        </Link>
  
                    </Carousel.Item>
                ))
            }
        </Carousel>)
    )
}

export default TopProducts
