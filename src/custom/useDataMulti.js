import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetDeleteParams from "api/GetDeleteParams";
import GetInputSearchReadOnly from "api/GetInputSearchReadOnly";
import GetPutParams from "api/GetPutParams";
import GetPostParams from "api/GetPostParams";
import GetCboSearchParams from "api/GetCboSearchParams";
import restAPI from "api/restAPI";
import * as disRow from "custom/useDisableRowCheck";

const useDeleteDetail = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setIsDeleteAlertOpen,
  actSearchHeader,
  actSearchDetail,
  headerClickRowID,
  uri,
  componentName
) => {
  const actDeleteDetail = async () => {
    const data = refGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => GetDeleteParams(componentName, raw));
    if (data !== undefined && isBackDrop === false) {
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
          actSearchHeader(false);
          actSearchDetail(headerClickRowID);
        });
    }
  };
  return [actDeleteDetail];
};
//⬇️ Select 창에서 Data 조회
const useSearchSelect = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setGridModalSelectData,
  uri
) => {
  const actSearchSelect = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const gridData = await restAPI.get(uri);
        await setGridModalSelectData(gridData?.data?.data?.rows);
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
  return [actSearchSelect];
};
//⬇️ 신규입력화면에서 Header와 Detail 저장
const useSaveNew = (
  refGrid01,
  refGrid02,
  idEditMode,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName01,
  componentName02,
  uri
) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const actSaveNew = async () => {
    refGrid01?.current?.gridInst?.finishEditing();
    refGrid02?.current?.gridInst?.finishEditing();
    if (idEditMode === false) {
      const dataTop = GetPostParams(
        componentName01,
        refGrid01?.current?.gridInst?.getModifiedRows()?.createdRows[0],
        cookie.factoryID
      );
      const dataBottom = refGrid02?.current?.gridInst
        ?.getModifiedRows()
        ?.createdRows.map((raw) =>
          GetPostParams(componentName02, raw, cookie.factoryID)
        );
      const query = {
        header: dataTop,
        details: dataBottom,
      };
      if (query.details !== undefined && isBackDrop === false) {
        setIsBackDrop(true);
        await restAPI
          .post(uri, query)
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
              message: res?.message
                ? res?.message
                : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };
  return [actSaveNew];
};
//⬇️ 수정모드에서 Header 저장
const useSaveEditHeader = (
  refGrid,
  isEditMode,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const actSaveEditHeader = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isEditMode === true) {
      if (isBackDrop === false) {
        const data = refGrid?.current?.gridInst
          ?.getCheckedRows()
          ?.map((raw) => GetPutParams(componentName, raw));
        if (data.length !== 0) {
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
              disRow.handleCheckReset(true, refGrid); //🔸저장 후 refGrid rowCheck 초기화
            })
            .catch((res) => {
              setIsSnackOpen({
                ...isSnackOpen,
                open: true,
                message: res?.message
                  ? res?.message
                  : res?.response?.data?.message,
                severity: "error",
              });
            })
            .finally(() => {
              setIsBackDrop(false);
            });
        }
      }
    }
  };
  return [actSaveEditHeader];
};
//⬇️ 수정모드에서 Detail 저장
const useSaveEditDetail = (
  refGrid,
  isEditMode,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uriDetail
) => {
  const actSaveEditDetail = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isEditMode === true) {
      if (isBackDrop === false) {
        const data = refGrid?.current?.gridInst
          ?.getCheckedRows()
          ?.map((raw) => GetPutParams(componentName, raw));

        if (data.length !== 0) {
          setIsBackDrop(true);
          await restAPI
            .put(uriDetail, data)
            .then((res) => {
              setIsSnackOpen({
                ...isSnackOpen,
                open: true,
                message: res?.data?.message,
                severity: "success",
              });
              disRow.handleCheckReset(true, refGrid); //🔸저장 후 refGrid rowCheck 초기화
            })
            .catch((res) => {
              setIsSnackOpen({
                ...isSnackOpen,
                open: true,
                message: res?.message
                  ? res?.message
                  : res?.response?.data?.message,
                severity: "error",
              });
            })
            .finally(() => {
              setIsBackDrop(false);
            });
        }
      }
    }
  };
  return [actSaveEditDetail];
};
//⬇️ 수정모드에서 Detail 신규 저장
const useSaveEditNewDetail = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const actSaveEditNewDetail = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isBackDrop === false) {
      const data = refGrid?.current?.gridInst
        ?.getModifiedRows()
        ?.createdRows.map((raw) =>
          GetPostParams(componentName, raw, cookie.factoryID)
        );

      if (data.length !== 0) {
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
            disRow.handleCheckReset(true, refGrid); //🔸저장 후 refGrid rowCheck 초기화
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.message
                ? res?.message
                : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };
  return [actSaveEditNewDetail];
};
//⬇️ 메인화면에서 Header 조회
const useSearchHeader = (
  refGrid01,
  refGrid02,
  setInputInfoValue,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  inputBoxID,
  inputSearchValue,
  comboValue,
  setGridData,
  disRowHeader,
  setDisRowHeader,
  uri
) => {
  const actSearchHeader = async (inputReset = true) => {
    inputReset && setInputInfoValue([]); //🔸Header 조회 시 InputBox 초기화
    refGrid02?.current?.gridInst.clear();
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const inputParams = GetInputSearchReadOnly(
          inputBoxID,
          inputSearchValue
        );
        const cboParams = GetCboSearchParams(inputParams, comboValue);
        const readURI = uri + inputParams + cboParams;
        const gridData = await restAPI.get(readURI);
        await setGridData(gridData?.data?.data?.rows);
      } catch {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "조회 실패",
          severity: "error",
        });
      } finally {
        setIsBackDrop(false);
        setDisRowHeader(!disRowHeader);
      }
    }
  };
  return [actSearchHeader];
};
//⬇️ 메인화면에서 Header 클릭 시 RowKey로 Detail 조회
const useSearchDetail = (setGridData, uri, disRowDetail, setDisRowDetail) => {
  const actSearchDetail = async (headerClickRowID) => {
    if (headerClickRowID !== undefined) {
      try {
        const gridData = await restAPI.get(`${uri}/detail/${headerClickRowID}`);
        await setGridData(gridData?.data?.data?.rows);
      } catch {
      } finally {
        setDisRowDetail(!disRowDetail);
      }
    }
  };
  return [actSearchDetail];
};
//⬇️ Detail 추가 위해 수정화면 진입 시 메인화면에서 선택했던 Header의 정보출력
const useSearchEditHeader = (
  isBackDrop,
  setIsBackDrop,
  setGridDataHeaderRowID,
  uri
) => {
  const actSearchEditHeader = async (headerClickRowID) => {
    if (isBackDrop === false && headerClickRowID !== null) {
      try {
        setIsBackDrop(true);
        const gridDataMain = await restAPI.get(`${uri}/${headerClickRowID}`);
        await setGridDataHeaderRowID(gridDataMain?.data?.data?.rows);
      } catch {
      } finally {
        setIsBackDrop(false);
      }
    }
  };
  return [actSearchEditHeader];
};

export {
  useDeleteDetail,
  useSearchSelect,
  useSearchHeader,
  useSearchDetail,
  useSearchEditHeader,
  useSaveEditHeader,
  useSaveEditDetail,
  useSaveEditNewDetail,
  useSaveNew,
};
