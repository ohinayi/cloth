import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import { authcontext } from "./authenticated";
import useApi from "./api";

const Login = () => {
    const navigate = useNavigate();
    const api = useApi()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {authenticateUser} = useContext(authcontext);
    const handleClicks = () => {
        navigate("./signup");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/user/login', {email, password});

            const accessToken = await response.data;
            localStorage.setItem('accessToken', accessToken);
            navigate("/clothHome");
            authenticateUser();
            
        } catch (error) {
            window.alert("wrong password");
            console.error('Error:', error);
        }
    };

    return(
        <div className="loginbody">
             <div className="signup-container">
             <h2>Login</h2>
                 <form onSubmit={handleLogin}>
                
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit">Login</button>
       
                <Link to="/signup"  className="loginLink" onClick={handleClicks}>Don't have an Account?Signup</Link>
                <ul className="socialmedia">
                    <li><a href="/login">google</a></li>
                    <li><a href="/login">linkein</a></li>
                    <li><a href="/login">instagram</a></li>
                </ul>
             </form>
             </div>
        </div>
    )
}
export default Login;