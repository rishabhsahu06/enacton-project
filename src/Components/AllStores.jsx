import React, { useEffect, useState } from "react";
import axios from "axios";
import SortFilter from "./SortFilter";
import StoreFilter from "./StoreFilter";
import AlphabetFilter from "./AlphabetFilter";
import "./SortFilter.css";
import './AllStore.css';
import './StoreFilter.css';
import './AlphabetFilter.css';

function AllStores() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("name");
  const [filters, setFilters] = useState({});
  const [favourites, setFavourites] = useState([]); 
  const itemsPerPage = 30;

  async function fetchData(sortParam = "name", sortOrder = "asc", filterParams = {}) {
    try {
      let filterQuery = Object.keys(filterParams)
        .filter(key => filterParams[key])
        .map(key => `${key}=${filterParams[key]}`)
        .join("&");

      let url = `http://localhost:3001/stores?_sort=${sortParam}&_order=${sortOrder}&${filterQuery}`;
      if (sortParam === "amount_type,cashback_amount") {
        url = `http://localhost:3001/stores?_sort=amount_type,cashback_amount&_order=asc,desc&${filterQuery}`;
      }
      if (filterParams.alphabet) {
        url += `&name_like=^${filterParams.alphabet}`;
      }

      let response = await axios.get(url);
      setData(response.data); 
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const [sortParam, sortOrder] = getSortParams(sortOption);
    fetchData(sortParam, sortOrder, filters); 
  }, [sortOption, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAlphabetChange = (alphabet) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (alphabet) {
        updatedFilters.alphabet = alphabet;
      } else {
        delete updatedFilters.alphabet;
      }
      return updatedFilters;
    });
  };

  const getSortParams = (sortOption) => {
    switch (sortOption) {
      case "featured_desc":
        return ["featured", "desc"];
      case "popularity_desc":
        return ["clicks", "desc"];
      case "cashback":
        return ["amount_type,cashback_amount", "asc,desc"];
      default:
        return ["name", "asc"];
    }
  };

  const filteredData = data.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (url) => {
    console.log(url, "url")
    window.location.href = url;
  };

  const handleFavouriteClick = (storeId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(storeId)
        ? prevFavourites.filter((id) => id !== storeId)
        : [...prevFavourites, storeId]
    );
  };

  const formatCashbackAmount = (store) => {
    if (store.cashback_enabled === 0) {
      return "No cashback available";
    } else if (store.cashback_enabled === 1) {
      let cashbackString = store.rate_type + " ";
      if (store.amount_type === "fixed") {
        cashbackString += `$${store.cashback_amount.toFixed(2)}`;
      } else if (store.amount_type === "percent") {
        cashbackString += `${store.cashback_amount.toFixed(2)}%`;
      }
      return cashbackString;
    }
    return "";
  };

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentItems, "currentItems")

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <p className="ml-6">All Store</p>
      <SortFilter onSortChange={handleSortChange} />
      <StoreFilter onFilterChange={handleFilterChange} />
      <AlphabetFilter onAlphabetChange={handleAlphabetChange} />
      <input
        type="text"
        placeholder="Search stores..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="card-container">
        {currentItems.map((store) => (
          <div
            className="card"
            key={store.id}
            onClick={() => handleCardClick(store.homepage)}
          >
            <img className="w-8" src={store.logo} alt="" />
            <p className="p-2">{store.slug}</p>
            <p className="p-5">{store.name}</p>
            <p className="text-green-500">{formatCashbackAmount(store)}</p>
            <button
              className={`favourite-button ${favourites.includes(store.id) ? 'favourited' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); 
                handleFavouriteClick(store.id);
              }}
            >
              {favourites.includes(store.id) ? '❤️' : '♡'}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllStores;
