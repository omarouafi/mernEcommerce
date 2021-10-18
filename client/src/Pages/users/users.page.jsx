import React,{useEffect} from 'react'
import {Table,Button, Container} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { deleteUserAction, listUsersAction } from '../../redux/user/user.action'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../../components/Spinner/Spinner.component'
import Message from '../../components/Message/Message.component'

const UsersList = ({history}) => {

    const {error,loading,users} = useSelector(state=>state.listUsers)
    const {error:errordeleting,loading:loadingDel,success} = useSelector(state=>state.deleteUser)
    console.log(success);
    const {currentUser} = useSelector(state=>state.userLogin)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(currentUser && currentUser.user.isAdmin){
            dispatch(listUsersAction())
        }else{
            history.push('/')
        }
    },[currentUser,dispatch,history,success])

    const handleDelete = (id) => {
        dispatch(deleteUserAction(id))
    }

    return (
        <Container>
            {errordeleting ? (<Message>{errordeleting}</Message>) : null}
        { loading ? <Loader/> : error ? <Message>{error}</Message> :     (
        <>
        <h1>Users</h1>
        <Table stripped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (

                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td> <a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {
                                    user.isAdmin ? ( <i className="fa fa-check" style={{color:"green"}}></i> )
                                    :
                                    ( <i className="fa fa-times" style={{color:"red"}}></i> )
                                    
                                }
                            </td>
                            
                            <td>
                                <LinkContainer to={`users/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fa fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                    <Button onClick={(e) =>  {e.preventDefault();handleDelete(user._id)}} variant="danger" className="btn-sm">
                                        <i className="fa fa-trash"></i>
                                    </Button>
                            </td>

                        </tr>
                    ))
                }
            </tbody>

        </Table>


            
        </>)}
        </Container>
    )
}

export default UsersList
