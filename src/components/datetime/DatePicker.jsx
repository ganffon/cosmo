import DateTime from "components/datetime/DateTime";
import * as S from "./DatePicker.styled";
import { useEffect } from "react";

function DatePicker(props) {
  const { datePickerSet, dateText, setDateText, dateTitle = "" } = props;

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
          label={datePickerSet === "single" ? (dateTitle === "" ? "날짜" : dateTitle) : "기간"}
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
