import React,{useState,useEffect} from 'react'
import { Form,Row,Col,Button,Container } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUserAction, updateUserAction } from '../../redux/user/user.action'
import Message from '../../components/Message/Message.component'
import Loader from '../../components/Spinner/Spinner.component'

function Profile({history,location}) {

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState(null)
    const [passwordConfirm,setPasswordConfirm] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch();
    let {user,error,loading} = useSelector(state => state.userDetail);
    const {currentUser} = useSelector(state => state.userLogin);
    useEffect(() => {

        if(!currentUser){

            history.push(redirect)
        }else{
            console.log(user);
            if(!user){
                dispatch(getUserAction('me'))
            }else{
                
                setName(user.user.name)
                setEmail(user.user.email)
    
            }
        }

        
    },[dispatch,user,history,currentUser,redirect])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm){
            setMessage('Passwords should match')
        }


        dispatch(updateUserAction({name,email,password}))
        dispatch(getUserAction('me'))
    }

    return (
        
            <Container>

        <Row>

            <Col md={3}>
            <h2>My Profile</h2>
            {error ? <Message variant='danger'>{error}</Message> : null}
            {message ? <Message variant='danger'>{message}</Message> : null}
            { loading ? <Loader /> : null}
            
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
                    <Form.Control type="password" placeholder="Confirm your password " value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value) } />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Update
                </Button>
                <Row>
                    <Col>
                        Already have a Customer? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
                    </Col>
                </Row>


            </Form>
            
            </Col>

            <Col md={9}>
                <h2>My orders</h2>

            </Col>
           

        </Row>
        </Container>

    )
}

export default Profile
