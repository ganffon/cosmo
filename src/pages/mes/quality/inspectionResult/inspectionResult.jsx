import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ContentsArea from "components/layout/common/ContentsArea";
import InputSearch from "components/input/InputSearch";
import * as S from "pages/mes/style/oneGrid.styled";
import * as LS from "./inspectionResult.styled.js";
import GridSingle from "components/grid/GridSingle";
import DateTime from "components/datetime/DateTime.js";
import InspectionResultSet from "./inspectionResultSet.jsx";
import InputPaper from "components/input/InputPaper.jsx";
import BtnComponent from "components/button/BtnComponent.jsx";
import ModalSelect from "components/modal/ModalSelect.jsx";
import * as uSearch from "custom/useSearch";
import NoticeSnack from "components/alert/NoticeSnack.jsx";
import BackDrop from "components/backdrop/BackDrop.jsx";
import restURI from "json/restURI.json";
import useInputSet from "custom/useInputSet.js";
import restAPI from "api/restAPI.js";
import Condition from "custom/Condition";
import * as disRow from "custom/useDisableRowCheck";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";

import ModalNew from "components/modal/ModalNew.jsx";
import NoticeAlertModal from "components/alert/NoticeAlertModal.jsx";
import * as uDelete from "custom/useDelete";
import ModalExcelUpload from "components/modal/ModalExcelUpload.jsx";

function InspectionResult(props) {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [lotNo, setLotNo] = useState("");
  const [inspVal, setInspVal] = useState("");
  const refSingleGrid = useRef(null);
  const refGridModalSelect = useRef(null);
  const refModalGrid = useRef(null);
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);

  const prodID = useRef("");
  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");
  const excelProdID = useRef("");
  const excelProdCD = useRef("품목코드");
  const excelProdNM = useRef("품목");

  const resetProd = () => {
    prodID.current = "품목코드";
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };

  const SWITCH_NAME_01 = "inspectionResultUpload";

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const {
    columns,
    columnOptions,
    columnsModal,
    columnProdSelect,
    rowHeaders,
    rowHeadersModal,
    header,

    inputSet,
    columnsSelectProd,
    rowHeadersNum,
  } = InspectionResultSet(isEditMode);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };

  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };

  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };

  const onDblClickGridModal = (e) => {
    if (Condition(e, ["prod_id", "prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalSelectProd");
      setColumnsSelect(columnProdSelect);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };

  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickEditModeSave = () => {
    actEdit();
  };
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.inspectionResultUpload
  );

  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setDisableRowToggle(!disableRowToggle);
    onClickSearch();
  };

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setDisableRowToggle(!disableRowToggle);
    setIsEditMode(true);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const handleDelete = () => {
    actDelete();
    setTimeout(() => {
      onClickSearch();
    }, 300);
  };

  const [actDelete] = uDelete.useDelete(
    refSingleGrid,
    isBackDrop,
    isEditMode,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    searchToggle,
    setSearchToggle,
    restURI.inspectionResultUpload,
    SWITCH_NAME_01
  );

  const onClickModalSave = () => {
    actSave();
    onClickSearch();
  };
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.inspectionResultUpload,
    onClickModalClose
  );
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };

  const onClickProdExcelUpload = () => {
    setDblClickGrid("ExcelUploadModal");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };

  const onClickExcelUpload = () => {
    setIsExcelModalOpen(true);
  };
  const onClickExcelUploadModalClose = () => {
    excelProdID.current = "";
    excelProdCD.current = "품목코드";
    excelProdNM.current = "품목";
    setIsExcelModalOpen(false);
    onClickSearch();
  };

  function onClickModalClose() {
    setIsModalOpen(false);
    actSearch();
  }

  const onClickProdCancel = () => {
    resetProd();
    setInputSearchValue([]);
  };
  const [actSelectProd] = uSearch.useSearchSelect(
    refGridModalSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  ); //➡️ Modal Select Search Prod
  useEffect(() => {
    onClickSearch();
  }, []);
  const onClickSearch = () => {
    actSearch();
  };

  const actSearch = async () => {
    setIsBackDrop(true);
    try {
      let conditionProdID;
      prodCD.current !== "품목코드" ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`) : (conditionProdID = "");
      let readURI = `/qms/insp-result-upload?start_date=${dateText.startDate}&end_date=${dateText.endDate}&` + conditionProdID;
      // console.log(inputTextChange);
      // console.log(inputBoxID);
      if (inputTextChange && inputBoxID) {
        let cnt = 1;
        //🔸inputBox 가 있다면?!
        if (inputBoxID.length > 0) {
          //🔸inputBox 갯수만큼 반복!
          for (let i = 0; i < inputBoxID.length; i++) {
            //🔸inputBox에 검색조건 있으면 가져오기
            if (inputTextChange[inputBoxID[i]]) {
              //🔸처음 가져오는 것이면 params에 ? 세팅
              if (cnt === 0) {
                readURI = "?";
                cnt++;
              }
              readURI = readURI + inputBoxID[i] + "=" + inputTextChange[inputBoxID[i]] + "&";
            }
          }
          //🔸마지막에 찍힌 & 기호 제거
          readURI = readURI.slice(0, readURI.length - 1);
        } else {
          readURI = readURI.slice(0, readURI.length - 1);
        }
      } else {
        readURI = readURI.slice(0, readURI.length - 1);
      }
      let gridData = await restAPI.get(readURI);
      console.log(gridData);
      setGridData(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName = ["prod_id", "prod_cd", "prod_nm"];

    if (dblClickGrid === "Search") {
      prodNM.current = "";
      for (let i = 0; i < columnName.length; i++) {
        console.log(e?.instance?.store?.data?.rawData);

        if (columnName[i] === "prod_cd") {
          prodCD.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
        if (columnName[i] === "prod_nm") {
          prodNM.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
      }
    } else if (dblClickGrid === "ModalSelectProd") {
      refGrid = refModalGrid;

      for (let i = 0; i < columnName.length; i++) {
        refGrid?.current?.gridInst?.setValue(dblClickRowKey, columnName[i], e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]);
      }
    } else if (dblClickGrid === "ExcelUploadModal") {
      console.log(e?.instance?.store?.data?.rawData[e?.rowKey]);

      for (let i = 0; i < columnName.length; i++) {
        if (columnName[i] === "prod_cd") {
          excelProdCD.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
        if (columnName[i] === "prod_nm") {
          excelProdNM.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
        if (columnName[i] === "prod_id") {
          excelProdID.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
      }
    }
    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
  };

  const GridMain = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columns}
        rowHeaders={rowHeaders}
        header={header}
        data={gridData}
        draggable={false}
        refGrid={refSingleGrid}
        isEditMode={isEditMode}
        // onClickGrid={onClickGrid}
        // onDblClickGrid={onDblClickGrid}
        onEditingFinish={onEditingFinishGrid}
      />
    );
  }, [refSingleGrid, gridData, isEditMode]);

  const GridModalSelect = useMemo(() => {
    return (
      <ModalNew
        onClickModalAddRow={onClickModalAddRow}
        onClickModalCancelRow={onClickModalCancelRow}
        onClickModalSave={onClickModalSave}
        onClickModalClose={onClickModalClose}
        columns={columnsModal}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersModal}
        refModalGrid={refModalGrid}
        onClickModalGrid={onClickModalGrid}
        onDblClickModalGrid={onDblClickGridModal}
      />
    );
  }, []);

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <LS.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
            <S.SearchWrap>
              {inputSet.map((v) => (
                <InputSearch
                  key={v.id}
                  id={v.id}
                  name={v.name}
                  handleInputTextChange={handleInputTextChange}
                  onClickSearch={onClickSearch}
                  onKeyDown={onKeyDown}
                />
              ))}
            </S.SearchWrap>
            <LS.InputPaperWrap>
              <InputPaper width={"180px"} name={"품목코드"} value={prodCD.current || ""} btn={false} />
            </LS.InputPaperWrap>
            <LS.InputPaperWrap>
              <InputPaper
                width={"240px"}
                name={"품목"}
                value={prodNM.current || ""}
                btn={true}
                onClickSelect={onClickProd}
                onClickRemove={onClickProdCancel}
              />
            </LS.InputPaperWrap>
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          {isEditMode ? (
            <>
              <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
              <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
            </>
          ) : (
            <>
              <BtnComponent btnName={"New"} onClick={onClickNew} />
              <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
              <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
              <BtnComponent btnName={"ExcelUpload"} onClick={onClickExcelUpload} width={"130px"} />
            </>
          )}
        </S.ButtonWrap>
        <S.GridWrap>{GridMain}</S.GridWrap>
      </S.ShadowBoxGrid>
      {isModalOpen ? GridModalSelect : null}
      {isExcelModalOpen ? (
        <ModalExcelUpload
          onClickModalClose={onClickExcelUploadModalClose}
          onClickProdSelect={onClickProdExcelUpload}
          excelProdID={excelProdID.current}
          excelProdCD={excelProdCD.current}
          excelProdNM={excelProdNM.current}
        ></ModalExcelUpload>
      ) : null}
      {isModalSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelectProd}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridModalSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      ) : null}

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default InspectionResult;
