import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import * as S from "./AvatarButton.styled";
import { Version } from "Version";
import doriFace from "img/Component/doriFace.svg";

const avatarCharacter = (loginID) => {
  return loginID.charAt(0).toUpperCase();
};

function AvatarButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [openChild, setOpenChild] = useState(false);
  const onClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);
  const addBookmark = (newBookmarkName, newBookmarkUri) => {
    const newBookmark = { name: newBookmarkName, uri: "/mes/line-dept" };
    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };
  const onClickLogout = () => {
    localStorage.setItem("loginState", false);
    navigate("/login");
  };
  const onMouseOverEvent = (e) => {
    setAnchorEl2(e.currentTarget);
    setOpenChild(true);
  };
  const onClickFavorite = (bookmark) => {
    navigate(bookmark.uri);
    setOpenChild(false);
  };
  const handleClose = (e) => {
    setOpenChild(false);
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
        <MenuItem onClick={onClickLogout}>📴 Logout</MenuItem>
        <MenuItem onMouseOver={onMouseOverEvent} onMouseLeave={handleClose}>
          즐겨찾기
          <Menu
            id="simple-menu"
            anchorEl={anchorEl2}
            open={openChild}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: -10,
              horizontal: 100,
            }}
          >
            <MenuItem onClick={() => addBookmark("새로운 즐겨찾기")}>즐겨찾기 추가</MenuItem>
            {bookmarks?.map((bookmark, index) => (
              <MenuItem key={index} onClick={() => onClickFavorite(bookmark)}>
                {bookmark?.name}
              </MenuItem>
            ))}
          </Menu>
        </MenuItem>
        <S.Version>Ver.{Version}</S.Version>
      </Menu>
    </div>
  );
}

export default AvatarButton;
