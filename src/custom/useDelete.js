import GetDeleteParams from "api/GetDeleteParams";
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
      const data = refGrid?.current?.gridInst?.getCheckedRows()?.map((raw) => GetDeleteParams(componentName, raw));
      if (data !== undefined) {
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
    const data = refGrid?.current?.gridInst?.getCheckedRows()?.map((raw) => GetDeleteParams(componentName, raw));
    if (data !== undefined) {
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
          actSearchHeader(false);
          actSearchDetail(headerClickRowID);
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
        });
    }
  };
  return [actDeleteDetail];
};

const useDeleteDetailDateRange = (
  refGrid,
  isBackDrop,
  setIsBackDrop,
  isSnackOpen,
  setIsSnackOpen,
  setIsDeleteAlertOpen,
  onClickSearch,
  actSearchDetail,
  headerClickRowID,
  uri,
  componentName
) => {
  const actDeleteDetailDateRange = async () => {
    const data = refGrid?.current?.gridInst?.getCheckedRows()?.map((raw) => GetDeleteParams(componentName, raw));
    if (data !== undefined) {
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
          onClickSearch();
          actSearchDetail(headerClickRowID);
        });
    }
  };
  return [actDeleteDetailDateRange];
};

export { useDelete, useDeleteDetail, useDeleteDetailDateRange };
