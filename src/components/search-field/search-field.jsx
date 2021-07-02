const SearchField = (props) => {
  const { value, placeholder, onChange } = props;

  return (
    <input
      className="search-field"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchField;
