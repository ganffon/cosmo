import React, { useEffect, createRef } from "react";
// ⬇️ import MUI
import InputAdornment from "@mui/material/InputAdornment";
// ⬇️ reference of page
import DateTime from "components/datetime/DateTime";
import * as S from "./DownTimeInput.styled";

function DateSingle(props) {
  const { dateText = {}, setDateText = () => {}, id } = props;

  const refDate = createRef();

  const dateSingleChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <S.DateBox>
      <S.DateSingle
        id={id}
        type="date"
        format="yyyy-MM-dd"
        defaultValue={DateTime().dateFull}
        value={dateText[id] || ""}
        ref={refDate}
        InputProps={{
          sx: { height: 90, fontSize: "35px", fontFamily: "NotoSansKR_B" },
        }}
        onChange={dateSingleChange}
      />
    </S.DateBox>
  );
}

export default DateSingle;
