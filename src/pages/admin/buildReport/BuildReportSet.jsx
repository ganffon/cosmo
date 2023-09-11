//라인관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function BuildReportSet(onEditBtn, onApplyBtn) {
  const data = [];
  const rowNumCheck = ["checkbox", "rowNum"];
  const rowNum = ["rowNum"];
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
    col.text("version", CN.version, C.U, C.U, C.WIDTH_MIDDLE),
    col.button("edit", CN.edit, "수정", onEditBtn),
    col.text("title", CN.buildTitle, C.U, C.U, "500"),
    col.text("contents", CN.buildContents, C.U, C.U, "800"),
    col.button("apply_fg", CN.apply_fg, "적용", onApplyBtn, "미적용", "Toggle"),
    col.id("deploy_version_id", CN.deploy_version_id, C.HIDDEN_ID),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };

  const header = {
    //🔸headerMerge
    // height: 100,
    // complexColumns: [
    //   {
    //     header: "test",
    //     name: "test_test",
    //     childNames: ["line_cd", "line_nm"],
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
    //🔸multiLine
    // columns: [
    //   {
    //     name: "line_cd",
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
  };
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

  return {
    data,
    rowNumCheck,
    rowNum,
    columns,
    columnOptions,
    header,
  };
}

export default BuildReportSet;
