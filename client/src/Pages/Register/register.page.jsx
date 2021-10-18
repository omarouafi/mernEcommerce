import React,{useState,useEffect} from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { registerAction } from '../../redux/user/user.action'
import Message from '../../components/Message/Message.component'
import FormContainer from '../../components/FormContainer/form.container'

function Register({history,location}) {

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.userLogin);


    useEffect(() => {
        if (currentUser) {
            history.push(redirect)
        }
    },[history,redirect,currentUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== passwordConfirm){
            setMessage('Passwords should match')
        }else{

            dispatch(registerAction({name,email,password}))
        }
    }

    const handleConfirmation = (e) => {
        if(password !== passwordConfirm){
            setMessage('Passwords should match')
        }else{
            setMessage(null)

        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message ? <Message variant='danger'>{message}</Message> : null}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>
                        Name 
                    </Form.Label>
                    <Form.Control type="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value) } />
                </Form.Group>
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
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>
                        Password Confirm
                    </Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password " onBlur={handleConfirmation} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value) } />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign Up
                </Button>
                <Row>
                    <Col>
                        Already have a Customer? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
                    </Col>
                </Row>


            </Form>
            

        </FormContainer>
    )
}

export default Register
