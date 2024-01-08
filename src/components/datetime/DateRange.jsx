import React, { useEffect } from "react";
// ⬇️ import MUI
import InputAdornment from "@mui/material/InputAdornment";
// ⬇️ reference of page
import DateTime from "components/datetime/DateTime";
import * as S from "./Date.styled";

function DateRange(props) {
  const { title = "기간", dateText, setDateText, onClickSearch = () => {} } = props;

  useEffect(() => {
    setDateText({
      startDate: DateTime(-7).dateFull,
      endDate: DateTime().dateFull,
    });
  }, []);

  const dateRangeChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <S.DateBox>
      <S.DateSingle
        id="startDate"
        type="date"
        format="yyyy-MM-dd"
        defaultValue={DateTime(-7).dateFull}
        InputProps={{
          sx: { height: 40 },
          startAdornment: <InputAdornment position="start">{title}</InputAdornment>,
        }}
        onChange={dateRangeChange}
        onKeyPress={onKeyPress}
      />

      <S.DateRange
        id="endDate"
        type="date"
        format="yyyy-MM-dd"
        defaultValue={DateTime().dateFull}
        InputProps={{
          sx: { height: 40 },
        }}
        onChange={dateRangeChange}
        onKeyPress={onKeyPress}
      />
    </S.DateBox>
  );
}

export default DateRange;
