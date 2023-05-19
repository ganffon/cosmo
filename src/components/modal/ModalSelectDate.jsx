import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalSelectDate.styled";
import ModalWrapMulti from "./ModalWrapMulti";
import DateRange from "components/datetime/DateRange";
import ButtonModule from "components/button/ButtonModule";

function ModalSelectDate(props) {
  const {
    width = "80%",
    height = "90%",
    onClickModalSelectDateClose = () => {},
    refSelectGrid = null,
    columns = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    gridDataSelect = [],
    onClickSelectGrid = () => {},
    onDblClickGridSelectDate = () => {},
    dateText,
    setDateText,
    onClickSearch = () => {},
  } = props;

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.ContentsArea>
        <S.HeaderBox>
          <S.TitleBox>{`[데이터 선택]`}</S.TitleBox>
          <S.ButtonClose
            color="primary"
            aria-label="close"
            onClick={onClickModalSelectDateClose}
          >
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.SearchBox>
          <DateRange
            dateText={dateText}
            setDateText={setDateText}
            onClickSearch={onClickSearch}
          />
          <ButtonModule searchBtn={true} onClickSearch={onClickSearch} />
        </S.SearchBox>
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
            onDblClick={onDblClickGridSelectDate}
          />
        </S.GridBox>
      </S.ContentsArea>
    </ModalWrapMulti>
  );
}

export default ModalSelectDate;
