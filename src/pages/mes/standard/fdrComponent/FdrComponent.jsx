import ContentsArea from "components/layout/common/ContentsArea";
import * as S from "./FdrComponent.styled";
import FdrDate from "components/datetime/FdrDate";
import { useState } from "react";
import DateTime from "components/datetime/DateTime";

function FdrComponent(props) {
  const [date, setDate] = useState({ startDate: DateTime().dateFull, endDate: DateTime().dateFull });
  return (
    <ContentsArea>
      <S.Header>
        <FdrDate date={date} setDate={setDate} id={"startDate"} />
        <FdrDate date={date} setDate={setDate} id={"endDate"} />
      </S.Header>
    </ContentsArea>
  );
}

export default FdrComponent;
