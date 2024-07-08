import React from "react";

const Pagination = ({ page, pageSize, totalProperties, onPageChange }) => {
  const totalItems = Math.ceil(totalProperties / pageSize);

  const handlePageChaange = (newPage) => {
    if (newPage > 1 && newPage <= totalItems) {
      onPageChange(newPage);
    }
  };
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === 1}
        onClick={()=>handlePageChaange(page-1)}
      >
        Previous
      </button>
      <span className="mr-2 ">
        Page {page} of {totalItems}
      </span>
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalItems}
        onClick={()=>handlePageChaange(page+1)}

      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
