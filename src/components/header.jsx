import React, { useEffect, useState } from "react";
import "./styles.scss";
import background from "../pictures/image-header-bg.jpg";
import { useNavigate } from "react-router-dom";
import logo from "../pictures/amuthu.jpg";
import PersonIcon from "@mui/icons-material/Person";
import useStore from "../zustand/store";
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  const navigate = useNavigate();
  const img = {
    backgroundImage: `url(${background}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
const user=useStore(state=>state.user);
const admin=useStore(state=>state.admin);
const removeUser = useStore(state => state.removeUser);
const nav = useNavigate();
  const logout = () => {
    localStorage.clear();
    removeUser();
    nav("/login", { state: "User Successfully Logged Out" });
  };
  return (
    <div className="header_page" style={img}>
      <img className="logo" src={logo} alt="icon" onClick={()=>navigate("/")}/>
      <b>Amuthu Oils</b>
      {/* <div><HomeIcon /></div> */}
      <div className="home_icon" onClick={() => navigate("/")}>
        <HomeIcon/>
      </div>
      <div className="header_buttons">
        {user ? (
          <>
           <div className="user_logo">
          <PersonIcon className="user_icon"/>
            <p>{user.name}</p>
          </div>
            <button onClick={logout}>Logout</button>
            </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
        {admin && <div><button onClick={() => navigate("/productInsert")}>New Product</button></div>}
        {!user && <div><button onClick={() => navigate("/signup")}>Signup</button></div>}
        {user &&<div><button onClick={() => navigate("/cart")}>Cart</button></div>}
      </div>
    </div>
  );
};

export default Header;
