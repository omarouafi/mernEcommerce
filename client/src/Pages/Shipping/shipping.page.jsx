import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../../components/FormContainer/form.container'
import { saveShippingAction } from '../../redux/cart/cart.actions'
import CheckoutSteps from '../../components/CheckoutProcess/check.component'

function Shipping({history,location}) {



    
    const savedAddress = useSelector(state => state.cart.shippingAddress)

    const [address,setAddress] = useState(savedAddress.address)
    const [city,setCity] = useState(savedAddress.city)
    const [postalCode,setPostalCode] = useState(savedAddress.postalCode)
    const [country,setCountry] = useState(savedAddress.country)
    
    const dispatch = useDispatch();


    const toPayment = (e) => {
       e.preventDefault();
       dispatch(saveShippingAction({address,city,postalCode,country}))
       history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            
            <Form onSubmit={toPayment}>
                <Form.Group controlId="address">
                    <Form.Label>
                        Adress 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value) } />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>
                        City 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Where do you live" value={city} onChange={(e) => setCity(e.target.value) } />
                </Form.Group>
              
                <Form.Group controlId="postalCode">
                    <Form.Label>
                        Postal Code 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter your postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value) } />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control type="text" placeholder="Where are you from" value={country} onChange={(e) => setCountry(e.target.value) } />
                </Form.Group>
              
                <Button type="submit" variant="primary">
                    Continue
                </Button>
           


            </Form>
            

        </FormContainer>
    )
}

export default Shipping
