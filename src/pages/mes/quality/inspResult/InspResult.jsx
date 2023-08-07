import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonSES from "components/button/ButtonSES";
import GridSingle from "components/grid/GridSingle";
import DateTime from "components/datetime/DateTime.js";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";

import BackDrop from "components/backdrop/BackDrop";
import ModalSelect from "components/modal/ModalSelect.jsx";
import InputSearch from "components/input/InputSearch";
import InspResultSet from "./InspResultSet";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import * as LS from "./InspResult.styled";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import InputPaper from "components/input/InputPaper.jsx";

function InspResult(props) {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dblClickGrid, setDblClickGrid] = useState("");
  const [dblClickRowKey, setDblClickRowKey] = useState();
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [gridData, setGridData] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [Data, setData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const refGridModalSelect = useRef(null);
  const [searchToggle, setSearchToggle] = useState(false);
  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
    columnsSelectProd,
    rowHeadersNum,
  } = InspResultSet(isEditMode);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const prodID = useRef("품목코드");
  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");
  const SWITCH_NAME_01 = "factory";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  // useEffect(() => {
  //   setTimeout(() => {
  //     onClickSearch();
  //   }, 100);
  // }, [searchToggle]);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);

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
    restURI.factory,
    SWITCH_NAME_01
  );

  const [actSearch] = uSearch.useSearch(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    setGridData,
    disableRowToggle,
    setDisableRowToggle,
    restURI.product
  );

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridModalSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  ); //➡️ Modal Select Search Prod
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.factory
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.factory,
    onClickModalClose
  );

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    setDisableRowToggle(!disableRowToggle);
  };
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName = ["prod_id", "prod_cd", "prod_nm"];

    if (dblClickGrid === "Search") {
      prodNM.current = "";
      for (let i = 0; i < columnName.length; i++) {
        if (columnName[i] === "prod_id") {
          prodID.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
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
        refGrid?.current?.gridInst?.setValue(
          dblClickRowKey,
          columnName[i],
          e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
        );
      }
    }
    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
  };
  const onClickProdCancel = () => {
    resetProd();
    setInputSearchValue([]);
  };
  const resetProd = () => {
    prodID.current = "품목코드";
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };
  const GetColumns = () => {
    restAPI
      .get(restURI.inspResultcolumns, {
        params: {
          start_date: dateText.startDate,
          end_date: dateText.endDate,
          prod_id: prodID.current,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  const GetData = () => {
    restAPI
      .get(restURI.inspResultStatus, {
        params: {
          start_date: dateText.startDate,
          end_date: dateText.endDate,
          prod_id: prodID.current,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직

        setData(response.data);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };

  const handleDelete = () => {
    actDelete();
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickSearch = () => {
    if (prodID.current === "품목코드") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "품목을 선택 해주세요.",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    actSearch();
    GetColumns();
    GetData();
  };

  const onClickEditModeSave = () => {
    actEdit();
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
  };
  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    if (rowKey) {
      // 선택한 Row가 있는 경우, 해당 Row의 키를 기반으로 데이터에서 찾아 제거
      const gridInstance = refModalGrid.current?.getInstance();
      // 선택한 Row가 있는 경우, 해당 Row 삭제
      gridInstance?.removeRow(rowKey);
    } else {
      // 선택한 Row가 없는 경우, 마지막 Row 제거
      const gridInstance = refModalGrid.current?.getInstance();
      const rowCount = refModalGrid.current?.getInstance()?.getData()?.length;
      if (rowCount > 0) {
        const lastRowKey = gridInstance.getRowAt(rowCount - 1).rowKey;
        gridInstance?.removeRow(lastRowKey);
      }
    }
    rowKey = undefined;
  };
  const onClickModalSave = () => {
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }

  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
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
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <LS.GridWrap>
          {/* <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            isEditMode={isEditMode}
            onClickGrid={onClickGrid}
            onEditingFinish={onEditingFinishGrid}
          /> */}
          {Data && (
            <GridSingle
              header={responseData?.data?.rows[0]?.columnChild}
              columns={responseData?.data?.rows[0]?.columnHeader}
              data={Data.data.rows}
            />
          )}
        </LS.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
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
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default InspResult;
