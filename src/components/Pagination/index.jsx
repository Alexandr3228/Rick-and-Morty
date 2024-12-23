import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

// type PaginationProps = {
//   currentPage: number,
//   onChangePage: (page: number) => void,
// };

const Pagination = ({ pageCount, currentPage, onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel=""
    nextLabel=">"
    onPageChange={(e) => onChangePage(e.selected + 1)}
    pageRangeDisplayed={4}
    marginPagesDisplayed={1}
    pageCount={pageCount}
    forcePage={currentPage - 1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
);
export default Pagination;
