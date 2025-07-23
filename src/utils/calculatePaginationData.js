export const calculatePaginationData = ({
  totalItems,
  currentPage,
  perPage,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    page: currentPage,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};
