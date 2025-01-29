import { useEffect, useState } from 'react'
import Axios from 'axios'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  const [data, setData] =useState([]);
  useEffect(() => {
    Axios.get('http://localhost:8081/products')
    // .then(res => res.json())
    .then((data) => setData(data.data))
    .catch(err => console.log(err));
  },[]);
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

export default App
