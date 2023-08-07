import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonS from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import StoreTransferViewSet from "./StoreTransferViewSet";
import TextField from "@mui/material/TextField";
import useInputSet from "custom/useInputSet";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
import * as S from "./StoreTransferView.styled";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";

function StoreTransferView() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [comboValue, setComboValue] = useState({
    prod_gbn_id: null,
    model_id: null,
    prod_type_id: null,
    prod_type_small_id: null,
  });

  const [productGbnOpt, productGbnList] = Cbo.useProductGbn();
  const [productModelOpt, productModelList] = Cbo.useProductModel();
  const [productTypeOpt, productTypeList] = Cbo.useProductType();
  const [productTypeSmallOpt, productTypeSmallList] = Cbo.useProductTypeSmall();
  const { rowHeadersNum, header, columns, columnOptions, inputSet, datePickerSet } = StoreTransferViewSet(
    productGbnList,
    productModelList,
    productTypeList,
    productTypeSmallList
  );
  const SWITCH_NAME_01 = "product";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

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
    restURI.invStore
  );
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    actSearch("start_date", "end_date");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
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
              <S.ComboBox
                disablePortal
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
              <S.ComboBox
                disablePortal
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
              <S.ComboBox
                disablePortal
                id="factoryCombo"
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
            </S.ComboWrap>
            <S.InputWrap>
              <DatePicker datePickerSet={datePickerSet} dateText={dateText} setDateText={setDateText} />
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
            </S.InputWrap>
          </S.SearchWrap>
          <S.ButtonWrap>
            <ButtonS onClickSearch={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
export default StoreTransferView;
