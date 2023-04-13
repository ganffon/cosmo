import CloseIcon from "@mui/icons-material/Close";
import GridModalPopup from "components/grid/GridModalPopup";
import ModalWrap from "components/modal/ModalWrap";
import * as S from "./ModalPopup.styled";

function ModalPopup(props) {
  const {
    onClickModalPopupClose,
    refModalPopupGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
    gridModalPopupData,
    onClickModalPopupGrid,
    onDblClickModalPopupGrid,
  } = props;

  return (
    <ModalWrap width={"90%"} height={"90%"}>
      <S.HeaderBox>
        <S.TitleBox>{`[데이터 선택]`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalPopupClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.GridBox>
        <GridModalPopup
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeaders}
          refGrid={refModalPopupGrid}
          data={gridModalPopupData}
          draggable={false}
          onDblClick={onDblClickModalPopupGrid}
        />
      </S.GridBox>
    </ModalWrap>
  );
}

export default ModalPopup;
