import React from 'react'
import Helm from "react-helmet"


const Helmet = ({content,title}) => {
    return (
        <Helm>
            <title>{title}</title>
            <meta name="description" content={content} />
        </Helm>
    )
}


Helmet.defaultProps ={
    title:"Welcome to proshop",
    content:"We sell best Products",
}

export default Helmet
