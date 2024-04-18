import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import { authcontext } from "./authenticated";
import useApi from "./api";
import image1 from "./img/handsome-smiling-hipster-man-posing-studio.jpg"

const AdminLogin = () => {
    const navigate = useNavigate();
    const api = useApi()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {authenticateAdmin} = useContext(authcontext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/admin/login', {email, password});

            const accessToken = await response.data;
            localStorage.setItem('accessToken', accessToken);
            navigate("/adminPage");
            authenticateAdmin();
            
        } catch (error) {
            window.alert("wrong password");
            console.error('Error:', error);
        }
    };

    return(
        <div className="loginbody" style={{backgroundImage: `url(${image1})`}}>
             <div className="signup-container">
             <h2>Admin Login</h2>
                 <form onSubmit={handleLogin}>
                
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit">Login</button>
             </form>
             </div>
        </div>
    )
}
export default AdminLogin;