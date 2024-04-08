import React from "react";
import "./navbar.css";
import {Link} from "react-router-dom";

const homeNavBar = () => {
return(
    <div className="navDiv">
        <nav >
            <div><h2><span>O</span>hinayi</h2></div>
            <div className="pages">
            <ul>
                <li><Link to="/" className="link">Home</Link></li> 
                <li><Link to="/login" className="link">Login</Link></li>
                <li><Link to="/signup" className="link">Signup</Link></li>
            </ul>
            </div>
        </nav>
    </div>
);
}

export default homeNavBar;