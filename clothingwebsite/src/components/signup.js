import React, { useContext, useState } from "react";
import "./signup.css";
import useApi from "./api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authcontext } from "./authenticated";

const Signup = () => {
    const navigate = useNavigate();
    const { authenticateUser } = useContext(authcontext);
    const api = useApi();
    const [newData, setNewData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
    })
    const [repeat, setRepeat] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newData);
        if (!newData.email || !newData.name || !newData.password || !newData.address) {
            return window.alert("All fields are required");
        }
         if (newData.password === repeat) {
            try {
                const response = await api.post("/user/createUser", newData);
                const {accessToken} = response.data;
                localStorage.setItem('accessToken', accessToken);
                navigate("/clothHome");
                authenticateUser();
            } catch (error) {
                window.alert("email already in use");
                console.log(error);
            }
        } else {
            console.log("wrong password");
            window.alert(" password does not match");
            setRepeat("")
        }
    }

    const handleClick = () => {
        navigate("./login");
    }

    return (
        <div className="signupbody">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="text">Name:</label>
                    <input type="text" id="name" name="Fullname" onChange={(e) => { setNewData({ ...newData, name: e.target.value }) }} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => { setNewData({ ...newData, email: e.target.value }) }} />

                    <label htmlFor="email">Address:</label>
                    <input type="text" id="address" name="address" onChange={(e) => { setNewData({ ...newData, address: e.target.value }) }} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => { setNewData({ ...newData, password: e.target.value }) }} />

                    <label htmlFor="password">Repeat Password:</label>
                    <input type="password" id="Repeat_password" name="Repeat_password" onChange={(e) => { setRepeat(e.target.value) }} />

                    <button type="submit">Sign Up</button>

                    <Link to="/login" className="loginLink" onChange={handleClick}>Already have an account?Login</Link>
                    <ul className="socialmedia">
                        <li><a href="/signup">google</a></li>
                        <li><a href="/signup">linkein</a></li>
                        <li><a href="/signup">instagram</a></li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
export default Signup;