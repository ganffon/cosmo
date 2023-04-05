import { useState, useEffect } from "react";

const useClickDelete = (refGrid) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const data = refGrid?.current?.gridInst?.getCheckedRows();
  if (data.length !== 0) {
    setIsDeleteAlertOpen(true);
  }
  return [isDeleteAlertOpen, setIsDeleteAlertOpen];
};

export { useClickDelete };
