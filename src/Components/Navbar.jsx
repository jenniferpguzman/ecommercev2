import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Navbar.css'

function Navbar(){
    return (
        <nav className="nav_bar">
            <div className="title">
                <Link to ="/">Jenny Spade</Link>
            </div>
            <div className="nav_links">
            <ul>
                <li><a href="/products">Handbags</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;