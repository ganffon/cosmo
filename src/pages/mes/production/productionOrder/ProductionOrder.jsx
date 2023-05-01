import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import ProductionOrderSet from "./ProductionOrderSet";
import useInputSet from "custom/useInputSet";
import ButtonNES from "components/button/ButtonNES";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonED from "components/button/ButtonED";
import ButtonSES from "components/button/ButtonSES";
import ButtonSE from "components/button/ButtonSE";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import BackDrop from "components/backdrop/BackDrop";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as disRow from "custom/useDisableRowCheck";
import * as RE from "custom/RegularExpression";
import * as S from "./ProductionOrder.styled";

function ProductionOrder() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const refGridHeader = useRef(null);
  const refGridMid = useRef(null);
  const refGridBottom = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalMid = useRef(null);
  const refGridModalBottom = useRef(null);
  const refGridSelect = useRef(null);

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeMid, setIsEditModeMid] = useState(false);
  const [isEditModeBottom, setIsEditModeBottom] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMid, setGridDataMid] = useState(null);
  const [gridDataBottom, setGridDataBottom] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });
  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsMid,
    columnsBottom,
    columnsModalHeader,
    columnsModalMid,
    columnsModalBottom,
    inputSet,
    inputInfo,
  } = ProductionOrderSet(isEditModeHeader, isEditModeMid, isEditModeBottom);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    // actSearchHeaderDI(true, "start_date", "end_date");
  };
  const onClickNew = () => {};
  const onClickEditHeader = () => {};
  const onClickEditModeSave = () => {};
  const onClickEditModeExit = () => {};
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ContentTop>
        <S.SearchCondition>
          <S.Date
            datePickerSet={"range"}
            dateText={dateText}
            setDateText={setDateText}
          />
          {inputSet.map((v) => (
            <S.InputS
              key={v.id}
              id={v.id}
              name={v.name}
              handleInputTextChange={handleInputTextChange}
              onClickSearch={onClickSearch}
              onKeyDown={onKeyDown}
            />
          ))}
        </S.SearchCondition>
        <S.ButtonTop>
          {isEditModeHeader ? (
            <ButtonSES
              onClickEditModeSave={onClickEditModeSave}
              onClickEditModeExit={onClickEditModeExit}
              onClickSearch={onClickSearch}
            />
          ) : (
            <ButtonNEDS
              onClickNew={onClickNew}
              onClickEdit={onClickEditHeader}
              onClickSearch={onClickSearch}
            />
          )}
        </S.ButtonTop>
      </S.ContentTop>
      <S.GridTopWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsHeader}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataHeader}
          draggable={false}
          refGrid={refGridHeader}
        />
      </S.GridTopWrap>
      <S.ButtonMid>
        <ButtonED />
      </S.ButtonMid>
      <S.GridMidWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsMid}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataMid}
          draggable={false}
          refGrid={refGridMid}
        />
      </S.GridMidWrap>
      <S.ButtonBottom>
        <ButtonED />
      </S.ButtonBottom>
      <S.GridBottomWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsBottom}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataBottom}
          draggable={false}
          refGrid={refGridBottom}
        />
      </S.GridBottomWrap>
    </S.ContentsArea>
  );
}

export default ProductionOrder;
