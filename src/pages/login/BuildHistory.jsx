import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./BuildHistory.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";

function BuildHistory(props) {
  const { onClose = () => {} } = props;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      try {
        const result = await restAPI.get(restURI.buildReport + "?apply_fg=true");
        setHistory(result?.data?.data?.rows);
      } catch (err) {
      } finally {
      }
    }
    getHistory();
  }, []);

  return (
    <ModalWrapMulti width={"30%"} height={"80%"}>
      <S.HeaderBox>
        <S.TitleBox>Build History</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Main>
        {history.map((raw) => {
          const version = raw.version;
          const date =
            version.slice(0, 2) +
            "." +
            version.slice(2, 4) +
            "." +
            version.slice(4, 6) +
            " " +
            version.slice(6, 8) +
            ":" +
            version.slice(8, 10);
          return (
            <S.BuildWrap>
              <S.MainTitleWrap>
                <S.MainTitle>{`✔️ ${raw.title}`}</S.MainTitle>
                <S.MainDate>{`${date}`}</S.MainDate>
              </S.MainTitleWrap>
              <S.MainContents>{raw.contents}</S.MainContents>
              <S.DividingLine />
            </S.BuildWrap>
          );
        })}
      </S.Main>
    </ModalWrapMulti>
  );
}

export default BuildHistory;
