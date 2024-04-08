import "./newpage.css";
import { useState } from "react";
import useApi from "./api";


const NewPage = () => {
    const [selectedType, setSelectedType] = useState("");
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [size, setSize] = useState("");
    const [file, setFile] = useState("");
    const api = useApi();


    const handleSelectChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('cost', cost);
        formData.append('size', size);
        formData.append('type', selectedType);
        try {
             await api.post('/admin/postCloth', formData, { headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
            window.alert("submitted sucessfully");
            setName.value("");
            setFile.value("");
            setCost.value("");
            setSize.value("");
           

        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <div className="body">

        <div className="addProduct">
            <h1>Add new product</h1>
            <hr />
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <input className="addInput" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                <input className="addInput" type="text" placeholder="Cost" onChange={(e) => setCost(e.target.value)}></input>
                <input className="addInput" type="text" placeholder="Size" onChange={(e) => setSize(e.target.value)}></input>
                <h2>Categories</h2>
                <div>
                    <select value={selectedType} onChange={handleSelectChange} className="dropdown">
                        <option>Type</option>
                        <option value="Shirt/Top">Shirts</option>
                        <option value="Trouser/Shorts">Trousers</option>
                        <option value="Bags/jewelries">Bags/jewelries</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                </div>
             
                <input type="file" className="file" onChange={(e)=>setFile(e.target.files[0])}></input>
                <div className="submit">
                <button className="submit">submit</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default NewPage;
