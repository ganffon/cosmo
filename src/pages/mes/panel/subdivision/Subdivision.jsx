import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionSet from "./SubdivisionSet";
import useInputSet from "custom/useInputSet";
import ButtonNES from "components/button/ButtonNES";
import ButtonNED from "components/button/ButtonNED";
import ButtonSES from "components/button/ButtonSES";
import ButtonSE from "components/button/ButtonSE";
import InputPaper from "components/input/InputPaper";
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
import * as S from "./Subdivision.styled";

function Subdivision() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [inputInfoValue, setInputInfoValue] = useState([]);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);
  const [headerClickRowKey, setHeaderClickRowKey] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    inputSet,
    inputInfo,
  } = SubdivisionSet(isEditModeHeader, isEditModeDetail, isNewDetail);

  const SWITCH_NAME_01 = "Subdivision";
  const SWITCH_NAME_02 = "SubdivisionDetail";
  let modalDetailClickRowKey = null;

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const refGridSelect = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const [comboValue, setComboValue] = useState({});

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refGridHeader
  );
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(
    isEditModeDetail,
    refGridDetail
  );

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  useEffect(() => {
    actSearchHeaderDI(true, "start_date", "end_date");
  }, []);

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  ); //➡️ Modal Select Search Prod

  const [actSave] = uSave.useSaveMulti(
    refGridModalHeader,
    refGridModalDetail,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    SWITCH_NAME_02,
    restURI.Subdivision
  );
  const [actSearchHeaderDI] = uSearch.useSearchHeaderDI(
    refGridHeader,
    refGridDetail,
    setInputInfoValue,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    dateText,
    setGridDataHeader,
    disRowHeader,
    setDisRowHeader,
    restURI.Subdivision
  );

  const [actSearchDetail] = uSearch.useSearchDetail(
    setGridDataDetail,
    restURI.SubdivisionDetailID,
    disRowDetail,
    setDisRowDetail
  );
  const [actDeleteDetailDateRange] = uDelete.useDeleteDetailDateRange(
    refGridDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    actSearchHeaderDI,
    actSearchDetail,
    headerClickRowID,
    restURI.SubdivisionDetail,
    SWITCH_NAME_02
  );

  const [actSearchEditHeader] = uSearch.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    restURI.Subdivision
  );
  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.Subdivision
  );
  const [actEditDetail] = uEdit.useEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.SubdivisionDetail
  );

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current]);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridDetail.current]);

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEditHeader = () => {
    setIsEditModeHeader(true);
    setDisRowHeader(!disRowHeader);
  };
  const onClickEditModeSave = () => {
    actEditHeader();
    setIsEditModeDetail(false);
  };
  const onClickEditModeExit = () => {
    setIsEditModeHeader(false);
    actSearchHeaderDI(false, "start_date", "end_date");
    setDisRowHeader(!disRowHeader);
  };
  const onClickSearch = () => {
    actSearchHeaderDI(true, "start_date", "end_date");
  };
  const onClickModalAddRow = () => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    Header?.finishEditing();
    Detail?.finishEditing();
    Detail?.appendRow();
    if (isNewDetail === true) {
      for (let i = 0; i < Detail.store.viewport.rows.length; i++) {
        Detail?.setValue(
          Detail.store.viewport.rows[i].rowKey,
          "insp_document_id",
          Header.getValue(0, "insp_document_id")
        );
      }
    }
  };
  const onClickGridModalDetail = (e) => {
    modalDetailClickRowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    const gridEvent = refGridModalDetail?.current?.gridInst;
    gridEvent?.removeRow(modalDetailClickRowKey);
    modalDetailClickRowKey = null;
  };
  const onClickModalSave = () => {
    actSave();
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setIsNewDetail(false);
    setIsEditModeHeader(false);
    actSearchHeaderDI(true, "start_date", "end_date");
  };
  const onDblClickGridModalHeader = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onEditingFinishGridModalDetail = (e) => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    if (Condition(e, ["subdivision_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridModalDetail, "subdivision_time");
    }
    if (Condition(e, ["before_qty"])) {
      const beforeQty = e?.value;
      const afterQty = Detail.getValue(e?.rowKey, "after_qty");
      if (afterQty) {
        Detail?.setValue(e?.rowKey, "qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "qty", beforeQty);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridModalDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "qty"));
      }
      Header?.setValue(0, "total_qty", totalQty);
    }
    if (Condition(e, ["after_qty"])) {
      const beforeQty = Detail.getValue(e?.rowKey, "before_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Detail?.setValue(e?.rowKey, "qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "qty", -e?.value);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridModalDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "qty"));
      }
      Header?.setValue(0, "total_qty", totalQty);
    }
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameProd = ["prod_id", "prod_cd", "prod_nm"];
    const columnNameInspItem = [
      "insp_item_type_id",
      "insp_item_type_nm",
      "insp_item_id",
      "insp_item_nm",
    ];

    if (dblClickGrid === "Search") {
      setInputSearchValue([]);
      columnName = ["prod_cd", "prod_nm"];
      for (let i = 0; i < columnName.length; i++) {
        setInputSearchValue((prevList) => {
          return [
            ...prevList,
            e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]],
          ];
        });
      }
    } else {
      if (dblClickGrid === "Header") {
        refGrid = refGridHeader;
        columnName = columnNameProd;
      } else if (dblClickGrid === "ModalHeader") {
        refGrid = refGridModalHeader;
        columnName = columnNameProd;
      } else if (dblClickGrid === "Detail") {
        refGrid = refGridDetail;
        columnName = columnNameInspItem;
      } else if (dblClickGrid === "ModalDetail") {
        refGrid = refGridModalDetail;
        columnName = columnNameProd;
      }
      for (let i = 0; i < columnName.length; i++) {
        refGrid?.current?.gridInst?.setValue(
          dblClickRowKey,
          columnName[i],
          e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
        );
      }
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    }
    setIsModalSelectOpen(false);
  };
  const onClickGridHeader = (e) => {
    if (!isEditModeHeader) {
      const inputInfoValueList = [
        "reg_date",
        "prod_cd",
        "prod_nm",
        "lot_no",
        "total_qty",
        "remark",
      ];
      const rowID = e?.instance.getValue(e?.rowKey, "work_subdivision_id");
      if (rowID !== null) {
        setInputInfoValue([]);
        setHeaderClickRowID(rowID);
        setHeaderClickRowKey(e?.rowKey);
        actSearchDetail(rowID);
        for (let i = 0; i < inputInfoValueList.length; i++) {
          let data = e?.instance.getValue(e?.rowKey, inputInfoValueList[i]);
          if (data === false) {
            //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
            data = "false";
          }
          setInputInfoValue((prevList) => {
            return [...prevList, data];
          });
        }
      }
    }
  };
  const onClickEditSaveDetail = () => {
    actEditDetail();
  };
  const onClickEditExitDetail = () => {
    setIsEditModeDetail(false);
    actSearchDetail(headerClickRowID);
    setDisRowDetail(!disRowDetail);
  };
  const onClickEditNew = () => {
    if (refGridDetail?.current?.gridInst?.getRowCount() !== 0) {
      setIsNewDetail(true);
      setIsModalOpen(true);
      actSearchEditHeader(headerClickRowID);
    }
  };
  const onClickEditDetail = () => {
    setIsEditModeDetail(true);
    setDisRowDetail(!disRowDetail);
  };
  const onClickDelete = () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridDetail = (e) => {
    if (Condition(e, ["subdivision_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridDetail, "subdivision_time");
    }
    disRow.handleEditingFinishGridCheck(e);

    const Header = refGridHeader?.current?.gridInst;
    const Detail = refGridDetail?.current?.gridInst;

    if (Condition(e, ["before_qty"])) {
      const beforeQty = e?.value;
      const afterQty = Detail.getValue(e?.rowKey, "after_qty");
      if (afterQty) {
        Detail?.setValue(e?.rowKey, "qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "qty", beforeQty);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "qty"));
      }
      Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }
    if (Condition(e, ["after_qty"])) {
      const beforeQty = Detail.getValue(e?.rowKey, "before_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Detail?.setValue(e?.rowKey, "qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "qty", -e?.value);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "qty"));
      }
      Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }

    const inputInfoValueList = [
      "reg_date",
      "prod_cd",
      "prod_nm",
      "lot_no",
      "total_qty",
      "remark",
    ];
    setInputInfoValue([]);
    for (let i = 0; i < inputInfoValueList.length; i++) {
      let data = Header.getValue(headerClickRowKey, inputInfoValueList[i]);
      if (data === false) {
        //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
        data = "false";
      }
      setInputInfoValue((prevList) => {
        return [...prevList, data];
      });
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ContentsLeft>
        <S.ScreenTitleBox>❇️ 일일소분일지</S.ScreenTitleBox>
        <S.ItemInfoBox>
          <InputPaper
            width={"220px"}
            height={"60px"}
            name={"품목코드"}
            nameSize={"16px"}
            value={""}
            valueSize={"20px"}
            btn={true}
          />
          <InputPaper
            width={"220px"}
            height={"60px"}
            name={"소분일자"}
            value={"2023-05-09"}
            valueSize={"20px"}
            nameSize={"16px"}
          />
          <InputPaper
            width={"220px"}
            height={"60px"}
            name={"소분LOT"}
            nameSize={"16px"}
            value={""}
            valueSize={"20px"}
          />
          <InputPaper
            width={"220px"}
            height={"60px"}
            name={"소분총량"}
            nameSize={"16px"}
            value={""}
            valueSize={"20px"}
          />
        </S.ItemInfoBox>
        <S.DataInterfaceBox>
          <S.DataInterfaceWrap>
            <InputPaper
              width={"220px"}
              height={"60px"}
              name={"Barcode"}
              nameSize={"16px"}
              value={""}
              valueSize={"20px"}
            />
            <InputPaper
              width={"220px"}
              height={"60px"}
              name={"투입LOT"}
              nameSize={"16px"}
              value={""}
              valueSize={"20px"}
            />
            <InputPaper
              width={"220px"}
              height={"60px"}
              name={"소분 전"}
              nameSize={"16px"}
              value={""}
              valueSize={"20px"}
            />
            <InputPaper
              width={"220px"}
              height={"60px"}
              name={"소분 후"}
              nameSize={"16px"}
              value={""}
              valueSize={"20px"}
            />
          </S.DataInterfaceWrap>
          <S.MadeButtonWrap>
            <S.MadeButton color={"#28a745"} hoverColor={"#218838"}>
              Before
            </S.MadeButton>
            <S.MadeButton color={"#212529"} hoverColor={"#ffc107"}>
              After
            </S.MadeButton>
            <S.MadeButton color={"#212529"} hoverColor={"#ffc107"}>
              Next
            </S.MadeButton>
          </S.MadeButtonWrap>
        </S.DataInterfaceBox>
        {/* <S.Date
          datePickerSet={"range"}
          dateText={dateText}
          setDateText={setDateText}
        /> */}
        {/* {inputSet.map((v) => (
              <S.InputS
                key={v.id}
                id={v.id}
                name={v.name}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
                onKeyDown={onKeyDown}
              />
            ))} */}
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.ButtonBox></S.ButtonBox>
        <S.DataHandleBox></S.DataHandleBox>
      </S.ContentsRight>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default Subdivision;
