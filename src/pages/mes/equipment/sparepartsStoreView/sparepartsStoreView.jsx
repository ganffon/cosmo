import * as S from "pages/mes/style/oneGrid.styled";
import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonSES from "components/button/ButtonSES";
import ButtonNEDS from "components/button/ButtonNEDS";
import * as uSearch from "custom/useSearch";
import ButtonSearch from "components/button/ButtonSearch";
import LoginStateChk from "custom/LoginStateChk";
import SparepartsStoreViewSet from "./sparepartsStoreViewSet";
import InputSearch from "components/input/InputSearch";
import useInputSet from "custom/useInputSet";
import DateTime from "components/datetime/DateTime";
import * as disRow from "custom/useDisableRowCheck";
import restURI from "json/restURI.json";
import GridSingle from "components/grid/GridSingle";

function SparepartsStoreView() {
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
    columnsModalHeader,
    columnsModalSelectProduct,
    columnsModalSelectEquipDetail,
    columnsModalSelectStore,
    columnsModalSelectReleaseUser,
  } = SparepartsStoreViewSet();

  LoginStateChk();
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const refSingleGrid = useRef(null);
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );
  //===============================================
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  // 검색 시작
  const [actSearch] = uSearch.useSearchOnlyCbo(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    setGridData,
    "",
    restURI.sparepartsStoreView
  );

  const onClickSearch = () => {
    actSearch();
  };
  useEffect(() => {
    onClickSearch();
  }, [searchToggle]);
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
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
            <ButtonSearch onClickSearch={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            onClickGrid={onClickGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
    </S.ContentsArea>
  );
}
export default SparepartsStoreView;
