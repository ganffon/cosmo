import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonS from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import OutgoingLotHistorySet from "./OutgoingLotHistorySet";
import TextField from "@mui/material/TextField";
import useInputSet from "custom/useInputSet";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
//import * as S from "./OutgoingLotHistory.styled";
import restURI from "json/restURI.json";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import * as S from "pages/mes/style/oneGrid.styled";
import restAPI from "api/restAPI";
import { DateRangePicker } from "@mui/lab";
import DateRange from "components/datetime/DateRange";

export function OutgoingLotHistory() {
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const { rowHeadersNum, header, columns, columnOptions, datePickerSet } =
    OutgoingLotHistorySet();

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

  const handleInputTextChange = (e) => {
    // setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = async () => {
    const params = {
      start_date: dateText.startDate,
      end_date: dateText.endDate,
    };
    const result = await restAPI.get("/prd/lot-check", { params });

    if (result?.data?.data?.rows) {
      setGridData(result?.data?.data?.rows);
    }
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
            <DateRange
              datePickerSet={datePickerSet}
              dateText={dateText}
              setDateText={setDateText}
            />
            {/* <S.ComboWrap>
              <S.ComboBox
                disablePortal
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
              <S.ComboBox
                disablePortal
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
              <S.ComboBox
                disablePortal
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
            </S.ComboWrap>
            <S.InputWrap>
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
            </S.InputWrap> */}
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrapReport>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
          />
        </S.GridWrapReport>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
