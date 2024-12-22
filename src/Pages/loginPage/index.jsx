import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import Axios from "axios";
// import { tokenGet } from "../../features/token";
import { useForm } from "react-hook-form";
// import BackButton from "../../components/homeButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import "./styles.scss";
import { login } from "../../Api/api";
import useStore from "../../zustand/store";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const addUser = useStore((state) => state.addUser);
  const setAdmin = useStore((state) => state.isAdmin);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const messageState = location.state;

  useEffect(() => {
    if (messageState) {
      const { message, type } = messageState;
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      } else if (type === "warning") {
        toast.warning(message);
      }
      navigate("/login", { replace: true }); 
    }
  }, [messageState, navigate]);

  const apiCheck = async (data) => {
    try {
      const userData = await login(data);
      // console.log('user-----',userData);
      if (userData.user) {
        const user = userData.user;
        // console.log('user-----',user);
        addUser(user);
        setAdmin(user.role === "admin");
        localStorage.setItem("user", user.name);
        navigate("/");
      } else {
        setErrorMessage(userData);
      }
    } catch (e) { }
  };

  return (
    <div className="login_page">
      <h1>Login Here</h1>
      <form className="login_form" onSubmit={handleSubmit(apiCheck)}>
        <TextField required label="Email Id" {...register("Email")} />
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("Password")}
        />
        <div className="login_buttons">
          <Button startIcon={<LoginIcon />} variant="contained" type="submit">
            Login
          </Button>
        </div>
      </form>
      {errorMessage && <p className="error_message">{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
