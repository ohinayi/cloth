import React from "react";
import NavBar from "./components/navBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import newPage from "./components/newPage";
import AuthcontextProvider from "./components/authenticated";
import ClothHome from "./components/clothHome";
import AdminPage from "./components/adminPage";
import Users from "./components/users";
import BoughtItems from "./components/boughtItems";
import AddAdmin from "./components/addAdmin";
import AdminLogin from "./components/loginAdmin";
import Purchased from "./components/userPurchased";
import Single from "./components/singleCloth";

function App() {

  return (
    <div className="App">
      <Router>
        <AuthcontextProvider>

          <NavBar />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/signup" Component={Signup} />
            <Route exact path="/newPage" Component={newPage} />
            <Route exact path="/clothHome" Component={ClothHome} />
            <Route exact path="/clothHome/:itemId" Component={Single} />
            <Route exact path="/adminPage" Component={AdminPage} />
            <Route exact path="/users" Component={Users} />
            <Route exact path="/soldItems" Component={BoughtItems} />
            <Route exact path="/addAdmin" Component={AddAdmin} />
            <Route exact path="/adminLogin" Component={AdminLogin} />
            <Route exact path="/purchased" Component={Purchased} />
          </Routes>
        </AuthcontextProvider>
      </Router>

    </div>
  );
}


export default App;
//  <input
// type="text"
// value={item}
// id="item"
// onChange={(e) => setItem(e.target.value)}
// />
// <button onClick={saveItem}>submit</button>
// <ul>
// {todos.map((todo, index) => {
//   return (
//     <li key={index} id={index} onClick={() => removeList(index)}>
//       {todo}
//     </li>
//   );
// })}
// </ul> */
//   const [item, setItem] = useState("");
//   const [todos, setTodos] = useState([]);

//   const saveItem = () => {
//     setTodos([...todos, item]);
//     setItem("");
//   };

//   const removeList = (index) => {
//     const filtered = todos.filter((_, i) => i !== index);
//     setTodos(filtered);
//   