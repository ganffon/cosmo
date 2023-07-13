import * as S from "pages/mes/style/oneGrid.styled";
import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as uSearch from "custom/useSearch";
import ButtonSearch from "components/button/ButtonSearch";
import { LoginStateChk } from "custom/LoginStateChk";
import SparepartsStoreViewSet from "./sparepartsStoreViewSet";
import InputSearch from "components/input/InputSearch";
import useInputSet from "custom/useInputSet";
import DateTime from "components/datetime/DateTime";
import * as disRow from "custom/useDisableRowCheck";
import restURI from "json/restURI.json";
import GridSingle from "components/grid/GridSingle";
import TextField from "@mui/material/TextField";
import CN from "json/ColumnName.json";
import * as LS from "./sparepartsStoreView.styled";
import DatePicker from "components/datetime/DatePicker";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";

import * as Cbo from "custom/useCboSet";

function SparepartsStoreView() {
  const [productGbnOpt, productGbnList] = Cbo.useProductGbn();
  const [productModelOpt, productModelList] = Cbo.useProductModel();
  const [productTypeOpt, productTypeList] = Cbo.useProductType();
  const [productTypeSmallOpt, productTypeSmallList] = Cbo.useProductTypeSmall();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const {
    rowHeaders,

    header,
    columns,

    columnOptions,
    inputSet,
    datePickerSet,
  } = SparepartsStoreViewSet(productGbnList, productModelList, productTypeList, productTypeSmallList);

  LoginStateChk();
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [comboValue, setComboValue] = useState({
    prod_gbn_id: null,
    model_id: null,
    prod_type_id: null,
    prod_type_small_id: null,
  });

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const refSingleGrid = useRef(null);
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);
  //===============================================
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  // 검색 시작
  const [actSearch] = uSearch.useSearchOnlyCboDate(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    setGridData,
    comboValue,
    dateText,
    restURI.sparepartsStoreView
  );

  const onClickSearch = () => {
    actSearch("tran_reg_date");
  };
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  return (
    <ContentsArea>
      <LS.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <DatePicker datePickerSet={datePickerSet} dateText={dateText} setDateText={setDateText} />
            <LS.ComboWrap>
              <LS.ComboBox
                disablePortal
                id="productGbnCombo"
                size="small"
                key={(option) => option?.prod_gbn_id}
                options={productGbnOpt || null}
                getOptionLabel={(option) => option?.prod_gbn_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_gbn_id: newValue?.prod_gbn_id === undefined ? null : newValue?.prod_gbn_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_gbn_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <LS.ComboBox
                disablePortal
                id="modelCombo"
                size="small"
                key={(option) => option?.model_id}
                options={productModelOpt || null}
                getOptionLabel={(option) => option?.model_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    model_id: newValue?.model_id === undefined ? null : newValue?.model_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.model_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <LS.ComboBox
                disablePortal
                id="prodTypeCombo"
                size="small"
                key={(option) => option?.prod_type_id}
                options={productTypeOpt || null}
                getOptionLabel={(option) => option?.prod_type_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_type_id: newValue?.prod_type_id === undefined ? null : newValue?.prod_type_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_type_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <LS.ComboBox
                disablePortal
                id="prodTypeSmallCombo"
                size="small"
                key={(option) => option?.prod_type_small_id}
                options={productTypeSmallOpt || null}
                getOptionLabel={(option) => option?.prod_type_small_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_type_small_id:
                      newValue?.prod_type_small_id === undefined ? null : newValue?.prod_type_small_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_type_small_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
            </LS.ComboWrap>
            <LS.InputWrap>
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
            </LS.InputWrap>
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </LS.ShadowBoxButton>
      <LS.ShadowBoxGrid isAllScreen={isAllScreen}>
        <LS.GridWrap>
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
          />
        </LS.GridWrap>
      </LS.ShadowBoxGrid>
    </ContentsArea>
  );
}
export default SparepartsStoreView;
