import React, { useEffect, useState } from "react";
import { addCartItems, productsList } from "../Api/api";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import StyleButton from "../components/styleButton";
import useStore from "../zustand/store";


function LandingPage() {
  const [productList, setProductList] = useState();
  const [singleProductView, setSingleProductView] = useState(false);
  const [product, setProduct] = useState();
  const [nos, setNos] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const nav = useNavigate();
  const user=useStore(state=>state.user);
  const productsData = async () => {
    // console.log('entry');
    const products = await productsList();
    // console.log('entry-2');
    setProductList(products?.data);
    // console.log('entry-3');
  };

  const singleProduct = async (id) => {
    const product = await productsList(id);
    // console.log(product);
    setSingleProductView(true);
    setProduct(product?.data);
    setBasePrice(product?.data?.price)
    setAmount(product?.data?.price)
    setNos(1);
  }
  const closePopup = () => {
    setSingleProductView(false);
    setProduct(null);
  };
  const handleIncrement = () => {
    setNos((prevNos) => prevNos + 1);
  };
  const handleDecrement = () => {
    if (nos > 1) {
      setNos((prevNos) => prevNos - 1);
    }
  };
  const handleAddToCart = async() => {
    if(!user){
      nav("/login");
    }else{
      const cartItem = {
        userId : user.id,
        productId: product.id,
        quantity: nos,
      };
      const cartItemMessage = await addCartItems(cartItem);
      // console.log('cartItemMessage-----',cartItemMessage);
      if (cartItemMessage?.success) {
        // console.log("Item added to cart successfully:", cartItemMessage);
        closePopup();
      } else {
        console.error("Failed to add item to cart:", cartItemMessage?.message || "Unknown error");
      }
    }
  };
  useEffect(() => {
    productsData();
  }, []);
  useEffect(() => {
    let total = nos * basePrice;
    setAmount(total);
  }, [nos]);
  return (


    <div className="landingPage">
      <h1>Amuthu Oils</h1>
      <div className="allProducts">
        {productList?.map((product) => (
          <div
            className="container"
            onClick={() => { singleProduct(product.id) }}>
            <h3>{product.name}</h3>
            <span className="imgContain">
              <img className="images" src={product.image} alt="product" />
            </span>
            <p>{product.description}</p>
            <h4>Quantity: {product.quantity}L</h4>
            <h4 className="price">{product.price} Rs</h4>
          </div>
        ))}
      </div>
      {singleProductView && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closePopup}>
              &times;
            </span>
            <h2>{product.name}</h2>
            <img className="images" src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <div className="modal-quantity">
            <h4>Quantity: {product.quantity}L</h4>
            <div className="quantity-controls">
            <h3>Nos </h3>
                <button onClick={handleDecrement}>-</button>
                <span>{nos}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
            </div>
            <h4>Price: <span className="price">{amount} Rs</span></h4>
            <StyleButton color="green" label={"Add to cart"} handleClick={handleAddToCart}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
