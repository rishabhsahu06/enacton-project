import React, { useState, useEffect } from 'react';
import './Sidebar.css'; 

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <a href="#">{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
