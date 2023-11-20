import React from "react";
import { Modal, Button, Pagination } from "react-bootstrap";

type PaginationProps = {
  page: number;
  handlePageChange: (a: number) => void;
  totalPage: number;
};

const CusPagination: React.FC<PaginationProps> = ({
  page,
  handlePageChange,
  totalPage,
}) => {
  return (
    <Pagination>
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      />
      {Array.from({ length: totalPage }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === page}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={page === totalPage}
        onClick={() => handlePageChange(page + 1)}
      />
    </Pagination>
  );
};

export default CusPagination;
