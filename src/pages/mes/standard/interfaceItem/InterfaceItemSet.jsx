import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function InterfaceItemSet(isEditMode, infcItemTypeList) {
  const data = [];
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  /** 🔸columns ❗
   * editor: false||"text"
   * whiteSpace: "nowrap"||"normal"||"pre"||"pre-wrap"||"pre-line"
   * sortable: true||false
   * require: true||false
   * rowSpan: true||false
   * hidden: true||false
   * align: "left"||"center"||"right"
   * filter: false||"select"||{type:"text",operator:"OR"}
   */
  const columns = [
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.list(
      "infc_item_type_id",
      "infc_item_type_nm",
      CN.infc_item_type_nm,
      infcItemTypeList,
      isEditMode
    ),
    col.id("infc_item_id", CN.infc_item_id, C.HIDDEN_ID),
    col.text("infc_item_cd", CN.infc_item_cd),
    col.text("infc_item_nm", CN.infc_item_nm, isEditMode),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.list(
      "infc_item_type_id",
      "infc_item_type_nm",
      CN.infc_item_type_nm,
      infcItemTypeList,
      true
    ),
    col.rText("infc_item_cd", CN.infc_item_cd, true),
    col.rText("infc_item_nm", CN.infc_item_nm, true),
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
      id: "infc_item_cd",
      name: CN.infc_item_cd,
    },
    {
      id: "infc_item_nm",
      name: CN.infc_item_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnsModal,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default InterfaceItemSet;
