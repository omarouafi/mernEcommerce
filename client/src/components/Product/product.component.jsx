import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from '../Rating/rating.component'


const Product = ({product}) => {
    return(
        
            <Card className="my-3 rounded p-3 ">
                <a href={`products/${product._id}`}>
                    <Card.Img  src={product.image} variant="top" />
                </a>
                <Card.Body>
                    <Card.Title as="div" >
                        <strong>
                            {product.name}
                        </strong>
                    </Card.Title>
                    <Card.Text as="div">
                        <Rating color="rgb(31, 31, 31)" value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>

                    <Card.Text as="h3">
                        ${product.price}
                    </Card.Text>

                </Card.Body>

            </Card>
        
    )
}

export default Product