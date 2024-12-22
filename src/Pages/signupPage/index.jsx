import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
// import Axios from "axios";
import { useNavigate } from "react-router-dom";
// import BackButton from "../../components/homeButton";
// import SignupButton from "../../components/signupButton";
// import StyleButton from "../../components/styleButton";
import TextField from "@mui/material/TextField";
import "./styles.scss";
import StyleButton from "../../components/styleButton";
import { userSignup } from "../../Api/api";
import { toast } from "react-toastify";


const SignupPage = () => {
  const [submit, setSubmit] = useState(false);
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const nav = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data) => {
    if(submit){
     const response = await userSignup(data);
      if(response.success){
        // console.log('response of signup page',response.message);
        nav("/login", { state:{ message: response.message, type: "success" }})
      }else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };
  const username = watch("Username", "");
  const email = watch("Email", "");

  useEffect(() => {    
    username && email && cpwd && cpwd === pwd ? setSubmit(true) : setSubmit(false);
  }, [username, email, cpwd, pwd]);
  return (
    <div className="signup_page">
      <h1>Signup Form</h1>
      {/* <div className="col-sm-12"> */}
      <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <TextField
            required
            size="small"
            label="Username"
            className="form-control"
            type="text"
            {...register("Username")}
          />
        </div>
        <div className="form-group">
          <TextField
            required
            size="small"
            label="Email Id"
            className="form-control"
            type="text"
            {...register("Email")}
          />
        </div>

        <div className="form-group">
          <TextField
            required
            size="small"
            label="Password"
            className="form-control"
            type="Password"
            {...register("Password")}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <TextField
            required
            size="small"
            label="confirmPassword"
            className="form-control"
            type="text"
            onChange={(e) => {
              setCpwd(e.target.value);
            }}
          />
        </div>

        <div className="signup_buttons">
          <StyleButton label="Signup" type="submit" disable={!submit}/>
          &nbsp; &nbsp;
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
