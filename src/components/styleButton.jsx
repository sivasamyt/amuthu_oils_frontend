import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import * as colors from "@mui/material/colors";

const StyleButton = ({ label, handleClick, type, color, Icon, disable }) => {
  
  const selectedColor = color ? colors[color] : colors.purple;

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(selectedColor[500]),
    backgroundColor: selectedColor[500],
    "&:hover": {
      backgroundColor: selectedColor[900],
    },
  }));
  return (
    <ColorButton
      startIcon={Icon}
      variant="contained"
      onClick={handleClick && handleClick}
      type={type ? type : ""}
      disabled = {disable ?? false}
    >
      {label}
    </ColorButton>
  );
};

export default StyleButton;
