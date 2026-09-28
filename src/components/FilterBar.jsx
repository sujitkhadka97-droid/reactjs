const STATUS_OPTIONS = ['All', 'Active', 'Completed'];
const CATEGORY_OPTIONS = ['All', 'Work', 'Personal', 'Urgent'];

function FilterBar({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__group" role="group" aria-label="Filter by status">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            className={`filter-bar__button ${
              statusFilter === status ? 'filter-bar__button--active' : ''
            }`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <select
        className="filter-bar__category"
        value={categoryFilter}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
      >
        {CATEGORY_OPTIONS.map((category) => (
          <option key={category} value={category}>
            {category === 'All' ? 'All categories' : category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;