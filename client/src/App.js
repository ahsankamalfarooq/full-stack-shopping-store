import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/PrductList";
import Product from "./pages/Product";
import Register from "./pages/Register";

import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser )
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element = {<Home/>}/>
          {/* <Route path="/products" element = {<ProductList/>}/> */}
          <Route path="/products/:category" element = {<ProductList/>}/>
          <Route path="/product/:id" element = {<Product/>}/>
          <Route path="/cart" element = {<Cart/>}/> 
          <Route path="/success" element = {<Success/>}/> 
          <Route path="/login" element = {user ? <Navigate to = "/"/> : <Login/>}/>
          <Route path="/register" element = {<Register/>}/>     
    </Routes>
    </BrowserRouter>
  );
}

export default App;