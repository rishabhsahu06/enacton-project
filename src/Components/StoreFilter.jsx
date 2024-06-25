import React, { useState } from "react";
import "./StoreFilter.css";

function StoreFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    cats: "",
    cashback_enabled: false,
    is_promoted: false,
    is_sharable: false,
    status: "",
    alphabet: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Category:</label>
        <input
          type="text"
          name="cats"
          value={filters.cats}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="cashback_enabled"
            checked={filters.cashback_enabled}
            onChange={handleInputChange}
          />
          Cashback Enabled
        </label>
      </div>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="is_promoted"
            checked={filters.is_promoted}
            onChange={handleInputChange}
          />
          Promoted
        </label>
      </div>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="is_sharable"
            checked={filters.is_sharable}
            onChange={handleInputChange}
          />
          Sharable
        </label>
      </div>
      <div className="filter-group">
        <label>Status:</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
        >
          <option value="">Any</option>
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
          <option value="trash">Trash</option>
        </select>
      </div>
      <div className="filter-group"></div>
      <button className="apply-button" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default StoreFilter;
