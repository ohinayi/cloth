import React from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";


const Home = () => {
const navigate = useNavigate();
   const handleClick = () => {
    navigate("/signup");

   }
    return(
        <div className="background">
          <div className="text-container">
            <h1>Welcome to Our Website</h1>
            <p>Explore our collection of trendy clothing</p>
            <button className="login" onClick={handleClick}>GET STARTED</button>
         </div>
        </div>

    )
}
export default Home;