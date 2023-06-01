import GetPutParams from "api/GetPutParams";
import restAPI from "api/restAPI";
import * as disRow from "custom/useDisableRowCheck";

const useEdit = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const actEdit = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    console.log(refGrid?.current?.gridInst?.getCheckedRows());
    const data = refGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => GetPutParams(componentName, raw));
    console.log(data);
    if (data !== undefined) {
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
  };
  return [actEdit];
};
/**
 * 🔸수정모드에서 Header 저장
 */
const useEditHeader = (
  refGrid,
  isEditMode,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uri
) => {
  const actEditHeader = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isEditMode === true) {
      const data = refGrid?.current?.gridInst
        ?.getCheckedRows()
        ?.map((raw) => GetPutParams(componentName, raw));
      if (data !== undefined) {
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
  return [actEditHeader];
};
/**
 * 🔸수정모드에서 Detail 저장
 */
const useEditDetail = (
  refGrid,
  isEditMode,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  componentName,
  uriDetail
) => {
  const actEditDetail = async () => {
    refGrid?.current?.gridInst?.finishEditing();
    if (isEditMode === true) {
      const data = refGrid?.current?.gridInst
        ?.getCheckedRows()
        ?.map((raw) => GetPutParams(componentName, raw));
      if (data !== undefined) {
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
  return [actEditDetail];
};

export { useEdit, useEditHeader, useEditDetail };
