import React from 'react';
import { getPageArrow } from '../../../utils/pages';

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArrow = getPageArrow(totalPages);
    return (
        <div className="page__wrapper">
            {pagesArrow.map( p => 
                <span 
                    onClick={() => changePage(p)}
                    key={p} 
                    className={ page === p ? 'page page__current' : 'page' }>
                    {p}
                </span>
            )}
        </div>
    )
};
export default Pagination