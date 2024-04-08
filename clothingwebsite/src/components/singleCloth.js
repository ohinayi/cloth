import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useApi from "./api";

const Single = () => {
    const { itemId } = useParams();
    const api = useApi();
    const [item, setItem] = useState(null);
    const [similarItems, setSimilarItems] = useState([]);

    const fetchSimilarItems = useCallback(async (type) => {
        try {
            const response = await api.get("/admin");
            const similarItems = response.data.filter(item => item.type === type && item._id !== itemId); 
            setSimilarItems(similarItems);
        } catch (error) {
            console.error("Error fetching similar items:", error);
        }
    }, [api, itemId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`admin/getCloth/${itemId}`);
                setItem(response.data);
                fetchSimilarItems(response.data.type);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [api, itemId, fetchSimilarItems]); // Dependencies of useEffect

    const handlePurchase = async () => {
        try {
            if (item) {
                await api.post("user/addToStore", { id: item._id });
                console.log("success added successfully");
                window.alert("Item purchased successfully. We will send an email to you.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    if(!item){
        return<div>loading...</div>;
    }
    return (
        <div className="clothing-cards-container">
            <div className="clothing-card">
                <img src={item.path} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="prize"> Price: ${item.cost} </p>
                <button className="purchase" onClick={handlePurchase}>Purchase</button>
            </div>
            <h2 className="others">Other Similar Items</h2>
            <div className="similar-items">
                {similarItems.map(similarItem => (
                    <div key={similarItem._id} className="clothing-card">
                        <img src={similarItem.path} alt={similarItem.name} />
                        <h3>{similarItem.name}</h3>
                        <p className="prize"> Price: ${similarItem.cost} </p>
                        <button className="purchase" onClick={handlePurchase}>Purchase</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Single;
