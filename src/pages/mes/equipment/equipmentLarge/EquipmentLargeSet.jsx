//대분류관리✨
//🔍 OnlySearchSingleGrid.jsx 에서 사용
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function EquipmentLargeSet(isEditMode) {
  const data = [
    {
      id: 1,
      test: "TEST",
      test2: "TEST TEST",
    },
  ];
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
    col.id("equip_classification_id", CN.classification_id, C.HIDDEN_ID),
    col.text(
      "equip_classification_cd",
      CN.classification_cd,
      false,
      false,
      C.WIDTH_MIDDLE
    ),
    col.text(
      "equip_classification_nm",
      CN.classification_nm,
      isEditMode,
      false,
      C.WIDTH_MIDDLE
    ),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text(
      "create_user_nm",
      CN.create_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text(
      "update_user_nm",
      CN.update_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
  ];
  const columnsModal = [
    col.text(
      "equip_classification_cd",
      CN.classification_cd,
      true,
      false,
      C.WIDTH_MIDDLE
    ),
    col.text(
      "equip_classification_nm",
      CN.classification_nm,
      true,
      false,
      C.WIDTH_MIDDLE
    ),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // frozenColumn은 여기 값만 수정
  };

  const header = {};
  // const header = {
  //   height: "60",
  //   complexColumns: [
  //     {
  //       header: "ID + Name",
  //       name: "parent1",
  //       childNames: ["id", "name"],
  //     },
  //   ],
  // };

  const datePickerSet = null; // "single" || "range" || null

  const inputSet = [
    {
      id: "equip_classification_cd",
      name: CN.classification_cd,
    },
    {
      id: "equip_classification_nm",
      name: CN.classification_nm,
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

export default EquipmentLargeSet;
