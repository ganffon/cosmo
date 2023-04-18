import { useCookies } from "react-cookie";
import GetDeleteParams from "api/GetDeleteParams";
import GetInputSearchParams from "api/GetInputSearchParams";
import GetCboSearchParams from "api/GetCboSearchParams";
import GetPutParams from "api/GetPutParams";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";

const useDelete = (
  refGrid,
  isBackDrop,
  isEditMode,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setIsDeleteAlertOpen,
  searchToggle,
  setSearchToggle,
  uri,
  componentName
) => {
  const actDelete = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isEditMode === false) {
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
            setSearchToggle(!searchToggle);
          });
      }
    }
  };
  return [actDelete];
};
const useSearch = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  inputBoxID,
  inputTextChange,
  setGridData,
  disableRowToggle,
  setDisableRowToggle,
  uri
) => {
  const actSearch = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const inputParams = GetInputSearchParams(inputBoxID, inputTextChange);
        const readURI = uri + inputParams;
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
        setDisableRowToggle(!disableRowToggle);
        setIsBackDrop(false);
      }
    }
  };
  return [actSearch];
};
const useSearchCbo = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  inputBoxID,
  inputTextChange,
  setGridData,
  disableRowToggle,
  setDisableRowToggle,
  comboValue,
  uri
) => {
  const actSearchCbo = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const inputParams = GetInputSearchParams(inputBoxID, inputTextChange);
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
        setDisableRowToggle(!disableRowToggle);
        setIsBackDrop(false);
      }
    }
  };
  return [actSearchCbo];
};
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
const useSaveEdit = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const actSaveEdit = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    const data = refGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => GetPutParams(componentName, raw));
    if (data !== undefined && isBackDrop === false) {
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
  return [actSaveEdit];
};
const useSaveNew = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const actSaveNew = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    const data = refGrid?.current?.gridInst
      ?.getModifiedRows()
      ?.createdRows.map((raw) =>
        GetPostParams(componentName, raw, cookie.factoryID)
      );
    if (data !== undefined && isBackDrop === false) {
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
          refGrid?.current?.gridInst?.clear();
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
  return [actSaveNew];
};

export {
  useDelete,
  useSearch,
  useSearchCbo,
  useSearchSelect,
  useSaveEdit,
  useSaveNew,
};
