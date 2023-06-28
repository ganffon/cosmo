import DateTime from "components/datetime/DateTime";
import * as S from "./DatePicker.styled";
import { useEffect } from "react";

function DatePicker(props) {
  const { datePickerSet, dateText, setDateText } = props;

  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <S.DatePickerBox>
      {datePickerSet === null ? null : (
        <S.DatePicker1
          id="startDate"
          className="date"
          type="date"
          format="yyyy-MM-dd"
          defaultValue={datePickerSet === "single" ? DateTime().dateFull : DateTime(-7).dateFull}
          InputProps={{ sx: { height: 40 } }}
          label={datePickerSet === "single" ? "날짜" : "기간"}
          // InputProps={{
          //   sx: { height: 40 },
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       {datePickerSet === "single" ? "날짜" : "기간"}
          //     </InputAdornment>
          //   ),
          // }}
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
