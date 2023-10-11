import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import TheoreticalProductionSet from "pages/mes/standard/theoreticalProduction/TheoreticalProductionSet";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import URI from "api/URI";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import * as RE from "custom/RegularExpression";

export function TheoreticalProduction(props) {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);

  const { rowHeaders, rowHeadersModal, header, columns, columnsModal, columnOptions, inputSet } =
    TheoreticalProductionSet(isEditMode);

  const SWITCH_NAME_01 = "line";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

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
    URI.STD.LINE.MAIN,
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
    URI.STD.LINE.INCLUDE_REWORK
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    URI.STD.LINE.MAIN
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    URI.STD.LINE.MAIN,
    onClickModalClose
  );

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const handleDelete = () => {
    actDelete();
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    actSearch();
  };
  const onClickEditModeSave = () => {
    actEdit();
    setSearchToggle(!searchToggle);
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
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = () => {
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, ["rework_fg"]);
  };
  const onEditingFinishGrid = (e) => {
    editColumn(e?.rowKey, e?.columnName);
    disRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const loadData = async () => {
    let result;
    try {
      let readURI = URI.SYNC.LINE;

      setIsBackDrop(true);

      result = await restAPI.post(readURI);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "동기화에 실패하였습니다.",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);

      setIsBackDrop(false);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result.data.message,
        severity: "success",
      });
      onClickSearch();
    }
  };
  const editColumn = (rowKey, columnName) => {
    switch (columnName) {
      case "plasticity_length": //소성길이
        // 소성시간(Day) = 24 * 60 * 롤러속도 / 소성길이
        // 이론원부재투입량 = 이론충진량(상) + 이론충진량(하) + 소성시간(Day)
        break;
      case "roller_speed": //롤러속도
        // 소성시간(Day) = 24 * 60 * 롤러속도 / 소성길이
        break;
      case "sagger_length": //사야길이
        // 이론사야수량(상) = 소성길이 * 사야수량(상) / 사야길이
        // 이론사야수량(하) = 소성길이 * 사야수량(하) / 사야길이
        // 이론원부재투입량 = 이론충진량(상) + 이론충진량(하) + 소성시간(Day)

        break;
      case "top_sagger_qty": //사야수량(상)
        // 이론사야수량(상) = 소성길이 * 사야수량(상) / 사야길이
        break;
      case "top_filling_qty": //충진량(상)
        // 이론충진량(상) = 이론사야수량(상) * 충진량(상)
        // 이론원부재투입량 = 이론충진량(상) + 이론충진량(하) + 소성시간(Day)
        break;
      case "bottom_sagger_qty": //사야수량(하)
        // 이론사야수량(하) = 소성길이 * 사야수량(하) / 사야길이
        break;
      case "bottom_filling_qty": //충진량(하)
        // 이론충진량(하) = 이론사야수량(하) * 충진량(하)
        // 이론원부재투입량 = 이론충진량(상) + 이론충진량(하) + 소성시간(Day)
        // 이론제품생산량 = 이론원부재투입량 * 수율
        break;
      case "yield": //수율
        // 이론제품생산량 = 이론원부재투입량 * 수율
        break;
      default:
    }
  };
  const autoCalculate = (rowKey, columnName, value) => {
    const grid = refSingleGrid?.current?.gridInst;
    let plasticityLength,
      rollerSpeed,
      plasticityTime,
      saggerLength,
      topSaggerQty,
      topTheoreticalSaggerQty,
      topFillingQty,
      topTheoreticalFillingQty,
      bottomSaggerQty,
      bottomTheoreticalSaggerQty,
      bottomFillingQty,
      bottomTheoreticalFillingQty;
    switch (columnName) {
      case "plasticity_length": //소성길이
        // 소성시간(Day) = 24 * 60 * 롤러속도 / 소성길이
        plasticityLength = value;
        rollerSpeed = grid.getValue(rowKey, "roller_speed");
        if (plasticityLength && rollerSpeed) {
          plasticityTime = (24 * 60 * Number(rollerSpeed)) / Number(plasticityLength);
          grid.setValue(rowKey, "plasticity_time", RE.DecimalTwo(plasticityTime));
        } else {
          grid.setValue(rowKey, "plasticity_time", "");
        }
        break;
      case "roller_speed": //롤러속도
        // 소성시간(Day) = 24 * 60 * 롤러속도 / 소성길이
        plasticityLength = grid.getValue(rowKey, "plasticity_length");
        rollerSpeed = value;
        if (plasticityLength && rollerSpeed) {
          plasticityTime = (24 * 60 * Number(rollerSpeed)) / Number(plasticityLength);
          grid.setValue(rowKey, "plasticity_time", RE.DecimalTwo(plasticityTime));
        } else {
          grid.setValue(rowKey, "plasticity_time", "");
        }
        break;
      case "sagger_length": //사야길이
        // 이론사야수량(상) = 소성길이 * 사야수량(상) / 사야길이
        // 이론사야수량(하) = 소성길이 * 사야수량(하) / 사야길이
        plasticityLength = grid.getValue(rowKey, "plasticity_length");
        topSaggerQty = grid.getValue(rowKey, "top_sagger_qty");
        bottomSaggerQty = grid.getValue(rowKey, "bottom_sagger_qty");
        saggerLength = value;
        if (plasticityLength && topSaggerQty && saggerLength) {
          topTheoreticalSaggerQty = (Number(plasticityLength) * Number(topSaggerQty)) / Number(saggerLength);
          grid.setValue(rowKey, "top_theoretical_sagger_qty", RE.DecimalTwo(topTheoreticalSaggerQty));
          topFillingQty = grid.getValue(rowKey, "top_filling_qty");
          autoCalculate(rowKey, "top_filling_qty", topFillingQty);
        } else {
          grid.setValue(rowKey, "top_theoretical_sagger_qty", "");
        }
        if (plasticityLength && bottomSaggerQty && saggerLength) {
          bottomTheoreticalSaggerQty = (Number(plasticityLength) * Number(bottomSaggerQty)) / Number(saggerLength);
          grid.setValue(rowKey, "bottom_theoretical_sagger_qty", RE.DecimalTwo(bottomTheoreticalSaggerQty));
          bottomFillingQty = grid.getValue(rowKey, "bottom_filling_qty");
          autoCalculate(rowKey, "bottom_filling_qty", bottomFillingQty);
        } else {
          grid.setValue(rowKey, "bottom_theoretical_sagger_qty", "");
        }
        break;
      case "top_sagger_qty": //사야수량(상)
        // 이론사야수량(상) = 소성길이 * 사야수량(상) / 사야길이
        plasticityLength = grid.getValue(rowKey, "plasticity_length");
        topSaggerQty = value;
        saggerLength = grid.getValue(rowKey, "sagger_length");
        if (plasticityLength && topSaggerQty && saggerLength) {
          topTheoreticalSaggerQty = (Number(plasticityLength) * Number(topSaggerQty)) / Number(saggerLength);
          grid.setValue(rowKey, "top_theoretical_sagger_qty", RE.DecimalTwo(topTheoreticalSaggerQty));
          topFillingQty = grid.getValue(rowKey, "top_filling_qty");
          autoCalculate(rowKey, "top_filling_qty", topFillingQty);
        } else {
          grid.setValue(rowKey, "top_theoretical_sagger_qty", "");
        }
        break;
      case "top_filling_qty": //충진량(상)
        // 이론충진량(상) = 이론사야수량(상) * 충진량(상)
        topTheoreticalSaggerQty = grid.getValue(rowKey, "top_theoretical_sagger_qty");
        topFillingQty = value;
        if (topTheoreticalSaggerQty && topFillingQty) {
          topTheoreticalFillingQty = Number(topTheoreticalSaggerQty) * Number(topFillingQty);
          grid.setValue(rowKey, "top_theoretical_filling_qty", RE.DecimalTwo(topTheoreticalFillingQty));
        } else {
          grid.setValue(rowKey, "top_theoretical_filling_qty", "");
        }
        break;
      case "bottom_sagger_qty": //사야수량(하)
        // 이론사야수량(하) = 소성길이 * 사야수량(하) / 사야길이
        plasticityLength = grid.getValue(rowKey, "plasticity_length");
        bottomSaggerQty = value;
        saggerLength = grid.getValue(rowKey, "sagger_length");
        if (plasticityLength && bottomSaggerQty && saggerLength) {
          bottomTheoreticalSaggerQty = (Number(plasticityLength) * Number(bottomSaggerQty)) / Number(saggerLength);
          grid.setValue(rowKey, "bottom_theoretical_sagger_qty", RE.DecimalTwo(bottomTheoreticalSaggerQty));
          bottomFillingQty = grid.getValue(rowKey, "bottom_filling_qty");
          autoCalculate(rowKey, "bottom_filling_qty", bottomFillingQty);
        } else {
          grid.setValue(rowKey, "bottom_theoretical_sagger_qty", "");
        }
        break;
      case "bottom_filling_qty": //충진량(하)
        // 이론충진량(하) = 이론사야수량(하) * 충진량(하)
        bottomTheoreticalSaggerQty = grid.getValue(rowKey, "bottom_theoretical_sagger_qty");
        bottomFillingQty = value;
        if (bottomTheoreticalSaggerQty && bottomFillingQty) {
          bottomTheoreticalFillingQty = Number(bottomTheoreticalSaggerQty) * Number(bottomFillingQty);
          grid.setValue(rowKey, "bottom_theoretical_filling_qty", RE.DecimalTwo(bottomTheoreticalFillingQty));
        } else {
          grid.setValue(rowKey, "bottom_theoretical_filling_qty", "");
        }
        break;
      default:
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
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
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>

      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        {isEditMode ? (
          <S.ButtonWrap>
            <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
            <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
          </S.ButtonWrap>
        ) : (
          <S.ButtonWrap>
            <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
            <BtnComponent btnName={"DataLoad"} onClick={loadData} toolTipTitle={"lineButton"} />
          </S.ButtonWrap>
        )}

        <S.GridWrap>
          <GridSingle
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
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
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
      {isModalOpen ? (
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
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
