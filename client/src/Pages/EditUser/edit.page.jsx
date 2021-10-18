import React,{useState,useEffect} from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { adminGetUserAction, adminUpdateUserAction, loginAction } from '../../redux/user/user.action'
import Message from '../../components/Message/Message.component'
import Loader from '../../components/Spinner/Spinner.component'
import FormContainer from '../../components/FormContainer/form.container'

function EditUser({history,match}) {

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [isAdmin,setIsAdmin] = useState('')


    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.userLogin);
    const {user,loading,error} = useSelector(state => state.adminUserGetRedcuer);

    console.log(currentUser);
    useEffect(() => {
        if (currentUser && currentUser.user.isAdmin) {
            if(!user || user._id !== match.params.id){
                dispatch(adminGetUserAction(match.params.id))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }


        }else{
            history.push("/")
        }
    },[dispatch,match,user,currentUser.user,currentUser,history])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUserAction(match.params.id,{email,name,isAdmin}))
        

    }

    return (
        <FormContainer>
            <h1>Update User</h1>
            {error ? <Message variant='danger'>{error}</Message> : null}
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
                <Form.Group controlId="admin">
                    <Form.Check type="checkbox" label="Is admin" checked={isAdmin}  onChange={(e) => setIsAdmin(e.target.checked) } />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Update
                </Button>
             
            </Form>
            

        </FormContainer>
    )
}

export default EditUser
