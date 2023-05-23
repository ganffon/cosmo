import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalNew.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import { useMemo } from "react";
import InputPaper from "components/input/InputPaper";
import ButtonModule from "components/button/ButtonModule";

function ModalNew(props) {
  const {
    width = "80%",
    height = "90%",
    onClickModalSelectClose = () => {},
    refGridSelect = null,
    columns = [],
    columnsDetail = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    gridDataSelect = [],
    gridDataDetail = [],
    onClickSelectGrid = () => {},
    onDblClickGridSelect = () => {},
    onClickAddRow = () => {},
    onClickCancelRow = () => {},
    onClickSave = () => {},
    info = {},
  } = props;

  const GridHeader = useMemo(() => {
    return (
      <GridModal
        columns={columns}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeaders}
        refGrid={refGridSelect}
        data={gridDataSelect}
        draggable={false}
        onClick={onClickSelectGrid}
        onDblClick={onDblClickGridSelect}
      />
    );
  }, [gridDataSelect]);
  const GridDetail = useMemo(() => {
    return (
      <GridModal
        columns={columnsDetail}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeaders}
        data={gridDataDetail}
        draggable={false}
      />
    );
  }, [gridDataDetail]);

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.ContentsArea>
        <S.HeaderBox>
          <S.TitleBox>{`[포장 실적 입력]`}</S.TitleBox>
          <S.ButtonClose
            color="primary"
            aria-label="close"
            onClick={onClickModalSelectClose}
          >
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.TitleWrap height={"85px"}>
          <S.Group>
            <S.Title size={"30px"}>🔸라인</S.Title>
            <InputPaper
              height={"60px"}
              size={"30px"}
              value={info.lineNM || ""}
            />
          </S.Group>
          <S.ButtonModuleWrap>
            <ButtonModule
              addRowBtn={true}
              cancelRowBtn={true}
              saveBtn={true}
              onClickAddRow={onClickAddRow}
              onClickCancelRow={onClickCancelRow}
              onClickSave={onClickSave}
            />
          </S.ButtonModuleWrap>
        </S.TitleWrap>
        <S.TitleWrap height={"50px"}>
          <S.Title size={"20px"}>🔸투입품</S.Title>
        </S.TitleWrap>
        <S.GridBox>{GridHeader}</S.GridBox>
        <S.TitleWrap height={"50px"}>
          <S.Title size={"20px"}>🔸세부투입품</S.Title>
        </S.TitleWrap>
        <S.GridBox>{GridDetail}</S.GridBox>
      </S.ContentsArea>
    </ModalWrapMulti>
  );
}

export default ModalNew;
