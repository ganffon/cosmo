import React, { useRef } from "react";
import * as S from "./FdrDate.styled";

function FdrDate(props) {
  const { date = {}, setDate = () => {}, id, height = "40px", width = "300px", fontSize = "16px", label = "" } = props;

  const refDate = useRef(null);

  const dateChange = (e) => {
    setDate({ ...date, [e.target.id]: e.target.value });
  };

  return (
    <S.DateSingle
      id={id}
      type="date"
      format="yyyy-MM-dd"
      value={date[id] || ""}
      ref={refDate}
      InputProps={{
        sx: { height: height, fontSize: fontSize, fontFamily: "NotoSansKR", borderRadius: "5px" },
      }}
      width={width}
      label={label}
      onChange={dateChange}
    />
  );
}

export default FdrDate;
