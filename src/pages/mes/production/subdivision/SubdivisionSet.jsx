import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SubdivisionSet(
  isEditModeHeader,
  isEditModeDetail,
  isNewDetail,
  barcodePrintDetail,
  barcodePrintHeader
) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsHeader = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.date(
      "subdivision_date",
      CN.subdivision_date,
      isEditModeHeader,
      C.WIDTH_SHORT
    ),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, isEditModeHeader, C.WIDTH_SHORT),
    col.select("prod_nm", CN.prod_nm, isEditModeHeader, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty, false, C.WIDTH_SHORT, false),
    col.button(
      "barcode_no",
      CN.barcode_no,
      CN.barcode_no,
      barcodePrintHeader,
      false
    ),
    col.text("remark", CN.remark, isEditModeHeader, false, C.WIDTH_MIDDLE),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT),
  ];
  const columnsDetail = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.id(
      "work_subdivision_detail_id",
      CN.work_subdivision_detail_id,
      C.HIDDEN_ID
    ),
    col.text("lot_no", CN.lot_no, isEditModeDetail, false, C.WIDTH_SHORT),
    col.number(
      "before_subdivision_qty",
      CN.before_subdivision_qty,
      isEditModeDetail,
      C.WIDTH_SHORT,
      false
    ),
    col.number(
      "after_subdivision_qty",
      CN.after_subdivision_qty,
      isEditModeDetail,
      C.WIDTH_SHORT,
      false
    ),
    col.number(
      "subdivision_qty",
      CN.subdivision_qty,
      false,
      C.WIDTH_SHORT,
      false
    ),
    col.date(
      "subdivision_date",
      CN.subdivision_date,
      isEditModeDetail,
      C.WIDTH_SHORT
    ),
    col.text(
      "subdivision_time",
      CN.subdivision_time,
      isEditModeDetail,
      false,
      C.WIDTH_MIDDLE,
      "center"
    ),
    col.id("subdivision_emp_id", CN.subdivision_emp_id, C.HIDDEN_ID),
    col.button(
      "barcode_no",
      CN.barcode_no,
      CN.barcode_no,
      barcodePrintHeader,
      false
    ),
    col.text("remark", CN.remark, isEditModeDetail, false, C.WIDTH_MIDDLE),

    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT),
  ];
  const columnsModalHeader = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.date(
      "subdivision_date",
      CN.subdivision_date,
      isNewDetail,
      C.WIDTH_SHORT
    ),
    col.select("prod_id", CN.prod_id, isNewDetail, C.WIDTH_SHORT),
    col.select("prod_cd", CN.prod_cd, isNewDetail, C.WIDTH_SHORT),
    col.select("prod_nm", CN.prod_nm, isNewDetail, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, isNewDetail, true, C.WIDTH_MIDDLE),
    col.number(
      "total_qty",
      CN.total_qty,
      false,
      C.WIDTH_SHORT,
      isNewDetail ? false : true
    ),
    col.text("remark", CN.remark, isNewDetail, false, C.WIDTH_MIDDLE),
  ];
  const columnsModalDetail = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.id(
      "work_subdivision_detail_id",
      CN.work_subdivision_detail_id,
      C.HIDDEN_ID
    ),
    col.text("lot_no", CN.lot_no, true, false, C.WIDTH_SHORT),

    col.number(
      "before_subdivision_qty",
      CN.before_subdivision_qty,
      true,
      C.WIDTH_SHORT,
      false
    ),
    col.number(
      "after_subdivision_qty",
      CN.after_subdivision_qty,
      true,
      C.WIDTH_SHORT,
      false
    ),
    col.number(
      "subdivision_qty",
      CN.subdivision_qty,
      true,
      C.WIDTH_SHORT,
      false
    ),
    col.date("subdivision_date", CN.subdivision_date, true, C.WIDTH_SHORT),
    col.text(
      "subdivision_time",
      CN.subdivision_time,
      true,
      false,
      C.WIDTH_SHORT
    ),
    col.id("subdivision_emp_id", CN.subdivision_emp_id, C.HIDDEN_ID),
    col.text("remark", CN.remark, true, false, C.WIDTH_MIDDLE),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text(
      "prod_cd",
      CN.prod_cd,
      false,
      false,
      C.WIDTH_SHORT,
      C.U,
      false,
      "select"
    ),
    col.text(
      "prod_nm",
      CN.prod_nm,
      false,
      false,
      C.WIDTH_SHORT,
      C.U,
      false,
      "select"
    ),
  ];
  const inputSet = [
    {
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
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
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    inputSet,
    inputInfo,
  };
}
export default SubdivisionSet;
