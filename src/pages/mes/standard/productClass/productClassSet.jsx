import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function productClassSet(isEditMode) {
  const data = [];
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];

  const columns = [
    col.id("prod_class_id", CN.prod_class_id, C.HIDDEN_ID),
    col.text("prod_class_cd", CN.prod_class_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text(
      "prod_class_nm",
      CN.prod_class_nm,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE
    ),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.text("model_cd", CN.model_cd, true),
    col.text("model_nm", CN.model_nm, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };

  const header = {};
  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
    {
      id: "prod_class_cd",
      name: CN.prod_class_cd,
    },
    {
      id: "prod_class_nm",
      name: CN.prod_class_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
    columnsModal,
  };
}

export default productClassSet;
