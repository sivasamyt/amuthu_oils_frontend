import React from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const imgBBImageUpload = async (image) => {
  const apiKey = "14a6f263bf36af5e41ac28530d9230f0";
  try {
    const result = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      image
    );
    return result;
  } catch (error) {
    return "image not uploaded";
  }
};

export const productUpload = async (formData) => {
  try {
    await axios
      .post(`${BASE_URL}/uploadProduct`, formData)
      .then((response) => {
        // console.log('response----',response);
        
        console.log("Product uploaded successfully:", response.data);
      });
  } catch (error) {
    console.error("Product uploading image:", error);
  }
};

export const productsList = async (id = '') => {
  try {
    // console.log('id----',id);
    let products;
    if (id) {
      // console.log('if entry');
      products = await axios.get(`${BASE_URL}/Product/${id}`);
    } else {
      // console.log('else entry');
      products = await axios.get(`${BASE_URL}/Product`);
    }
    // console.log('entry', products);
    return products;
  } catch (error) {
    return console.log(error);
  }
};

export const userSignup = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, user);
    if (response.data) {
      return response.data; 
    }
  } catch (error) {
    return { error: "User Signup error:", message: error.message };
  }
};

export const login = async (data) => {
  try {
    const user = await axios.post(`${BASE_URL}/login`, data);
    // const user = await axios.post("https://appsail-50024119671.development.catalystappsail.in/api/login", data);
    return user.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // console.error("Wrong password");
        return "Incorrect password. Please try again.";
      } else if (error.response.status === 404) {
        // console.error("User not found");
        return "User not found. Please check your email.";
      } else {
        return "An unexpected error occurred. Please try again later.";
        // console.error("An error occurred:", error.response.data.message);
      }
    } else {
      return "Unable to connect to the server. Check your internet connection.";
      // console.error("Unable to connect to the server");
    }
  }
};
export const addCartItems = async (cartItems) => {
  try {
    const addCartResponse = await axios
      .post(`${BASE_URL}/addCart`, cartItems);
    if (addCartResponse) {
      // console.log("Item added in cart successfully:", addCartResponse.data.success);
      return addCartResponse.data;
    }
  } catch (error) {
    console.error("Error cart item add api:", error);
  }
}
export const getCartItems = async (userId) => {
  try {
    const cartItems = await axios.get(`${BASE_URL}/getCart/${userId}`);
    // console.log('cartItems-----',cartItems.data.cart_items);
    if (cartItems) {
      // console.log(cartItems.data);
      return cartItems.data;
    }
  } catch (error) {
    console.error("Error cart item get api:", error);
  }
}
export const removeCartItem = async (itemId) => {
  try {
    const removeItem = await axios.put(`${BASE_URL}/remove_item/${itemId}`);
    //  console.log('cartItems-----',removeItem);
    if (removeItem.data.success) {
      return removeItem.data;
    }
  } catch (error) {
    console.error("Error cart item get api:", error);
  }
}
export const placeOrder = async (cartIds, amount, userId) => {
  try {
    const payload = {
      cartIds,
      amount,
      userId,
    };
    // console.log('payload-----',payload);
    const orderPlaced = await axios.post(`${BASE_URL}/place_order/`, payload);
    //  console.log('orderPlaced in api page',orderPlaced);
    if (orderPlaced.data.success) {
      return orderPlaced.data;
    }
  } catch (error) {
    console.error("Error cart item get api:", error);
  }
}
export const ordersList = async () => {
  try {
    const orders = await axios.get(`${BASE_URL}/orders`);
    return orders;
  } catch (error) {
    return console.log(error);
  }
};

function Api() {
  return <div>Api</div>;
}

export default Api;
