import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../stylesheets/Product.css';
import '../stylesheets/Navbar.css'
import '../stylesheets/Footer.css'

function Products() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  // Fetch products from the backend API when the component mounts
  useEffect(() => {
    Axios.get('/api/products')
      .then((response) => {
        setProduct(response.data);  // Store all products from API
        setCategory(response.data);  // Initially set the filtered category to all products
        console.log(response.data, '<<< response data')
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle category filter
  const handleBtns = (e) => {
    let word = e.target.value;

    // Filter products based on category
    if (word === "All") {
      setCategory(product); // Show all products
    } else {
      // Ensure we compare against the correct category field (case-sensitive or consistent naming)
      const filtered = product.filter(
        (item) => item.category.toLowerCase() === word.toLowerCase() // Match category (case-insensitive)
      );
      setCategory(filtered); // Update filtered products
    }
  };

  // Sorting functions
  const setLowtoHigh = () => {
    const sortedProducts = [...category].sort((a, b) => a.price - b.price); // Sort by price (low to high)
    setCategory(sortedProducts); // Update with sorted products
  };

  const setHighToLow = () => {
    const reverseSortedProducts = [...category].sort((a, b) => b.price - a.price); // Sort by price (high to low)
    setCategory(reverseSortedProducts); // Update with sorted products
  };

  return (
    <div className="products">
    <div className="filter_buttons">
      <button value="All" onClick={handleBtns}>All</button>
      <button value="Saddle" onClick={handleBtns}>Saddle</button>
      <button value="Crossbody" onClick={handleBtns}>Crossbody</button>
      <button value="Satchel" onClick={handleBtns}>Satchel</button>

      <button onClick={setLowtoHigh}>Price: Low to High</button>
      <button onClick={setHighToLow}>Price: High to Low</button>
    </div>
    
    {/* Display filtered and sorted products */}
    {category.length === 0 ? (
      <p>No products found</p>
    ) : (
      <div className="product_list">
        {category.map((product, index) => (
          <div key={index} className="product_card">
            <h2>{product.style_number}</h2>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <img src={product.image_url} alt={product.title} />
          </div>
        ))}
      </div>
    )}
  </div>

  );
}

export default Products;