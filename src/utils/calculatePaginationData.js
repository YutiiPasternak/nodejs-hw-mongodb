export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = count > 0 ? Math.ceil(count / perPage) : 0;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: count > 0 && page < totalPages,
    hasPreviousPage: count > 0 && page > 1,
  };
};
