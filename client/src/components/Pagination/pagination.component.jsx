import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pages,page,history,keyword='',isAdmin}) => {
    console.log(pages);
    return (
        <Pagination>
            {[...Array(pages).keys()].map(p =>( 
                <LinkContainer to={isAdmin ? `/admin/products/page/${p+1}` : `/page/${p+1}`}>
                    <Pagination.Item active={(p+1) === page} >
                        {p+1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate
