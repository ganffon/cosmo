import React, { useEffect } from "react";
// ⬇️ import MUI
import InputAdornment from "@mui/material/InputAdornment";
// ⬇️ reference of page
import DateTime from "components/datetime/DateTime";
import * as S from "./Date.styled";

function DateRange(props) {
  const { dateText, setDateText } = props;

  useEffect(() => {
    setDateText({
      startDate: DateTime().dateFull,
      endDate: DateTime(7).dateFull,
    });
  }, []);

  const dateRangeChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <S.DateBox>
      <S.DateSingle
        id="startDate"
        type="date"
        format="yyyy-MM-dd"
        defaultValue={DateTime().dateFull}
        InputProps={{
          sx: { height: 40 },
          startAdornment: (
            <InputAdornment position="start">"기간"</InputAdornment>
          ),
        }}
        onChange={dateRangeChange}
      />

      <S.DateRange
        id="endDate"
        type="date"
        format="yyyy-MM-dd"
        defaultValue={DateTime(7).dateFull}
        InputProps={{
          sx: { height: 40 },
        }}
        onChange={dateRangeChange}
      />
    </S.DateBox>
  );
}

export default DateRange;
