import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return pages > 1 && (
        <Pagination className={'paginate'}>
            {[...Array(pages).keys()].map(x => (
                <Link
                key={x + 1} 
                to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x+1}` } >
                  
                    <li               
                     className={`page-link ${x+1 === page ? 'active' : ''}`}>{x + 1}</li>
                        

                </Link>
            ))}
        </Pagination>
    )
}

export default Paginate
