import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ItfPackingUpdateSet() {
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
  const colPacking = [
    col.text("request_no", "생산의뢰번호", C.U, C.U, C.WIDTH_MIDDLE, "center"),
    col.text("corp_code", "회사코드", C.U, true, C.U, "center"),
    col.text("plce_code", "사업장코드", C.U, true, C.U, "center"),
    col.text("erp_work_order_no", "ERP지시번호", C.U, C.U, C.WIDTH_MIDDLE, "center"),
    col.id("item_id", "item_id", C.HIDDEN_ID),
    col.text("item_cd", "품목코드"),
    col.text("item_nm", "품목"),
    col.text("item_spec", "규격"),
    col.id("order_line_dept_cd", "order_line_dept_cd", C.HIDDEN_ID),
    col.text("order_line_dept_nm", "라인부서"),
    col.date("work_order_date", "지시일자"),
    col.number("work_order_qty", "지시중량"),
    col.text("order_emp_nm", "지시등록자", C.U, C.U, C.U, "center"),
    col.date("work_start_date", "시작일자", true),
    col.date("work_end_date", "종료일자", true),
    col.id("work_order_id", "work_order_id", C.HIDDEN_ID),

    col.id("dept_cd", "dept_cd", C.HIDDEN_ID),
    col.text("dept_nm", "생산부서"),
    col.id("line_dept_cd", "line_dept_cd", C.HIDDEN_ID),
    col.text("line_dept_nm", "생산라인부서"),
    col.id("worker_group_cd", "worker_group_cd", C.HIDDEN_ID),
    col.select("worker_group_nm", "작업조", true, C.U, "center"),
    col.text("lot_no", "Lot No"),
    col.number("work_qty", "생산량", true),
    col.id("unit_cd", "unit_cd", C.HIDDEN_ID),
    col.select("unit_nm", "단위", true, C.U, "center"),

    col.id("input_emp_cd", "input_emp_cd", C.HIDDEN_ID),
    col.select("input_emp_nm", "I/F등록자", true, C.U, "center"),
  ];

  const colDetail = [
    col.id("work_packing_id", "work_packing_id", C.HIDDEN_ID),
    col.id("work_packing_detail_id", "work_packing_detail_id", C.HIDDEN_ID),
    col.text("lot_no", "포장Lot", C.U, C.U, C.U, C.U, true, "text"),
    col.text("packing_no", "BAG번호", C.U, C.U, C.WIDTH_SHORT, "center", true, "text"),
    col.number("packing_qty", "포장중량", C.U, C.U, C.U, true, "text"),
    col.date("work_packing_date", "포장일자", C.U, C.U, true, "text"),
    col.text("work_packing_time", "포장시간", C.U, C.U, C.WIDTH_SHORT, "center", true, "text"),
    col.id("packing_emp_cd", "packing_emp_cd", C.HIDDEN_ID),
    col.text("packing_emp_nm", "포장자", C.U, C.U, C.U, "center", true, "text"),
  ];

  const colMixed = [
    col.id("item_id", "item_id", C.HIDDEN_ID),
    col.select("item_cd", "ERP품목코드", true),
    col.select("item_nm", "ERP품목", true),
    col.select("input_lot_no", "투입Lot", true),
    col.id("stock_dept_cd", "stock_dept_cd", C.HIDDEN_ID),
    col.text("stock_dept_nm", "재고부서"),
    col.date("stock_in_date", "재공일자"),
    col.id("input_dept_cd", "input_dept_cd", C.HIDDEN_ID),
    col.text("input_dept_nm", "투입부서"),
    col.date("in_date", "투입일자"),
    col.id("in_emp_cd", "in_emp_cd", C.HIDDEN_ID),
    col.select("in_emp_nm", "투입자", true, C.U, "center"),
    col.number("input_qty", "투입중량"),
    col.id("input_unit_cd", "input_unit_cd", C.HIDDEN_ID),
    col.text("input_unit_nm", "단위", C.U, C.U, C.WIDTH_SHORT, "center"),
  ];

  const colEmployee = [
    col.id("work_emp_cd", "work_emp_cd", C.HIDDEN_ID),
    col.text("work_emp_nm", "포장자", C.U, C.U, C.U, "center"),
  ];

  const colErpWorkerGroup = [
    col.text("worker_group_cd", "작업조코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("worker_group_nm", "작업조", C.U, C.U, C.U, "center", true, "text"),
  ];

  const colErpUnit = [
    col.text("unit_cd", "단위코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("unit_nm", "단위", C.U, C.U, C.U, "center", true, "text"),
  ];

  const colErpEmployee = [
    col.text("emp_cd", CN.emp_cd, C.U, C.U, C.U, "center", true, "text"),
    col.text("emp_nm", CN.emp_nm, C.U, C.U, C.U, "center", true, "text"),
  ];

  const colErpMixed = [
    col.text("erp_yn", "ERP 처리", C.U, C.U, C.WIDTH_SHORT, "center", true, "select"),
    col.text("erp_date", "ERP 처리일시", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "select"),
    col.text("erp_work_order_no", "ERP지시번호", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "select"),
    col.text("corp_code", "회사코드", C.U, true, C.WIDTH_SHORT, "center", true, "select"),
    col.text("plce_code", "사업장코드", C.U, true, C.WIDTH_SHORT, "center", true, "select"),
    col.text("request_no", "생산의뢰번호", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "select"),
    col.text("item_cd", "품목코드", C.U, C.U, C.U, C.U, true, "select"),
    col.text("item_nm", "품목", C.U, C.U, C.U, C.U, true, "select"),
    col.text("item_spec", "규격", C.U, C.U, C.U, C.U, true, "select"),
    col.id("dept_cd", "dept_cd", C.HIDDEN_ID),
    col.id("line_dept_cd", "line_dept_cd", C.HIDDEN_ID),
    col.select("line_dept_nm", "라인부서명", C.U, C.U, C.U, true, "select"),
    col.date("work_start_date", "시작일자", C.U, C.U, true, "select"),
    col.date("work_end_date", "종료일자", C.U, C.U, true, "select"),
    col.text("lot_no", "Lot", C.U, C.U, C.U, C.U, true, "select"),
    col.number("work_qty", "생산중량", C.U, C.U, C.U, true, "select"),
    col.id("unit_cd", "unit_cd", C.HIDDEN_ID),
    col.text("unit_nm", "단위", C.U, C.U, C.WIDTH_SHORT, "center"),
    col.id("input_emp_cd", "input_emp_cd", C.HIDDEN_ID),
    col.text("input_emp_nm", "I/F등록자", C.U, C.U, C.U, "center", true, "select"),
    col.text("input_date", "I/F일자", C.U, C.U, C.U, "center", true, "select"),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // frozenColumn은 여기 값만 수정
  };

  // const header = {
  //   height: "60",
  //   complexColumns: [
  //     {
  //       header: "ERP 작업지시",
  //       name: "erp",
  //       childNames: [
  //         "request_no",
  //         "corp_code",
  //         "plce_code",
  //         "erp_work_order_no",
  //         "item_cd",
  //         "item_nm",
  //         "item_spec",
  //         "order_line_dept_cd",
  //         "order_line_dept_nm",
  //         "work_order_date",
  //         "work_order_qty",
  //         "order_emp_cd",
  //         "order_emp_nm",
  //         "work_start_date",
  //         "work_end_date",
  //       ],
  //     },
  //     {
  //       header: "혼합실적 정보",
  //       name: "Mixed",
  //       childNames: [
  //         "dept_cd",
  //         "dept_nm",
  //         "line_dept_cd",
  //         "line_dept_nm",
  //         "worker_group_cd",
  //         "worker_group_nm",
  //         "lot_no",
  //         "unit_cd",
  //         "unit_nm",
  //         "work_qty",
  //         "input_emp_cd",
  //         "input_emp_nm",
  //       ],
  //     },
  //   ],
  // };

  return {
    colPacking,
    colDetail,
    colMixed,
    colEmployee,
    colErpWorkerGroup,
    colErpUnit,
    colErpEmployee,
    colErpMixed,
    columnOptions,
    // header,
  };
}

export default ItfPackingUpdateSet;
