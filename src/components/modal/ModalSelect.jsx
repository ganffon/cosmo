import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import * as S from "./ModalSelect.styled";

function ModalSelect(props) {
  const {
    width = "80%",
    height = "90%",
    title = "[데이터 선택]",
    onClickModalSelectClose = () => {},
    refSelectGrid = null,
    columns = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    gridDataSelect = [],
    onClickSelectGrid = () => {},
    onDblClickGridSelect = () => {},
  } = props;

  return (
    <ModalWrap width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{title}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalSelectClose}>
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
