import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { LayoutContext } from "./Layout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import * as S from "./AvatarButton.styled";
import { Version } from "Version";
import doriFace from "img/Component/doriFace.svg";
import logout from "img/Component/avatar/logout.png";
import bookmark from "img/Component/avatar/bookmark.png";
import star from "img/Component/avatar/star.png";

function AvatarButton() {
  const { bookmarkList } = useContext(LayoutContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const openBookmark = Boolean(anchorEl2);
  const onClickAvatar = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onClickClose = () => {
    console.log("?!");
    setAnchorEl(null);
  };
  const onClickLogout = () => {
    localStorage.setItem("loginState", false);
    navigate("/login");
  };
  const onMouseOverBookmark = (e) => {
    setAnchorEl2(e.currentTarget);
  };
  const onClickFavorite = (bookmark) => {
    navigate(bookmark.path);
    setAnchorEl2(null);
    setAnchorEl(null);
  };
  const handleClose = (e) => {
    setAnchorEl2(null);
  };
  return (
    <div>
      <S.AvatarButton
        id="avatarButton"
        aria-controls={open ? "avatarMenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        src={doriFace}
        onClick={onClickAvatar}
      ></S.AvatarButton>
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
        <MenuItem
          onClick={onClickLogout}
          onMouseEnter={() => {
            console.log("?!");
          }}
        >
          <S.MenuImg src={logout} />
          Logout
        </MenuItem>
        <MenuItem onMouseEnter={onMouseOverBookmark}>
          <S.MenuImg src={bookmark} />
          즐겨찾기
          {bookmarkList.length !== 0 && (
            <Menu
              id="bookmarkMenu"
              anchorEl={anchorEl2}
              open={openBookmark}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: 10,
                horizontal: 110,
              }}
            >
              <div onMouseLeave={handleClose}>
                {bookmarkList?.map((bookmark, index) => (
                  <MenuItem key={index} onClick={() => onClickFavorite(bookmark)}>
                    <S.MenuImg src={star} className={"bookmarkImg"} />
                    {bookmark?.name}
                  </MenuItem>
                ))}
              </div>
            </Menu>
          )}
        </MenuItem>
        <S.Version>Ver.{Version}</S.Version>
      </Menu>
    </div>
  );
}

export default AvatarButton;
