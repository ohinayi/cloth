import React, { useEffect, useState } from "react";
import useApi from "./api";
import "./boughtItem.css";

const Purchased = () => {
    const [items, setItems] = useState([]);
    const api = useApi();

    useEffect(() =>{
        const fetchData = async() => {
            const response = await api.get("/user/store");
            setItems(response.data);
        }
        fetchData();
    },[api]);
 

    return (
        <div>
            <table className="items-table">
            <caption><h1>Purchased Products</h1></caption> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Id</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>My Address</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item._id}</td>
                            <td>{item.type}</td>
                            <td>{item.cost}</td>
                            <td>{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Purchased;
