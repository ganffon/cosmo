import React from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ import MUI
import Button from "@mui/material/Button";
// ⬇️ reference of page
import Character from "img/NotFound/Character03.svg";
import * as S from "./NotFound.styled";

const NotFound = () => {
  const navigate = useNavigate();
  const onClickHome = () => {
    const state = localStorage.getItem("loginState");
    if (state === "false") {
      navigate("/login");
    } else {
      navigate("/mes");
    }
  };

  return (
    <S.Container>
      <img src={Character} />
      <S.Title>Not Found Error: 404</S.Title>
      <S.Subtitle>
        페이지를 찾을 수 없습니다.
        <br />
        존재하지 않거나, 사용할 수 없는 페이지입니다.
      </S.Subtitle>
      <S.Description>입력한 주소가 정확한지 다시 확인해주세요.</S.Description>

      <Button
        id="notFoundBtn"
        variant="outlined"
        onClick={onClickHome}
        sx={{
          height: "40px",
          width: "100px",
          marginTop: "50px",
        }}
      >
        돌아가기
      </Button>
    </S.Container>
  );
};

export default NotFound;
