import React, { useContext, useEffect, createRef } from "react";
// ⬇️ import MUI
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// ⬇️ reference of page
import { SearchBarBoxContext } from "./SearchBarBox";
import DateTime from "components/datetime/DateTime";
import * as S from "./DatePicker.styled";

function DatePicker(props) {
  const { datePickerSet } = props;
  const { dateText, setDateText } = useContext(SearchBarBoxContext);

  const dateRef = createRef();

  useEffect(() => {
    setDateText({
      startDate: DateTime(-7).dateFull,
      endDate: DateTime().dateFull,
    });
  }, []);

  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <S.DatePickerBox>
      {datePickerSet === null ? null : (
        <S.DatePicker1
          id="startDate"
          type="date"
          format="yyyy-MM-dd"
          defaultValue={DateTime(-7).dateFull}
          ref={dateRef}
          InputProps={{
            sx: { height: 40 },
            startAdornment: (
              <InputAdornment position="start">
                {datePickerSet === "single" ? "날짜" : "기간"}
              </InputAdornment>
            ),
          }}
          onChange={datePickerChange}
        />
      )}
      {datePickerSet === null ? null : datePickerSet === "range" ? (
        <S.DatePicker2
          id="endDate"
          type="date"
          format="yyyy-MM-dd"
          defaultValue={DateTime().dateFull}
          InputProps={{
            sx: { height: 40 },
          }}
          onChange={datePickerChange}
        />
      ) : null}
    </S.DatePickerBox>
  );
}

export default DatePicker;
