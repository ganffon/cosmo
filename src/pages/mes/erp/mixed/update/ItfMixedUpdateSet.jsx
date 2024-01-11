import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ItfMixedUpdateSet() {
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
  const colPerformance = [
    col.text("request_no", "생산의뢰번호", C.U, C.U, C.WIDTH_MIDDLE, "center"),
    col.text("corp_code", "회사코드", C.U, C.U, C.U, "center"),
    col.text("plce_code", "사업장코드", C.U, C.U, C.U, "center"),
    col.text("erp_work_order_no", "ERP지시번호", C.U, C.U, C.WIDTH_MIDDLE, "center"),
    col.id("item_id", "item_id", C.HIDDEN_ID),
    col.text("item_cd", "품목코드"),
    col.text("item_nm", "품목"),
    col.text("item_spec", "규격"),
    col.id("order_line_dept_cd", "order_line_dept_cd", C.HIDDEN_ID),
    col.text("order_line_dept_nm", "라인부서"),
    col.date("work_order_date", "지시일자"),
    col.number("work_order_qty", "지시량"),
    col.text("order_emp_nm", "지시등록자", C.U, C.U, C.U, "center"),
    col.date("work_start_date", "시작일자", true),
    col.date("work_end_date", "종료일자", true),
    col.id("work_order_id", "work_order_id", C.HIDDEN_ID),

    col.id("dept_cd", "dept_cd", C.HIDDEN_ID),
    col.select("dept_nm", "생산부서", true),
    col.id("line_dept_cd", "line_dept_cd", C.HIDDEN_ID),
    col.select("line_dept_nm", "생산라인부서", true),
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
    col.text("prod_class_nm", "제품분류", C.U, C.U, C.WIDTH_SHORT, C.U, true, "text"),
    col.text("prod_cd", "품목코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("prod_nm", "품목", C.U, C.U, C.U, C.U, true, "text"),
    col.text("prod_std", "규격", C.U, C.U, C.U, C.U, true, "text"),
    col.text("lot_no", "생산Lot", C.U, C.U, C.U, C.U, true, "text"),
    col.number("input_qty", "생산중량", C.U, C.U, C.U, true, "text"),
    col.text("input_emp_nm", "생산자", C.U, C.U, C.U, "center", true, "text"),
    col.date("work_input_date", "생산일자", C.U, C.U, true, "text"),
    col.text("weigh_emp_nm", "투입자", C.U, C.U, C.U, "center", true, "text"),
    col.date("work_weigh_date", "투입일자", C.U, C.U, true, "text"),
    /**
     * MES 에서 계량자가 ERP에서는 투입자
     * MES 에서 투입자가 ERP에서는 생산자
     */
  ];
  const colSummary = [
    col.select("item_id", "ERP품목ID", true),
    col.select("item_cd", "ERP품목코드", true),
    col.select("item_nm", "ERP품목", true),
    col.text("prod_class_nm", "제품분류", C.U, C.U, C.WIDTH_SHORT),
    col.text("prod_cd", "품목코드"),
    col.text("prod_nm", "품목"),
    col.text("prod_std", "규격"),
    col.text("lot_no", "생산Lot"),
    col.number("input_qty", "생산중량", true),
    col.id("unit_cd", "unit_cd", C.HIDDEN_ID),
    col.select("unit_nm", "단위", true, C.U, "center"),

    col.date("work_input_date", "생산일자", true),

    col.id("weigh_emp_cd", "weigh_emp_cd", C.HIDDEN_ID),
    col.select("weigh_emp_nm", "투입자", true, C.U, "center"),
    col.date("work_weigh_date", "투입일자", true),
  ];
  const colEmployee = [
    col.id("work_emp_cd", "work_emp_cd", C.HIDDEN_ID),
    col.text("work_emp_nm", "생산자", C.U, C.U, C.U, "center"),
  ];

  const colErpDept = [
    col.text("dept_cd", "생산부서코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("dept_nm", "생산부서", C.U, C.U, C.U, "center", true, "text"),
  ];

  const colErpLineDept = [
    col.text("line_dept_cd", "라인부서코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("line_dept_nm", "라인부서", C.U, C.U, C.U, "center", true, "text"),
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

  const colErpItem = [
    col.text("mapping_id", "ERP품목ID", C.U, C.U, C.U, "center", true, "text"),
    col.text("mapping_cd", "ERP품목코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("mapping_nm", "ERP품목", C.U, C.U, C.U, C.U, true, "text"),
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
    colPerformance,
    colDetail,
    colSummary,
    colEmployee,
    colErpDept,
    colErpLineDept,
    colErpWorkerGroup,
    colErpUnit,
    colErpEmployee,
    colErpItem,
    columnOptions,
    // header,
  };
}

export default ItfMixedUpdateSet;
