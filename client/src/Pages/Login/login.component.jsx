import React,{useState,useEffect} from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { loginAction } from '../../redux/user/user.action'
import Message from '../../components/Message/Message.component'
import Loader from '../../components/Spinner/Spinner.component'
import FormContainer from '../../components/FormContainer/form.container'

function Login({history,location}) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch();
    const {currentUser,loading,error} = useSelector(state => state.userLogin);


    useEffect(() => {
        if (currentUser) {
            history.push(redirect)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginAction({email,password}))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error ? <Message variant='danger'>{error}</Message> : null}
            { loading ? <Loader /> : null}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value) } />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>
                        Password 
                    </Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value) } />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
                <Row>
                    <Col>
                        New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                    </Col>
                </Row>


            </Form>
            

        </FormContainer>
    )
}

export default Login
