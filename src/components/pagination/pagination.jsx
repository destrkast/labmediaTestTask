const Pagination = (props) => {
  const { amountOfPages, currentPage, setCurrentPage } = props;

  const pages = Array.from(Array(amountOfPages), (_, i) => ({ value: i + 1 }));

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          className={`pagination__button ${
            currentPage === page.value ? 'pagination__button_active' : ''
          }`}
          type="button"
          key={page.value}
          onClick={() => setCurrentPage(page.value)}
          disabled={currentPage === page.value}
        >
          {page.value}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
