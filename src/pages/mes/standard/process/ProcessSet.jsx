//공정관리✨
//🔍 OnlySearchSingleGrid.jsx 에서 사용
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProcessSet(isEditMode) {
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
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text("proc_cd", CN.proc_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("proc_nm", CN.proc_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.rText("proc_cd", CN.proc_cd, true, C.U, C.WIDTH_MIDDLE),
    col.rText("proc_nm", CN.proc_nm, true, C.U, C.WIDTH_MIDDLE),
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
      id: "proc_cd",
      name: CN.proc_cd,
    },
    {
      id: "proc_nm",
      name: CN.proc_nm,
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

export default ProcessSet;
