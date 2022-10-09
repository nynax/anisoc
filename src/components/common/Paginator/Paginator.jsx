import React from 'react';
import ReactPaginate from 'react-paginate';
import css from "./Paginator.module.css"



function PaginatedItems({ pagesCount, changePage, currentPage}) {

    const handlePageClick = (event) => {
        changePage(event.selected + 1)
    };

    return (
        <div className={css.pagination}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                previousLabel="<<"
                onPageChange={handlePageClick}
                pageCount={pagesCount}
                renderOnZeroPageCount={null}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                activeClassName={css.active}
                forcePage={pagesCount ? currentPage - 1 : -1}
            />
        </div>
    );
}

export default PaginatedItems