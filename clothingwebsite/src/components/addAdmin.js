import { useContext, useState } from "react";
import useApi from "./api";
import { authcontext } from "./authenticated";

const AddAdmin = () => {
    const api = useApi();
    const {authenticateAdmin} = useContext(authcontext);
    const [newData, setNewData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [repeat, setRepeat] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!newData.email || !newData.name || !newData.password){
            return window.alert("All fields are required");
        }
        if (newData.password === repeat) {
            try {
                await api.post("/admin/create", newData)
                console.log(newData);
                window.location.reload();
                authenticateAdmin();

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
    return (
        <div>
            <div className="signupbody">
                <div className="signup-container">
                    <h2>Add To Admin</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="text">Name:</label>
                        <input type="text" id="name" name="Fullname" onChange={(e) => { setNewData({ ...newData, name: e.target.value }) }} />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" onChange={(e) => { setNewData({ ...newData, email: e.target.value }) }} />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={(e) => { setNewData({ ...newData, password: e.target.value }) }} />

                        <label htmlFor="password">Repeat Password:</label>
                        <input type="password" id="Repeat_password" name="Repeat_password" value={repeat} onChange={(e) => { setRepeat(e.target.value) }} />

                        <button type="submit">Add New Admin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAdmin;