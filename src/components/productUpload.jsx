import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./styles.scss";
import StyleButton from "./styleButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { HighlightOffRounded } from "@mui/icons-material";
import axios from "axios";
import { imgBBImageUpload, productUpload } from "../Api/api";

const ProductUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageView, setImageView] = useState(null);

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedFile(file);
          setImageView(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImageView("Image property");
      }
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (selectedFile) {
      const image = new FormData();
      image.append("image", selectedFile);
      try {
        const response = await imgBBImageUpload(image);
        const imageUrl = response.data.data.url;
        formData.append("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    formData.append("productName", data.ProductName);
    formData.append("Description", data.Description);
    formData.append("Quantity", data.Quantity);
    formData.append("imageName", data.Image[0].name);
    try {
        const response = await productUpload(formData);
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  };
  const closeImage = () => {
    setImageView(null);
    setValue("Image", null);
  };

  return (
    <div className="productUploadPage">
      <h1>Product Upload</h1>
      <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <TextField
            required
            size="small"
            label="ProductName"
            className="form-control"
            type="text"
            {...register("ProductName")}
          />
        </div>
        <div className="form-group">
          <TextField
            required
            size="small"
            label="Product Description"
            className="form-control"
            type="text"
            {...register("Description")}
          />
        </div>

        <div className="form-group">
          <OutlinedInput
            required
            endAdornment={<InputAdornment position="end">L</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            type="Number"
            {...register("Quantity")}
          />
          <FormHelperText>Quantity</FormHelperText>
        </div>
        <div className="form-group">
          <input
            required
            type="file"
            {...register("Image", { onChange: handleFileChange })}
          />
        </div>
        {imageView ? (
          <div className="imageView">
            <img src={imageView} alt="Uploaded" style={{ maxWidth: "25%" }} />
            <HighlightOffRounded onClick={() => closeImage()} />
          </div>
        ) : (
          <div>Product Image Not Selected</div>
        )}
        <div>
          <StyleButton label="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
