import React from 'react'
import {Spinner} from 'react-bootstrap'

function Loader() {
    return (
        <Spinner 
        animation='border'
        role='status'
        style={{
            width:'100px',
            height:'100px',
            display:'block',
            margin:'auto',
        }}

        />
    )
}

export default Loader
