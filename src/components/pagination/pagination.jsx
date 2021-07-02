const Pagination = (props) => {
  const { amountOfPages, currentPage, setCurrentPage } = props;

  const pages = Array.from(Array(amountOfPages), (_, i) => ({ value: i + 1 }));

  return (
    <div>
      {pages.map((page) => (
        <button
          type="button"
          key={page.value}
          onClick={() => setCurrentPage(page.value)}
        >
          {page.value}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
