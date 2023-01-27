import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface paginationProps {
  onChabgePage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination(props: paginationProps) {
  return (
    <ReactPaginate
      className={styles.paginator}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => props.onChabgePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
    />
  );
}

export default Pagination;
