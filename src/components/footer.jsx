import React from "react";
import background from "../pictures/img-h2.png";

function Footer() {
  const img = {
    backgroundImage: `url(${background}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="footer_page" style={img}>
      Footer
    </div>
  );
}

export default Footer;
