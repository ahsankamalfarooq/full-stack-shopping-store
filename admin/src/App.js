import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Layout from "./components/Layout";

function App() {

  // const admin = 'true'
  // JSON.parse
  // (JSON.parse(localStorage.getItem("persist:root"))
  // .user
  // )
  // .currentUser.isAdmin
  return (
    <BrowserRouter>
        <Routes>
          {/* { admin === "true" && ( */}
            {/* <>  */}

            <Route element={<Layout />} >
              <Route path="/" element = {<Home/>}/> 
              <Route path="/users" element = {<UserList/>}/> 
              <Route path="/user/:userId" element = {<User/>}/> 
              <Route path="/newUser" element = {<NewUser/>}/> 
              <Route path="/products" element = {<ProductList/>}/> 
              <Route path="/product/:productId" element = {<Product/>}/> 
              <Route path="/newproduct" element = {<NewProduct/>}/>
            </Route>
            
          {/* </> */}
            {/* ) */}
           
           {/* } */}
              <Route path="/login" element = {<Login/>}/>
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;