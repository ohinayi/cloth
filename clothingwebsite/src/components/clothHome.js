import React, { useState, useEffect } from "react";
import useApi from "./api";
import "./clothHome.css";
import images from "./img/hero-illustration.svg";
import { Link } from "react-router-dom";

const ClothHome = () => {
    const api = useApi();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/admin");
                setItems(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [api]);
    const handlePurchase = async (id) => {
        try {
            await api.post("user/addToStore", { id });
            console.log("sucess added sucessfully");
            window.alert("Item purchased sucesfully we will send an email to you.")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="card_div">
                <div id="myDiv">
                    <img src={images} alt="imges" />
                </div>
                {items.map((item, index) => (
                    <div key={index} className="clothing-cards-container" >
                        <div className="clothing-card">
                            <Link to={`/clothHome/${item._id}`}>
                                <img src={item.path} alt={item.name} />
                            </Link>
                            <h3>{item.name}</h3>
                            <p className="prize"> Prize:${item.cost} </p>
                            <button className="purchase" onClick={() => { handlePurchase(item._id) }}>Purchase</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClothHome;
