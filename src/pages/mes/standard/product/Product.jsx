import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridModule from "components/grid/GridModule";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import LoginStateChk from "custom/LoginStateChk";
import restAPI from "api/restAPI";
import restURI from "json/restURI";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import GetPostParams from "api/GetPostParams";
import GetPutParams from "api/GetPutParams";
import GetSearchParams from "api/GetSearchParams";
import GetDeleteParams from "api/GetDeleteParams";
import ProductSet from "pages/mes/standard/product/ProductSet";
import TextField from "@mui/material/TextField";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import * as S from "./Product.styled";

function Product() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
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
  const [inputTextChange, setInputTextChange] = useState();
  const [inputBoxID, setInputBoxID] = useState([]);

  // const [productGbnOpt, setProductGbnOpt] = useState([]);
  // const [modelOpt, setModelOpt] = useState([]);
  // const [productTypeOpt, setProductTypeOpt] = useState([]);
  // const [productTypeSmallOpt, setProductTypeSmallOpt] = useState([]);
  const [comboValue, setComboValue] = useState({
    prod_gbn_id: null,
    model_id: null,
    prod_type_id: null,
    prod_type_small_id: null,
  });

  // useEffect(() => {
  //   const getComboOpt = async () => {
  //     await restAPI.get(restURI.productGbn).then((res) => {
  //       setProductGbnOpt(res?.data?.data?.rows);
  //     });
  //     await restAPI.get(restURI.productModel).then((res) => {
  //       setModelOpt(res?.data?.data?.rows);
  //     });
  //     await restAPI.get(restURI.productType).then((res) => {
  //       setProductTypeOpt(res?.data?.data?.rows);
  //     });
  //     await restAPI.get(restURI.productTypeSmall).then((res) => {
  //       setProductTypeSmallOpt(res?.data?.data?.rows);
  //     });
  //   };
  //   getComboOpt();
  // }, []);

  const [productGbnOpt, productGbnList] = Cbo.useProductGbn();
  const [productModelOpt, productModelList] = Cbo.useProductModel();
  const [productTypeOpt, productTypeList] = Cbo.useProductType();
  const [productTypeSmallOpt, productTypeSmallList] = Cbo.useProductTypeSmall();

  const {
    uri,
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
  } = ProductSet(
    isEditMode,
    productGbnList,
    productModelList,
    productTypeList,
    productTypeSmallList
  );
  const SETTING_FILE = "Product";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const handleInputSetInit = useCallback(
    (data) => {
      const inputBoxID = new Array();
      const jsonObj = new Object();
      for (let i = 0; i < data.length; i++) {
        inputBoxID.push(data[i].id);
        jsonObj[data[i].id] = "";
      }
      return [inputBoxID, jsonObj];
    },
    [currentMenuName]
  );
  useEffect(() => {
    const data = handleInputSetInit(inputSet);
    setInputBoxID(data[0]);
    setInputTextChange(data[1]);
    onClickSearch(true);
  }, [currentMenuName]);

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const handleDelete = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => GetDeleteParams(SETTING_FILE, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .delete(uri, { data })
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.response?.data?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
          setIsDeleteAlertOpen(false);
          onClickSearch(false);
        });
    }
  };
  const handleInputTextChange = async (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = async (props) => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    //🔸검색버튼을 이미 눌러서 Loading ProgressBar가 돌고있다면 API 호출 못함
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const params = GetSearchParams(inputBoxID, inputTextChange);
        const readURI = uri + params;
        const gridData = await restAPI.get(readURI);
        setGridData(gridData?.data?.data?.rows);
        props &&
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: gridData?.data?.message,
            severity: "success",
          });
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
    }
  };
  const onClickEditModeSave = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    console.log(refSingleGrid?.current?.gridInst?.getModifiedRows());
    const data = refSingleGrid?.current?.gridInst
      ?.getModifiedRows()
      ?.updatedRows?.map((raw) => GetPutParams(SETTING_FILE, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .put(uri, data)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.message ? res?.message : res?.response?.data?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    }
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    onClickSearch(true);
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
  const onClickModalSave = async () => {
    refModalGrid?.current?.gridInst?.finishEditing();
    const data = refModalGrid?.current?.gridInst
      ?.getModifiedRows()
      ?.createdRows.map((raw) => GetPostParams(SETTING_FILE, raw));

    console.log(data);
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .post(uri, data)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
          refModalGrid?.current?.gridInst?.clear();
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.message ? res?.message : res?.response?.data?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    }
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    onClickSearch();
  };
  const onClickGrid = () => {};
  const onEditingFinishGrid = () => {};

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                id="factoryCombo"
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
              />
              <S.ComboBox
                disablePortal
                id="factoryCombo"
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
              />
              <S.ComboBox
                disablePortal
                id="factoryCombo"
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
                />
              ))}
            </S.InputWrap>
          </S.SearchWrap>
          <S.ButtonWrap>
            {isEditMode ? (
              <ButtonEdit
                onClickEditModeSave={onClickEditModeSave}
                onClickEditModeExit={onClickEditModeExit}
                onClickSearch={onClickSearch}
              />
            ) : (
              <ButtonSearch
                onClickNew={onClickNew}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                onClickSearch={onClickSearch}
              />
            )}
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridModule
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            onClickGrid={onClickGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <AlertDelete
          handleDelete={handleDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
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
          uri={uri}
          refModalGrid={refModalGrid}
          setIsModalOpen={setIsModalOpen}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}
export default Product;
