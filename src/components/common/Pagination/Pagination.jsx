import React from 'react';
import styles from "./Pagination.module.scss";

const Pagination = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {
  let minPage = 1;
  let prevPage = currentPage - 1;
  let nextPage = currentPage + 1;
  let maxPage = Math.ceil(totalUsersCount / pageSize);
  return (
    <div className={styles.pagination}>
      {currentPage !== minPage && <span className="prev" onClick={() => onPageChanged(prevPage)}>{'<'}</span>}
      {currentPage !== minPage && <span className="minPage" onClick={() => onPageChanged(minPage)}>{minPage}</span>}
      {currentPage > 3 && <span className={styles.dotdotdot}>...</span>}
      {currentPage > 2 && <span className="prevPage" onClick={() => onPageChanged(prevPage)}>{prevPage}</span>}
      <span onClick={() => onPageChanged(currentPage)} className={styles.selectedPage}>{currentPage}</span>
      {currentPage <= (maxPage - 2) && <span className="nextPage" onClick={() => onPageChanged(nextPage)}>{nextPage}</span>}
      {currentPage <= (maxPage - 3) && <span className={styles.dotdotdot}>...</span>}
      {currentPage !== maxPage && <span className="maxPage" onClick={() => onPageChanged(maxPage)}>{maxPage}</span>}
      {currentPage !== maxPage && <span className="next" onClick={() => onPageChanged(nextPage)}>{'>'}</span>}
    </div>
  );
};

export default Pagination;