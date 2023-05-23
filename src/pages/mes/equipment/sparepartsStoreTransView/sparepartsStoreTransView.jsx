import * as S from "pages/mes/style/oneGrid.styled";
import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonSES from "components/button/ButtonSES";
import ButtonNEDS from "components/button/ButtonNEDS";
import * as uSearch from "custom/useSearch";
import ButtonSearch from "components/button/ButtonSearch";
import LoginStateChk from "custom/LoginStateChk";

import InputSearch from "components/input/InputSearch";
import useInputSet from "custom/useInputSet";
import DateTime from "components/datetime/DateTime";
import * as disRow from "custom/useDisableRowCheck";
import restURI from "json/restURI.json";
import GridSingle from "components/grid/GridSingle";
import TextField from "@mui/material/TextField";
import CN from "json/ColumnName.json";
import * as LS from "./sparepartsStoreTransView.styled";
import * as Cbo from "custom/useCboSet";
import SparepartsStoreTransViewSet from "./sparepartsStoreTransViewSet";

function SparepartsStoreTransView() {
  const [productGbnOpt, productGbnList] = Cbo.useProductGbn();
  const [productModelOpt, productModelList] = Cbo.useProductModel();
  const [productTypeOpt, productTypeList] = Cbo.useProductType();
  const [productTypeSmallOpt, productTypeSmallList] = Cbo.useProductTypeSmall();
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
  } = SparepartsStoreTransViewSet(
    productGbnList,
    productModelList,
    productTypeList,
    productTypeSmallList
  );

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

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
    restURI.sparepartsStoreTransView
  );

  const onClickSearch = () => {
    actSearch("start_date", "end_date");
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
            <LS.Date
              datePickerSet={"range"}
              dateText={dateText}
              setDateText={setDateText}
            />
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
                    prod_gbn_id:
                      newValue?.prod_gbn_id === undefined
                        ? null
                        : newValue?.prod_gbn_id,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.prod_gbn_nm} size="small" />
                )}
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
                    model_id:
                      newValue?.model_id === undefined
                        ? null
                        : newValue?.model_id,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.model_nm} size="small" />
                )}
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
                    prod_type_id:
                      newValue?.prod_type_id === undefined
                        ? null
                        : newValue?.prod_type_id,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.prod_type_nm} size="small" />
                )}
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
                      newValue?.prod_type_small_id === undefined
                        ? null
                        : newValue?.prod_type_small_id,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={CN.prod_type_small_nm}
                    size="small"
                  />
                )}
                onKeyDown={onKeyDown}
              />
            </LS.ComboWrap>

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
export default SparepartsStoreTransView;
