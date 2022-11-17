import React, {FC} from 'react';
import ReactPaginate from 'react-paginate';
import css from "./Paginator.module.css"
//import {ChangePageType} from "../../../redux/usersReducer";

type PaginatedItemsType = {
    pagesCount: number
    setQueryAndParams: () => void
    currentPage: number
}

const PaginatedItems : FC<PaginatedItemsType> = ({pagesCount, setQueryAndParams, currentPage}) => {

    const handlePageClick = (event : any) => {

        //@ts-ignore
        setQueryAndParams(event.selected + 1)
    };

    return (
        <div className={css.pagination}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                previousLabel="<<"
                onPageChange={handlePageClick}
                pageCount={pagesCount}
                //renderOnZeroPageCount={null}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                activeClassName={css.active}
                forcePage={pagesCount ? currentPage - 1 : -1}
            />
        </div>
    );
}

export default PaginatedItems