import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SubdivisionPanelAllSet(onClickGridButton) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columns = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.date("subdivision_date", CN.subdivision_date),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("before_subdivision_qty", CN.before_subdivision_qty),
    col.number("after_subdivision_qty", CN.after_subdivision_qty),
    col.number("subdivision_qty", CN.subdivision_qty),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("thickness", CN.thickness, C.U, C.U, C.U, C.U, true, true),
    col.text("width", CN.width, C.U, C.U, C.U, C.U, true, true),
    col.text("length", CN.length, C.U, C.U, C.U, C.U, true, true),
  ];
  const columnsSelectLoadHeader = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, true, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, C.U, true, C.WIDTH_MIDDLE, C.U, true, true),
    col.date("subdivision_date", CN.subdivision_date),
    col.text("lot_no", CN.lot_no, C.U, true, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty),
    col.button("select", "선택", "데이터 선택", onClickGridButton),
  ];
  const columnsSelectLoadDetail = [
    col.id("work_subdivision_detail_id", CN.work_subdivision_detail_id, C.HIDDEN_ID),
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.date("subdivision_date", CN.subdivision_date),
    col.text("subdivision_time", CN.subdivision_time, C.U, C.U, C.U, "center"),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("before_subdivision_qty", CN.before_subdivision_qty),
    col.number("after_subdivision_qty", CN.after_subdivision_qty),
    col.number("subdivision_qty", CN.subdivision_qty),
  ];
  const inputSet = [
    {
      id: "lot_no",
      name: CN.lot_no,
    },
  ];
  const inputInfo = [
    {
      id: "subdivision_date",
      name: CN.subdivision_date,
    },
    {
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
    {
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "total_qty",
      name: CN.total_qty,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  return {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columns,
    columnsSelectProd,
    columnsSelectLoadHeader,
    columnsSelectLoadDetail,
    inputSet,
    inputInfo,
  };
}
export default SubdivisionPanelAllSet;
