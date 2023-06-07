import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SparepartsIncomeSet(isEditModeHeader, isEditModeDetail, isNewDetail) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsHeader = [
    col.id("spare_receive_id", CN.spare_receive_id, C.HIDDEN_ID),
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),

    col.id("partner_id", CN.partner_id, C.HIDDEN_ID),
    col.id("supplier_id", CN.supplier_id, C.HIDDEN_ID),
    col.text("stmt_no", CN.stmt_no, false, false, C.WIDTH_MIDDLE),

    col.date("reg_date", CN.reg_date, isEditModeHeader, C.WIDTH_SHORT),
    col.number(
      "total_price",
      CN.total_price,
      isEditModeHeader,
      C.WIDTH_SHORT,
      false
    ),
    col.number(
      "total_qty",
      CN.total_qty,
      isEditModeHeader,
      C.WIDTH_SHORT,
      false
    ),
    col.id("order_id", CN.order_id, C.HIDDEN_ID),
    col.id("spare_receive_uid", CN.spare_receive_uid, C.HIDDEN_ID),
    col.text("emp_nm", CN.emp_nm, false, false, C.WIDTH_MIDDLE),
    col.text("remark", CN.remark, isEditModeHeader, false, C.WIDTH_MIDDLE),
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

  const columnsDetail = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.id(
      "work_subdivision_detail_id",
      CN.work_subdivision_detail_id,
      C.HIDDEN_ID
    ),
    col.text("lot_no", CN.lot_no, isEditModeDetail, false, C.WIDTH_SHORT),

    col.number(
      "before_qty",
      CN.before_qty,
      isEditModeDetail,
      C.WIDTH_SHORT,
      false
    ),
    col.number(
      "after_qty",
      CN.after_qty,
      isEditModeDetail,
      C.WIDTH_SHORT,
      false
    ),
    col.number("qty", CN.qty, false, C.WIDTH_SHORT, false),
    col.text(
      "subdivision_time",
      CN.subdivision_time,
      isEditModeDetail,
      false,
      C.WIDTH_MIDDLE,
      "center"
    ),
    col.id("subdivision_uid", CN.subdivision_uid, C.HIDDEN_ID),
    col.number(
      "barcode_no",
      CN.barcode_no,
      isEditModeDetail,
      C.WIDTH_SHORT,
      false
    ),
    col.text("remark", CN.remark, isEditModeDetail, false, C.WIDTH_MIDDLE),
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

  const columnsModalHeader = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.date("reg_date", CN.reg_date, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.number("qty", CN.qty, false, C.WIDTH_SHORT, false),
    col.id("spare_receive_detail_id", CN.spare_receive_detail_id, C.HIDDEN_ID),
    col.id("to_store_id", CN.to_store_id, C.HIDDEN_ID),
    col.id("to_location_id", CN.to_location_id, C.HIDDEN_ID),
    col.id("income_uid", CN.income_uid, C.HIDDEN_ID),

    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
    col.text("barcode", CN.barcode, false, false, C.WIDTH_SHORT),
  ];
  const columnsModalDetail = [
    col.id("work_subdivision_id", CN.work_subdivision_id, C.HIDDEN_ID),
    col.id(
      "work_subdivision_detail_id",
      CN.work_subdivision_detail_id,
      C.HIDDEN_ID
    ),
    col.text("lot_no", CN.lot_no, true, false, C.WIDTH_SHORT),
    col.number("before_qty", CN.before_qty, true, C.WIDTH_SHORT, false),
    col.number("after_qty", CN.after_qty, true, C.WIDTH_SHORT, false),
    col.number("qty", CN.qty, true, C.WIDTH_SHORT, false),
    col.text(
      "subdivision_time",
      CN.subdivision_time,
      true,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.id("subdivision_uid", CN.subdivision_uid, C.HIDDEN_ID),
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
      C.U,
      "select"
    ),
    col.text(
      "prod_nm",
      CN.prod_nm,
      false,
      false,
      C.WIDTH_SHORT,
      C.U,
      C.U,
      "select"
    ),
  ];
  const inputSet = [
    {
      id: "reg_date",
      name: CN.reg_date,
    },
  ];
  const inputInfo = [
    {
      id: "reg_date",
      name: CN.reg_date,
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

export default SparepartsIncomeSet;
