import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetDeleteParams from "api/GetDeleteParams";
import GetInputSearchParams from "api/GetInputSearchParams";
import GetCboSearchParams from "api/GetCboSearchParams";
import GetPutParams from "api/GetPutParams";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import * as DisableRow from "custom/useDisableRowCheck";

const useDelete = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setIsDeleteAlertOpen,
  searchToggle,
  setSearchToggle,
  uri,
  componentName
) => {
  const [actDelete, setActDelete] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      const data = refGrid?.current?.gridInst
        ?.getCheckedRows()
        ?.map((raw) => GetDeleteParams(componentName, raw));
      if (data !== undefined && isBackDrop === false) {
        setIsBackDrop(true);
        await restAPI
          .delete(uri, { data })
          .then(() => {})
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

    handle();
  }, [actDelete]);
  return [actDelete, setActDelete];
};
const useDeleteDetail = (
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setIsDeleteAlertOpen,
  actSearchDetail,
  setActSearchDetail,
  uri,
  componentName
) => {
  const [actDelete, setActDelete] = useState(false);
  const [deleteRow, setDeleteRow] = useState([]);
  useEffect(() => {
    const handle = async () => {
      const data = deleteRow?.map((raw) => GetDeleteParams(componentName, raw));
      if (data !== undefined && isBackDrop === false) {
        setIsBackDrop(true);
        await restAPI
          .delete(uri, { data })
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.data?.message,
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
            setActSearchDetail(!actSearchDetail);
          });
      }
    };

    handle();
  }, [actDelete]);
  return [actDelete, setActDelete, setDeleteRow];
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

    handle();
  }, [actSearch]);
  return [actSearch, setActSearch];
};
const useSearchModalSelect = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setGridModalSelectData,
  uri
) => {
  const [actSearchModalSelect, setActSearchModalSelect] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
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

    handle();
  }, [actSearchModalSelect]);
  return [actSearchModalSelect, setActSearchModalSelect];
};

const useEditModeSave = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const [actEditModeSave, setActEditModeSave] = useState(false);
  refGrid?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      const data = refGrid?.current?.gridInst
        ?.getCheckedRows()
        ?.map((raw) => GetPutParams(componentName, raw));
      if (data !== undefined && isBackDrop === false) {
        setIsBackDrop(true);
        await restAPI
          .put(uri, data)
          .then(() => {})
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
  componentName,
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
          GetPostParams(componentName, raw, cookie.factoryID)
        );
      if (data !== undefined && isBackDrop === false) {
        setIsBackDrop(true);
        await restAPI
          .post(uri, data)
          .then(() => {
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
const useModalDetailSave = (
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
  const [actModalDetailSave, setActModalDetailSave] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  refGrid01?.current?.gridInst?.finishEditing();
  refGrid02?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
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
            .then(() => {})
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
              for (
                let i = 0;
                i < refGrid01?.current?.gridInst?.getRowCount();
                i++
              ) {
                refGrid01?.current?.gridInst?.disableRowCheck(i);
              }
              for (
                let i = 0;
                i < refGrid02?.current?.gridInst?.getRowCount();
                i++
              ) {
                refGrid02?.current?.gridInst?.disableRowCheck(i);
              }
              setIsBackDrop(false);
            });
        }
      }
    };

    handle();
  }, [actModalDetailSave]);
  return [actModalDetailSave, setActModalDetailSave];
};
const useModalDetailEditSave = (
  refGrid01,
  refGrid02,
  isEditMode,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName01,
  componentName02,
  uri,
  uriDetail
) => {
  const [actModalDetailEditSave, setActModalDetailEditSave] = useState(false);
  refGrid01?.current?.gridInst?.finishEditing();
  refGrid02?.current?.gridInst?.finishEditing();
  useEffect(() => {
    const handle = async () => {
      if (isEditMode === true) {
        const dataTop = refGrid01?.current?.gridInst
          ?.getCheckedRows()
          ?.map((raw) => GetPutParams(componentName01, raw));

        const dataBottom = refGrid02?.current?.gridInst
          ?.getCheckedRows()
          ?.map((raw) => GetPutParams(componentName02, raw));
        if (isBackDrop === false) {
          if (dataTop.length !== 0) {
            setIsBackDrop(true);
            await restAPI
              .put(uri, dataTop)
              .then(() => {
                DisableRow.handleCheckReset(true, refGrid01);
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
          if (dataBottom.length !== 0) {
            setIsBackDrop(true);
            await restAPI
              .put(uriDetail, dataBottom)
              .then(() => {
                DisableRow.handleCheckReset(true, refGrid02);
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

    handle();
  }, [actModalDetailEditSave]);
  return [actModalDetailEditSave, setActModalDetailEditSave];
};
const useSearchMain = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  inputBoxID,
  inputTextChange,
  setGridData,
  uri
) => {
  const [actSearch, setActSearch] = useState(false);
  refGrid?.current?.gridInst.clear();
  useEffect(() => {
    const handle = async () => {
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
          setIsBackDrop(false);
        }
      }
    };

    handle();
  }, [actSearch]);
  return [actSearch, setActSearch];
};
const useSearchDetail = (
  isBackDrop,
  setIsBackDrop,
  setGridData,
  uriDetail,
  selectRowID
) => {
  const [actSearchDetail, setActSearchDetail] = useState(false);
  useEffect(() => {
    const handle = async () => {
      if (isBackDrop === false && selectRowID !== null) {
        try {
          setIsBackDrop(true);
          const gridData = await restAPI.get(
            `${uriDetail}/detail/${selectRowID}`
          );
          await setGridData(gridData?.data?.data?.rows);
        } catch {
        } finally {
          setIsBackDrop(false);
        }
      }
    };

    handle();
  }, [actSearchDetail]);
  return [actSearchDetail, setActSearchDetail];
};

const useSearchDetailEdit = (
  isBackDrop,
  setIsBackDrop,
  setGridDataMain,
  setGridDataDetail,
  uriMain,
  uriDetail,
  selectRowID
) => {
  const [actSearchDetailEdit, setActSearchDetailEdit] = useState(false);
  const [actDisableRow, setActDisableRow] = useState(false);
  useEffect(() => {
    const handle = async () => {
      if (isBackDrop === false && selectRowID !== null) {
        try {
          setIsBackDrop(true);

          const gridDataMain = await restAPI.get(`${uriMain}/${selectRowID}`);
          const gridDataDetail = await restAPI.get(
            `${uriDetail}/detail/${selectRowID}`
          );
          await setGridDataMain(gridDataMain?.data?.data?.rows);
          await setGridDataDetail(gridDataDetail?.data?.data?.rows);
          setActDisableRow(!actDisableRow);
        } catch {
        } finally {
          setIsBackDrop(false);
        }
      }
    };

    handle();
  }, [actSearchDetailEdit]);
  return [actSearchDetailEdit, setActSearchDetailEdit, actDisableRow];
};

export {
  useDelete,
  useDeleteDetail,
  useSearch,
  useSearchCbo,
  useSearchModalSelect,
  useSearchMain,
  useSearchDetail,
  useSearchDetailEdit,
  useEditModeSave,
  useModalDetailEditSave,
  useModalSave,
  useModalDetailSave,
};
