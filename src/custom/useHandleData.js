import { useEffect, useState } from "react";
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
  SETTING_FILE
) => {
  const [actDelete, setActDelete] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      const data = refGrid?.current?.gridInst
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
            setSearchToggle(!searchToggle);
          });
      }
    };
    if (isEditMode === false) {
      handle();
    }
  }, [actDelete]);
  return [actDelete, setActDelete];
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
  const [actSearch, setActSearch] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      if (isBackDrop === false) {
        try {
          setIsBackDrop(true);
          const inputParams = GetInputSearchParams(inputBoxID, inputTextChange);
          const readURI = uri + inputParams;
          const gridData = await restAPI.get(readURI);
          setGridData(gridData?.data?.data?.rows);
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
          setDisableRowToggle(!disableRowToggle);
          setIsBackDrop(false);
        }
      }
    };

    handle();
  }, [actSearch]);
  return [actSearch, setActSearch];
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
  const [actSearch, setActSearch] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      if (isBackDrop === false) {
        try {
          setIsBackDrop(true);
          const inputParams = GetInputSearchParams(inputBoxID, inputTextChange);
          const cboParams = GetCboSearchParams(inputParams, comboValue);
          const readURI = uri + inputParams + cboParams;
          const gridData = await restAPI.get(readURI);
          setGridData(gridData?.data?.data?.rows);
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
          setDisableRowToggle(!disableRowToggle);
          setIsBackDrop(false);
        }
      }
    };

    handle();
  }, [actSearch]);
  return [actSearch, setActSearch];
};
const useEditModeSave = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  SETTING_FILE,
  uri
) => {
  const [actEditModeSave, setActEditModeSave] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      const data = refGrid?.current?.gridInst
        ?.getCheckedRows()
        ?.map((raw) => GetPutParams(SETTING_FILE, raw));
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
    };

    handle();
  }, [actEditModeSave]);
  return [actEditModeSave, setActEditModeSave];
};

const useModalSave = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  SETTING_FILE,
  uri
) => {
  const [actModalSave, setActModalSave] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      const data = refGrid?.current?.gridInst
        ?.getModifiedRows()
        ?.createdRows.map((raw) =>
          GetPostParams(SETTING_FILE, raw, cookie.factoryID)
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
    };

    handle();
  }, [actModalSave]);
  return [actModalSave, setActModalSave];
};

export { useDelete, useSearch, useSearchCbo, useEditModeSave, useModalSave };
