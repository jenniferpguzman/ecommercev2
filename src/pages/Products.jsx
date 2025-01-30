import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../stylesheets/Product.css';
import '../stylesheets/Navbar.css'
import '../stylesheets/Footer.css'

function Products() {
  //useState allows you to add state to functional components, will return a pair of values
  //here i am passing product as the state variables which holds the list of products fetched from my api
  //setProduct updates the product state
  //category is state variable ,hold the current displayed products based on selected cat.
  //setCat updates the cat state
  const [product, setProduct] = useState([]); //will start as an empty array
  const [category, setCategory] = useState([]);

  // Fetch products from the backend API when the component loads for the first time 
  //useEffect will allow you to perform "side effects" in functional components, i am fetching data 
  useEffect(() => {
    //get request
    Axios.get('/api/products')
    //after data is succesfully fetched it will run the code inside then
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
    // using a spread operator to create a "copy" of the category array, without modifying the original
    const sortedProducts = [...category].sort((a, b) => a.price - b.price); // Sort by price (low to high)
    setCategory(sortedProducts); // Update with sorted products
  };

  const setHighToLow = () => {
    // using a spread operator to create a "copy" of the category array, without modifying the original
    const reverseSortedProducts = [...category].sort((a, b) => b.price - a.price); // Sort by price (high to low)
    setCategory(reverseSortedProducts); // Update with sorted products
  };

  return (
    //creating the UI for filter system
    //onClick allows for the function handleBtns to run when clicking on it
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
      //checking if array is empty
      //? - ternary operator: short for if else
      <p>No products found</p>
    ) : (//rendering products
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