import React, { useState } from 'react'
import { Form,Button } from "react-bootstrap"
import {withRouter} from "react-router-dom"

const Search = ({history}) => {

    const [query,setQuery] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        if(query){

            history.push(`/search/${query}`)        
        }else{
            history.push(`/`)        

        }
    }

    return (
        
        <Form onSubmit={handleClick} inline>
            <Form.Control className="mr-sm-2 ml-sm-5"  type="search" value={query} onChange={e => setQuery(e.target.value)} />
            <Button type="submit" className="p-2" variant="outline-success">Search</Button>
        </Form>
    )
}

export default withRouter(Search) 
