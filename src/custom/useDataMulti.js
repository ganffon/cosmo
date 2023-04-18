import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetDeleteParams from "api/GetDeleteParams";
import GetInputSearchParams from "api/GetInputSearchParams";
import GetPutParams from "api/GetPutParams";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import * as disRow from "custom/useDisableRowCheck";

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
  const [actSearchSelect, setActSearchSelect] = useState(false);
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
  }, [actSearchSelect]);
  return [actSearchSelect, setActSearchSelect];
};
//⬇️ 신규입력화면에서 Header와 Detail 저장
const useSaveDetail = (
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
  const [actSaveDetail, setActSaveDetail] = useState(false);
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
              //🔸이거 왜 넣어놨는지 모르겠음
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
  }, [actSaveDetail]);
  return [actSaveDetail, setActSaveDetail];
};
//⬇️ 수정화면에서 Header와 Detail 저장
const useSaveDetailEdit = (
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
  const [actSaveDetailEdit, setActSaveDetailEdit] = useState(false);
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
                disRow.handleCheckReset(true, refGrid01); //🔸저장 후 refGrid01 rowCheck 초기화
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
                disRow.handleCheckReset(true, refGrid02); //🔸저장 후 refGrid02 rowCheck 초기화
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
  }, [actSaveDetailEdit]);
  return [actSaveDetailEdit, setActSaveDetailEdit];
};
//⬇️ 메인화면에서 Header 조회
const useSearchHeader = (
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
  const [actSearchHeader, setActSearchHeader] = useState(false);
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
  }, [actSearchHeader]);
  return [actSearchHeader, setActSearchHeader];
};
//⬇️ 메인화면에서 Header 클릭 시 RowKey로 Detail 조회
const useSearchDetail = (
  isBackDrop,
  setIsBackDrop,
  setGridData,
  uriDetail,
  headerRowKey
) => {
  const [actSearchDetail, setActSearchDetail] = useState(false);
  useEffect(() => {
    const handle = async () => {
      if (isBackDrop === false && headerRowKey !== null) {
        try {
          setIsBackDrop(true);
          const gridData = await restAPI.get(
            `${uriDetail}/detail/${headerRowKey}`
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
//⬇️ 수정화면 진입 시 메인화면에서 선택했던 Header의 RowKey로 Detail 조회
const useSearchDetailEdit = (
  isBackDrop,
  setIsBackDrop,
  setGridDataMainEdit,
  setGridDataDetail,
  uriMain,
  uriDetail,
  headerRowKey
) => {
  const [actSearchDetailEdit, setActSearchDetailEdit] = useState(false);
  const [actDisableRow, setActDisableRow] = useState(false);
  useEffect(() => {
    const handle = async () => {
      if (isBackDrop === false && headerRowKey !== null) {
        try {
          setIsBackDrop(true);

          const gridDataMain = await restAPI.get(`${uriMain}/${headerRowKey}`);
          const gridDataDetail = await restAPI.get(
            `${uriDetail}/detail/${headerRowKey}`
          );
          await setGridDataMainEdit(gridDataMain?.data?.data?.rows);
          await setGridDataDetail(gridDataDetail?.data?.data?.rows);
          setActDisableRow(!actDisableRow); //🔸Edit 진입 시 RowHeaderCheck Disable 시키기 위한 state
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
  useDeleteDetail,
  useSearchSelect,
  useSearchHeader,
  useSearchDetail,
  useSearchDetailEdit,
  useSaveDetailEdit,
  useSaveDetail,
};
