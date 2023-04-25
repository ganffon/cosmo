import { useCookies } from "react-cookie";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import * as disRow from "custom/useDisableRowCheck";

const useSave = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const actSave = async () => {
    if (isBackDrop === false) {
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
  return [actSave];
};
/**
 * 🔸신규입력화면에서 Header와 Detail 저장
 */
const useSaveMulti = (
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
  const actSaveMulti = async () => {
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
  return [actSaveMulti];
};
/**
 * 🔸수정모드에서 Detail 신규 저장
 */
const useSaveDetail = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const actSaveDetail = async () => {
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
  return [actSaveDetail];
};
/**
 * 🔸재고실사 할 때 현재 재고와 실사 재고를 비교하여 동일 하지 않은 경우만 필터링하여 저장
 */
const useSaveStoreCheck = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const actSaveStoreCheck = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    const obj = refGrid?.current?.gridInst?.getCheckedRows();
    let filtered = obj.filter(
      (o) => Number(o.qty) !== Number(o.stock_inspection)
    );
    if (filtered.length !== 0) {
      const data = filtered?.map((raw) => GetPostParams(componentName, raw));
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
    } else {
      //체크 초기화
    }
  };
  return [actSaveStoreCheck];
};

export { useSave, useSaveMulti, useSaveDetail, useSaveStoreCheck };
