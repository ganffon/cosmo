import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalSelectMulti.styled";
import ModalWrapMulti from "./ModalWrapMulti";

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
  return (
    <ModalWrapMulti width={width} height={height}>
      <S.ContentsArea>
        <S.HeaderBox>
          <S.TitleBox>{`[데이터 선택]`}</S.TitleBox>
          <S.ButtonClose
            color="primary"
            aria-label="close"
            onClick={onClickModalSelectClose}
          >
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.TitleWrap>
          <div>🔸투입품</div>
        </S.TitleWrap>
        <S.GridBox>
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
        </S.GridBox>
        <S.TitleWrap>
          <div>🔸세부투입품</div>
        </S.TitleWrap>
        <S.GridBox>
          <GridModal
            columns={columnsDetail}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeaders}
            data={gridDataDetail}
            draggable={false}
          />
        </S.GridBox>
      </S.ContentsArea>
    </ModalWrapMulti>
  );
}

export default ModalSelectMulti;
