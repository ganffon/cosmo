import React, { useEffect, createRef } from "react";
// ⬇️ import MUI
import InputAdornment from "@mui/material/InputAdornment";
// ⬇️ reference of page
import DateTime from "components/datetime/DateTime";
import * as S from "./Date.styled";

function DateSingle(props) {
  const { dateText, setDateText } = props;

  const dateRef = createRef();

  useEffect(() => {
    setDateText({
      startDate: DateTime(-7).dateFull,
      endDate: DateTime().dateFull,
    });
  }, []);

  const dateSingleChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <S.DateBox>
      <S.DateSingle
        id="startDate"
        type="date"
        format="yyyy-MM-dd"
        defaultValue={DateTime().dateFull}
        ref={dateRef}
        InputProps={{
          sx: { height: 40 },
          startAdornment: (
            <InputAdornment position="start">"날짜"</InputAdornment>
          ),
        }}
        onChange={dateSingleChange}
      />
    </S.DateBox>
  );
}

export default DateSingle;
