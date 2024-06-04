import { useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";

import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import LotChangeOrderSet from "./LotChangeOrderSet";
import useInputSet from "custom/useInputSet";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as disRow from "custom/useDisableRowCheck";
import * as S from "./LotChangeOrder.styled";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsAreaHidden";
import BtnComponent from "components/button/BtnComponent";
import * as Cbo from "custom/useCboSet";
import { TextField } from "@mui/material";
import CN from "json/ColumnName.json";
import * as RE from "custom/RegularExpression";
import ModalNew from "components/modal/ModalNew";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import DateRange from "components/datetime/DateRange";

export function LotChangeOrder() {
  const { currentMenuName, isMenuSlide } = useContext(LayoutContext);

  const refGridHeader = useRef(null);
  const refGridMid = useRef(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);

  const targetRowKey = useRef("");
  const targetGrid = useRef("");

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);

  const [isBackDrop, setIsBackDrop] = useState(false);

  const [isTopDeleteAlertOpen, setIsTopDeleteAlertOpen] = useState(false);
  const [isMidDeleteAlertOpen, setIsMidDeleteAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMid, setGridDataMid] = useState(null);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);

  const SWITCH_NAME_01 = "lotChange";

  const [disableRowToggleTop, setDisableRowToggleTop] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [dateSelect, setDateSelect] = useState({
    startDate: DateTime(-1).dateFull,
    endDate: DateTime().dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const {
    columnOptions,
    rowHeadersNumCheck,
    header,
    columnsHeader,
    columnsMid,
    columnsModalHeader,
    columnsSelectPacking,
  } = LotChangeOrderSet(isEditModeHeader);

  const headerRowID = useRef("");

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridMid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.lotChange,
    onClickModalClose
  );

  const onClickSearch = () => {
    headerRowID.current = "";
    actSearchGridTop();
    actSearchMid();
  };
  const onClickEditHeader = () => {
    setDisableRowToggleTop(!disableRowToggleTop);
    setIsEditModeHeader(true);
  };
  const onClickDeleteHeader = () => {
    const data = refGridHeader?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsTopDeleteAlertOpen(true);
    }
  };
  const onClickEditModeSaveHeader = () => {
    actEditHeader();
  };
  const onClickEditModeExitHeader = () => {
    setIsEditModeHeader(false);
    onClickSearch();
    setDisableRowToggleTop(!disableRowToggleTop);
  };

  // const onClickMidDelete = () => {
  //   const data = refGridMid?.current?.gridInst?.getCheckedRows();
  //   if (data.length !== 0) {
  //     setIsMidDeleteAlertOpen(true);
  //   }
  // };

  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  const actSearchGridTop = async () => {
    try {
      setIsBackDrop(true);
      let readURI =
        restURI.lotChange + `?start_date=${dateText.startDate}&end_date=${dateText.endDate}&complete_fg=ORDER`;
      // complete_fg=ORDER 는 LOT변경 지시만 내린 것 조회할 때 사용

      let gridData = await restAPI.get(readURI);

      setGridDataHeader(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      // setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const actSearchMid = async () => {
    try {
      setIsBackDrop(true);
      const readURI =
        restURI.lotChange + `?start_date=${dateText.startDate}&end_date=${dateText.endDate}&complete_fg=INPUT`;
      // complete_fg=INPUT 은 LOT변경 지시를 따라서 LOT 변경이 등록된 내용을 조회 할 때 사용
      let gridData = await restAPI.get(readURI);
      setGridDataMid(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      // setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  useEffect(() => {
    actSearchGridTop();
    actSearchMid();
  }, []);

  const onClickNew = () => {
    setIsModalOpen(true);
  };

  function onClickModalClose() {
    setIsModalOpen(false);
  }

  const onClickModalSave = () => {
    actSave();
    onClickSearch();
  };

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };

  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm", "input_lot_no", "input_packing_no"])) {
      targetRowKey.current = e?.rowKey;
      targetGrid.current = "Modal";

      setIsModalSelectOpen(true);
      onSearchSelect(`?start_date=${dateSelect.startDate}&end_date=${dateSelect.endDate}`);
    }
  };
  const onDblClickGridHeader = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm", "input_lot_no", "input_packing_no"])) {
      targetRowKey.current = e?.rowKey;
      targetGrid.current = "Grid";

      setIsModalSelectOpen(true);
      onSearchSelect(`?start_date=${dateSelect.startDate}&end_date=${dateSelect.endDate}`);
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };

  const onDblClickGridSelect = async (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    if (targetGrid.current === "Grid") {
      refGrid = refGridHeader;
      disRow.handleGridSelectCheck(refGrid, targetRowKey.current);
    } else if (targetGrid.current === "Modal") {
      refGrid = refModalGrid;
    }
    const selectColumnNm = [
      "prod_id",
      "prod_cd",
      "prod_nm",
      "prod_std",
      "packing_date",
      "packing_qty",
      "lot_no",
      "packing_no",
    ];
    const targetColumnNm = [
      "prod_id",
      "prod_cd",
      "prod_nm",
      "prod_std",
      "input_date",
      "input_qty",
      "input_lot_no",
      "input_packing_no",
    ];
    for (let i = 0; i < selectColumnNm.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        targetRowKey.current,
        targetColumnNm[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][selectColumnNm[i]]
      );
    }
    setIsModalSelectOpen(false);
  };

  const onSearchSelect = async () => {
    try {
      const result = await restAPI.get(
        restURI.prdPackingDetail + `?start_date=${dateSelect.startDate}&end_date=${dateSelect.endDate}`
      );
      const data = result.data.data.rows;
      setGridModalSelectData(data);
    } catch (err) {
      console.error(err);
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.lotChange
  );

  const [actDeleteMid] = uDelete.useDeleteDetail(
    refGridMid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsMidDeleteAlertOpen,
    actSearchMid,
    actSearchMid,
    headerRowID,
    restURI.lotChange,
    SWITCH_NAME_01
  );

  const [actDeleteTop] = uDelete.useDeleteDetail(
    refGridHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsTopDeleteAlertOpen,
    onClickSearch,
    onClickSearch,
    headerRowID,
    restURI.lotChange,
    SWITCH_NAME_01
  );

  const GridTop = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        isEditMode={isEditModeHeader}
        onEditingFinish={onEditingFinishGridHeader}
        onDblClickGrid={onDblClickGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  return (
    <ContentsArea>
      <S.SearchCondition>
        <>
          <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
        </>
        <S.ButtonWrap>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonWrap>
      </S.SearchCondition>

      <S.ContentTop>
        <S.TitleButtonWrap>
          <S.TitleMid>LOT변경지시</S.TitleMid>
          <S.ButtonTop>
            {isEditModeHeader ? (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Save"} onClick={onClickEditModeSaveHeader} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExitHeader} />
                </S.InnerButtonWrap>
              </>
            ) : (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"New"} onClick={onClickNew} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Edit"} onClick={onClickEditHeader} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickDeleteHeader} />
                </S.InnerButtonWrap>
              </>
            )}
          </S.ButtonTop>
        </S.TitleButtonWrap>
        <S.GridTopWrap>{GridTop}</S.GridTopWrap>
      </S.ContentTop>
      <S.ContentMid>
        <S.TitleButtonWrap>
          <S.TitleMid>LOT변경내역</S.TitleMid>
          {/* <S.ButtonMid>
            <S.InnerButtonWrap>
              <BtnComponent btnName={"Delete"} onClick={onClickMidDelete} />
            </S.InnerButtonWrap>
          </S.ButtonMid> */}
        </S.TitleButtonWrap>
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
      </S.ContentMid>

      {isTopDeleteAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={actDeleteTop}
          onCancel={() => {
            setIsTopDeleteAlertOpen(false);
          }}
        />
      )}
      {isMidDeleteAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={actDeleteMid}
          onCancel={() => {
            setIsMidDeleteAlertOpen(false);
          }}
        />
      )}
      {isModalOpen && (
        <ModalNew
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={null}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          onDblClickModalGrid={onDblClickModalGrid}
          columns={columnsModalHeader}
          columnOptions={columnOptions}
          rowHeaders={["rowNum"]}
          refModalGrid={refModalGrid}
          onClickModalGrid={() => {}}
          // requirecolumns={["proc_cd", "proc_nm"]}
        />
      )}
      {isModalSelectOpen && (
        <ModalWrapMulti height={"80%"} width={"60%"}>
          <S.SelectHeaderBox>
            <S.SelectTitleBox>{"포장실적 상세조회"}</S.SelectTitleBox>
            <S.SelectButtonClose color="primary" aria-label="close" onClick={onClickModalSelectClose}>
              <CloseIcon />
            </S.SelectButtonClose>
          </S.SelectHeaderBox>
          <S.SelectSearchBox>
            <DateRange dateText={dateSelect} setDateText={setDateSelect} />
            <S.SelectButtonBox>
              <BtnComponent btnName={"Search"} onClick={onSearchSelect} />
            </S.SelectButtonBox>
          </S.SelectSearchBox>
          <S.SelectGridBox>
            <GridModal
              columns={columnsSelectPacking}
              columnOptions={columnOptions}
              header={header}
              rowHeaders={["rowNum"]}
              refGrid={refModalSelectGrid}
              data={gridModalSelectData}
              draggable={false}
              onDblClick={onDblClickGridSelect}
            />
          </S.SelectGridBox>
        </ModalWrapMulti>
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
