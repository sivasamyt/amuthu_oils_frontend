import React, { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import { getCartItems, placeOrder, removeCartItem } from "../../Api/api";
import "./styles.scss";
import StyleButton from "../../components/styleButton";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [items, setItems] = useState([]);
  // const [total, setTotal] = useState(0);
  const [cartValue, setcartValue] = useState(0);
  const nav = useNavigate();
  const user = useStore((state) => state.user);
  const fetchCartItems = async (userId) => {
    try {
      const allItems = await getCartItems(userId);
      // console.log(allItems);
      if (allItems) {
        setItems(allItems.cart_items);
        setcartValue(allItems.cart_value);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const removeItem = await removeCartItem(itemId);
      // console.log('removeItem=---',removeItem);
      if(removeItem.success){
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      }
      
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handlePlaceOrder = async () =>{
    // console.log('order placed');
    const cartIds = items.map((item) => item.id);
    const userId= user.id;
   const orderPlaced = await placeOrder(cartIds, cartValue,userId);
   if(orderPlaced.success){
    nav("/");
  }
  }

  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    }
  }, [user]);
  useEffect(() => {
    let total = 0;
    if (items) {
      items.map((item)=>{
        total += item.product.cart_price;
      })
    };
    if(total != cartValue){
      setcartValue(total);
    }
    // console.log('total--------',total);
    // console.log('cartValue-----',cartValue);
 
  }, [items]);

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {items.length > 0 ? (
        <div>
          <div className="cart-container">
            {items.map((item) => (
              <div className="cart-items" key={item.id}>
                <div className="cart-item">
                  <h3>{item.product.name}</h3>
                  <div className="cart-item-details">
                    <img className="images" src={item.product.image} alt="product" />
                    <div>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total Price: {item.product.cart_price} Rs</p>
                    </div>
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}> Remove </button>
              </div>
            ))}
          </div>
            <h3>Total Amount {cartValue}</h3>
            <StyleButton type={'submit'} label={'Place Order'} color={'green'} handleClick={handlePlaceOrder} />
        </div>
      ) : (
        <p>No item added in Your cart.</p>
      )}
    </div>
  );
};
export default CartPage;