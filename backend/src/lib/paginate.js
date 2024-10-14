const paginateData = (data, page, perPage = 12) => {
  page = page.toString() === "NaN" ? 1 : page;
  perPage = perPage.toString() === "NaN" ? 12 : perPage;

  const lastPage = Math.ceil(data.length / perPage);

  if (page > lastPage) {
    page = lastPage;
  }

  const start = (page - 1) * perPage;

  const end = start + perPage;

  const dataSliced = data.slice(start, end);

  const previousPage = page - 1 >= 1 ? page - 1 : null;
  const nextPage = end < data.length ? page + 1 : null;

  return {
    page,
    perPage,
    previousPage,
    nextPage,
    lastPage,
    total: data.length,
    data: dataSliced,
  };
};
export default paginateData;
