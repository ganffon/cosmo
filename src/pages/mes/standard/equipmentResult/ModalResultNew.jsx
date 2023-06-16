import CloseIcon from "@mui/icons-material/Close";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalResultNew.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import ButtonModule from "components/button/ButtonModule";
import InputNew from "./InputNew";
import BtnComponent from "components/button/BtnComponent";
import { useMemo } from "react";

function ModalResultNew(props) {
  const {
    width = "90%",
    height = "90%",
    onClose = () => {},
    refSelectGrid = null,
    columns = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    gridDataSelect = [],
    onMapping = () => {},
    onSaveNew = () => {},
    onSelectOrder = () => {},
    onRemoveOrder = () => {},
    onSelectMorning = () => {},
    onRemoveMorning = () => {},
    onSelectAfternoon = () => {},
    onRemoveAfternoon = () => {},
    onSelectNight = () => {},
    onRemoveNight = () => {},
    onTextChange = () => {},
    onTextChangeEdit = () => {},
    dateText = {},
    setDateText = {},
    info = {},
    emp = {},
    mainInfo = {},
    textChange = {},
    isEditMode = false,
  } = props;

  const Grid = useMemo(() => {
    return (
      <GridModal
        columns={columns}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeaders}
        refGrid={refSelectGrid}
        data={gridDataSelect}
        draggable={false}
      />
    );
  }, [gridDataSelect]);
  return (
    <ModalWrapMulti width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>
          {isEditMode ? `[일일운전점검일지 수정]` : `[일일운전점검일지 신규]`}
        </S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ContentsArea>
        <S.ButtonWrap>
          <BtnComponent
            btnName={"Mapping"}
            width={"100px"}
            onClick={onMapping}
          ></BtnComponent>

          <ButtonModule saveBtn={true} onClickSave={onSaveNew} />
        </S.ButtonWrap>
        <S.ContentsTop>
          <InputNew
            onSelectOrder={onSelectOrder}
            onRemoveOrder={onRemoveOrder}
            onSelectMorning={onSelectMorning}
            onRemoveMorning={onRemoveMorning}
            onSelectAfternoon={onSelectAfternoon}
            onRemoveAfternoon={onRemoveAfternoon}
            onSelectNight={onSelectNight}
            onRemoveNight={onRemoveNight}
            dateText={dateText}
            setDateText={setDateText}
            info={info}
            emp={emp}
            mainInfo={mainInfo}
            onTextChange={onTextChange}
            onTextChangeEdit={onTextChangeEdit}
            textChange={textChange}
            isEditMode={isEditMode}
          />
        </S.ContentsTop>
        <S.ContentsBottom>{Grid}</S.ContentsBottom>
      </S.ContentsArea>
    </ModalWrapMulti>
  );
}

export default ModalResultNew;
