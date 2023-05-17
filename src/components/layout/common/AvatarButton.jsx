import React, { useState } from "react";
import Cookies from "js-cookie";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import * as S from "./AvatarButton.styled";

const avatarCharacter = (loginID) => {
  return loginID.charAt(0).toUpperCase();
};

function AvatarButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const onClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    localStorage.setItem("loginState", false);
    navigate("/login");
  };

  return (
    <div>
      <S.AvatarButton
        id="avatarButton"
        aria-controls={open ? "avatarMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={onClickAvatar}
      >
        {avatarCharacter(Cookies.get("loginID") ? Cookies.get("loginID") : "A")}
      </S.AvatarButton>
      <Menu
        id="avatarMenu"
        aria-labelledby="avatarButton"
        anchorEl={anchorEl}
        open={open}
        onClose={onClickClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={onClickLogout}>📴 Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default AvatarButton;
