import CloseIcon from "@mui/icons-material/Close";
import GridModalSelect from "components/grid/GridModalSelect";
import ModalWrap from "components/modal/ModalWrap";
import * as S from "./ModalSelect.styled";

function ModalSelect(props) {
  const {
    onClickSelectClose,
    refSelectGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
    gridModalSelectData,
    onDblClickModalSelectGrid,
  } = props;

  return (
    <ModalWrap width={"90%"} height={"90%"}>
      <S.HeaderBox>
        <S.TitleBox>{`[데이터 선택]`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickSelectClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.GridBox>
        <GridModalSelect
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeaders}
          refGrid={refSelectGrid}
          data={gridModalSelectData}
          draggable={false}
          onDblClick={onDblClickModalSelectGrid}
        />
      </S.GridBox>
    </ModalWrap>
  );
}

export default ModalSelect;
