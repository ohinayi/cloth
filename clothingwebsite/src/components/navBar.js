import "./navbar.css";
import { Link } from "react-router-dom";
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useState, useContext } from "react";
import { authcontext } from "./authenticated";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const [isActive, setActive] = useState(false);
    const { isAuthenticated } = useContext(authcontext);
    const { isAuthenticatedAndAdmin } = useContext(authcontext);
    const { logoutUser } = useContext(authcontext);
    const navigate = useNavigate();

    const handleClick = () => {
        setActive(!isActive)
    };
    const logout = () => {
        logoutUser();
        navigate("/");
    };
    const handleCart = () => {
        navigate("/soldItems")
    }

    const FirstNav = () => {
        return (
            <div className="navDiv">
                <nav className="first">
                    <div><Link to="/adminLogin" className="linka">Admin</Link></div>
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
        )
    };
    const AdminNav = () => {
        return (
            <div>
                <nav className="navbar">
                    <Icon name={isActive ? "dropdown" : "bars"} className="icon" onClick={handleClick} />
                    <div><h2><span>O</span>hinayi</h2></div>
                    <div>
                        <Link to="/adminPage" className="adminLink">Home</Link>
                        <Link to="/soldItems" className="adminLink">Sold</Link>
                        <Link to="/newPage" className="adminLink">Add</Link>
                        <Icon name="cart" className="carts" onClick={handleCart}></Icon>
                    </div>
                </nav>

                <div className={isActive ? "sideBar" : "nonea"} >
                    <ul onClick={logout}>Logout</ul>
                    <ul onClick={() => { navigate("/addAdmin") }}>Add admin</ul>
                </div>
            </div>
        )
    };
    const UserNav = () => {
        return (
            <div>
                <nav className="navbar">
                    <div><h2><span>O</span>hinayi</h2></div>
                    <div>
                        <Icon name="cart" onClick={()=>{navigate("/purchased")}}></Icon>
                        <Link className="logout" onClick={logout}>Logout</Link>
                    </div>
                </nav>
            </div>
        )
    };

    const Option = () => {
        if (!isAuthenticated && !isAuthenticatedAndAdmin) {
            return <FirstNav />
        } else if (!isAuthenticated && isAuthenticatedAndAdmin) {
            return <AdminNav />
        } else {
            return <UserNav />
        }
    };
    console.log(isAuthenticated);
    console.log(isAuthenticatedAndAdmin);
    return (
        <Option />
    );
}

export default NavBar;