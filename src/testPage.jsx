import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import "./App.css";


const TestPage = () => {
  const [imageList, setImageList] = useState([]);
  // const products=null;

const apiData =async()=>{
  console.log("api hit now");
  var products= await axios.get("http://127.0.0.1:8000/api/Product");
  setImageList(products.data);
  console.log("productsproductsproductsproductsproducts ",products.data[0].image);
}
  return (
    <div className="maincontainer">
      <button onClick={apiData}>click</button>
      {imageList.map((img)=>{
        return(
          <>
          <h1>{img.name}</h1>
          <img src={img.image} alt="image" />
          </>
        )
      })}
    </div>
  );
};

export default TestPage;
