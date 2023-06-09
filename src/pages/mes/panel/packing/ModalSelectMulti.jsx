import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalSelectMulti.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import { useMemo } from "react";

function ModalSelectMulti(props) {
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
          <S.TitleBox>{`[일일포장일지]`}</S.TitleBox>
          <S.ButtonClose
            color="primary"
            aria-label="close"
            onClick={onClickModalSelectClose}
          >
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.TitleWrap>
          <div>🔸계량/투입</div>
        </S.TitleWrap>
        <S.GridBox>{GridHeader}</S.GridBox>
        <S.TitleWrap>
          <div>🔸세부 계량/투입</div>
        </S.TitleWrap>
        <S.GridBox>{GridDetail}</S.GridBox>
      </S.ContentsArea>
    </ModalWrapMulti>
  );
}

export default ModalSelectMulti;
