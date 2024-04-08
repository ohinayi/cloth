import React, { useState, useEffect } from "react";
import useApi from "./api";
import "./adminPage.css";
import { Icon } from "semantic-ui-react";

const AdminPage = () => {
    const api = useApi();
    const [items, setItems] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        name: "",
        cost: "",
        size: ""
    });
    const handleSelectChange = (event) => {
        setSelectedType(event.target.value);
    };
    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        console.log(item)
    };
    const handleClick = async (id) => {
        console.log(id);
        await api.delete("/admin/deleteCloth", { data: { id } });
        window.location.reload();
    };
    const handleTimes = () => {
        setIsModalOpen(false);
    }
    const handleSubmitUpdate =  (selectedItem) => {
        try {
            const formData = {
                "id":selectedItem._id,
                "name":selectedItem.name,
                "cost":selectedItem.cost,
                "size":selectedItem.size,
                "type":selectedType
            };
            console.log(formData);
            api.put("/admin/updateCloth", formData);
            window.location.reload();
            console.log(formData);
        }
        catch (error) {
            console.log(error)
        }
    };


    // functiion to gett all items
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

    // function to delete item on click delete button

    return (
        <div className="adminDiv">
            <div className={isModalOpen ? "show" : "notshow"}>
                <div className="updateBox">
                    <Icon name="times" onClick={handleTimes} />
                    <h1>Update File</h1>
                    {selectedItem && (
                        <>
                            <label>Name:</label>
                            <input type="text" placeholder="Name" className="update" value={selectedItem.name || ""} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
                            <label>Cost:</label>
                            <input type="text" placeholder="Cost" className="update" value={selectedItem.cost || ""} onChange={(e) => setSelectedItem({ ...selectedItem, cost: e.target.value })} />
                            <label>Size:</label>
                            <input type="text" placeholder="Size" className="update" value={selectedItem.size || ""} onChange={(e) => setSelectedItem({ ...selectedItem, size: e.target.value })} />
                            <select value={selectedType} onChange={handleSelectChange} className="dropdown" >
                                <option>Type</option>
                                <option value="Shirt/Top">Shirts</option>
                                <option value="Trouser/Shorts">Trousers</option>
                                <option value="Bags/jewelries">Bags/jewelries</option>
                                <option value="Shoes">Shoes</option>
                            </select>
                            <button onClick={() => { handleSubmitUpdate(selectedItem) }}>Update</button>
                        </>
                    )}
                </div>

            </div>

            {/* Items */}
            {items.map((item, index) => (
                <div key={index} className="admincard-container">
                    <div className="admincard">
                        <img src={item.path} alt={item.name} key={item._id} />
                        <h1 className="Aitemname">{item.name}</h1>
                        <p className="Aprize"> Prize:${item.cost} </p>
                        <p className="Atype">Type:{item.type}</p>
                        <p className="Asize">Size:{item.size}</p>
                        <button className="Adelete" onClick={() => handleClick(item._id)}>
                            Delete
                        </button>
                        <button className="Aupdate" onClick={() => { handleUpdateClick(item) }}>
                            Update
                        </button>
                        <p className="Adate">Created At:{item.createdAt}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;
