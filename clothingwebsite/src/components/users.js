import useApi from "./api";
import React, { useEffect, useState } from "react";
import "./users.css";

const Users = () => {
    const api = useApi();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/admin/getUsers");
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [api]);

    return (
        <div>
            <table className="users-table">
            <caption><h1>Users</h1></caption> {/* Main heading */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
