import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/landingPage";
import Header from "./components/header";
import Footer from "./components/footer";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import ProductUpload from "./components/productUpload";
import TestPage from "./testPage";
import OrdersPage from "./Pages/ordersPage";
import SingleProductPage from "./Pages/singleProduct";
import CartPage from "./Pages/cartPage";

function App() {
  return (
    <div className="App">
    {<Header/>}
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/productInsert" element={<ProductUpload />} />
      {/* <Route path="/test" element={<TestPage />} /> */}
      <Route path="/orders" element={<OrdersPage />} />
      {/* <Route path="/singleProduct/{id}" element={<SingleProductPage />} /> */}
      <Route path="/cart" element={<CartPage />} />







    </Routes>
    {<Footer/>}
    </div>
  );
}

export default App;
