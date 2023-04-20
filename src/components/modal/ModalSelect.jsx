import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import * as S from "./ModalSelect.styled";

function ModalSelect(props) {
  const {
    onClickModalSelectClose = () => {},
    refSelectGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
    gridDataSelect,
    onClickSelectGrid = () => {},
    onDblClickGridSelect = () => {},
  } = props;

  return (
    <ModalWrap width={"40%"} height={"90%"}>
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
      <S.GridBox>
        <GridModal
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeaders}
          refGrid={refSelectGrid}
          data={gridDataSelect}
          draggable={false}
          onClick={onClickSelectGrid}
          onDblClick={onDblClickGridSelect}
        />
      </S.GridBox>
    </ModalWrap>
  );
}

export default ModalSelect;
