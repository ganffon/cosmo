import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function OutgoingLotHistorySet() {
  const data = [];
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
    col.id("lot_check_id", "lot_check_id", C.HIDDEN_ID),
    col.date("scan_date", "스캔일자"),
    col.text("scan_time", "스캔시간", false, false, C.WIDTH_SHORT, "center"),
    col.text(
      "scan_result",
      "스캔결과",
      false,
      false,
      C.WIDTH_SHORT,
      "center",
      false,
      "text"
    ),
    col.text("result_msg", "결과 메세지", false, false, "400"),
    col.text("customer_barcode", "고객사 바코드", false, false, "500"),
    col.text("customer_lot_no", "고객사 LOT", false, false, C.WIDTH_MIDDLE),
    col.text(
      "customer_bag_no",
      "고객사 Bag No",
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.text("barcode", "사내 바코드", false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", "사내 LOT"),
    col.text(
      "packing_no",
      "사내 Bag No",
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.id("emp_id", "emp_id", C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, false, false, C.WIDTH_SHORT),
    col.text(
      "emp_nm",
      CN.packing_emp_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.text("prod_gbn_nm", CN.prod_gbn_nm),
    col.text("model_nm", CN.model_nm),
    col.text("prod_type_nm", CN.prod_type_nm),
    col.text("prod_type_small_nm", CN.prod_type_small_nm),
    col.text("prod_class_nm", CN.prod_class_nm),
    col.text("prod_cd", CN.prod_cd),
    col.text("prod_nm", CN.prod_nm),
    col.text("prod_std", CN.prod_std),
    col.text("packing_date", CN.work_packing_date),
    col.text("packing_time", CN.work_packing_time),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 2,
    frozenCount: 3, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = "single";

  return {
    data,
    columns,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
  };
}

export default OutgoingLotHistorySet;
