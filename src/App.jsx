import { useEffect, useState } from 'react'
//axios is a library making HTTP request easy
import Axios from 'axios'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  //calling useState and providing an initiail value which I set to an empyt array
  //empty array because when i fetch from the api/products and it renders it will only run once
  const [data, setData] =useState([]);
  //this useState will return two things, data- current state value, here it is holding the products fetched from the api
  //setData- a function that i call to update the state, here it will be used to update data when the products are loaded
  useEffect(() => {
    //useEffect- allowing me to fetch by data  
    Axios.get('/api/products')
    // making a request to the server to get my list of products
    // this is asynchronous- it will take time to render the response from server
    .then((data) => setData(data.data))
    //after data is fetched we continue with these lines which essentially accesses
    //the actual product data
    .catch(err => console.log(err));
    //catching errors 
  },[]); //empty array lets for this function to run once as soon as the data loads for the first time
  return (
    <>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='products' element={<Products products={data}/>} />
    <Route path='contact' element={<Contact />} />
  </Routes>
  <Footer />
  </BrowserRouter>
    </>
  )
}
// using a prop, a way to pass data from one component to another, in my product route
// passing the fetched products to the 'products' component allowing to display the information

export default App
