import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ItfMixedSet(isEditMode) {
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
    col.text("erp_yn", "ERP 처리", C.U, C.U, C.WIDTH_SHORT, "center", true, "text"),
    col.text("erp_date", "ERP 처리일자", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "text"),
    col.text("erp_work_order_no", "ERP지시번호", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "text"),
    col.text("corp_code", "회사코드", C.U, C.U, C.WIDTH_SHORT, "center", true, "text"),
    col.text("plce_code", "사업장코드", C.U, C.U, C.WIDTH_SHORT, "center", true, "text"),
    col.text("request_no", "생산의뢰번호", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "text"),
    col.text("item_cd", "품목코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("item_nm", "품목", C.U, C.U, C.U, C.U, true, "text"),
    col.text("item_spec", "규격", C.U, C.U, C.U, C.U, true, "text"),
    col.id("line_dept_cd", "라인부서코드", C.HIDDEN_ID),
    col.select("line_dept_nm", "라인부서명", isEditMode, C.U, C.U, true, "text"),
    col.date("work_start_date", "시작일자", isEditMode, C.U, true, "text"),
    col.date("work_end_date", "종료일자", isEditMode, C.U, true, "text"),
    col.number("work_qty", "생산수량", isEditMode, C.U, C.U, true, "text"),
    col.text("unit_nm", "단위", C.U, C.U, C.U, "center", true, "text"),
    col.text("input_emp_cd", "I/F등록자코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("input_emp_nm", "I/F등록자", C.U, C.U, C.U, "center", true, "text"),
    col.text("input_date", "I/F일자", C.U, C.U, C.U, "center", true, "text"),
  ];

  const colInput = [];
  const colEmployee = [];

  const columnsNew = [
    col.select("request_no", "생산의뢰번호", true),
    col.select("corp_code", "회사코드", true),
    col.select("plce_code", "사업장코드", true),
    col.select("prod_cd", "품목코드", true),
    col.select("prod_nm", "품목", true),
    col.select("prod_std", "규격", true),
    col.select("work_order_no", "지시번호", true),
    col.select("line_dept_cd", "라인부서코드", true),
    col.select("line_dept_nm", "라인부서명", true),
    col.date("work_order_date", "지시일자", true),
    col.date("work_start_date", "시작일자", true),
    col.date("work_end_date", "종료일자", true),
    col.number("work_order_qty", "지시수량", true),
    col.select("order_emp_cd", "지시등록자코드", true),
    col.select("order_emp_nm", "지시등록자", true),
    col.select("input_emp_cd", "I/F등록자코드", true),
    col.select("input_emp_nm", "I/F등록자", true),
    col.id("prod_id", "품목ID", C.HIDDEN_ID),
    col.id("work_order_id", "지시ID", C.HIDDEN_ID),
  ];
  const columnsRequest = [
    col.text("request_no", "생산의뢰번호", C.U, C.U, C.U, "center", true, "text"),
    col.text("corp_code", "회사코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("plce_code", "사업장코드", C.U, C.U, C.U, "center", true, "text"),
    col.text("prod_cd", "품목코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("prod_nm", "품목", C.U, C.U, C.U, C.U, true, "text"),
    col.text("prod_std", "규격", C.U, C.U, C.U, C.U, true, "text"),
  ];
  const columnsOrder = [
    col.text("work_order_no", "지시번호", C.U, C.U, C.U, "center", true, "text"),
    col.text("line_dept_cd", "라인부서코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("line_dept_nm", "라인부서명", C.U, C.U, C.U, C.U, true, "text"),
    col.date("work_order_date", "지시일자", C.U, C.U, C.U, C.U, true, "text"),
    col.date("work_start_date", "시작일자", C.U, C.U, C.U, C.U, true, "text"),
    col.date("work_end_date", "종료일자", C.U, C.U, C.U, C.U, true, "text"),
    col.number("work_order_qty", "지시수량", C.U, C.U, C.U, true, "text"),
    col.id("work_order_id", "지시ID", C.HIDDEN_ID),
  ];
  const columnsLineDept = [
    col.text("line_dept_cd", "라인부서코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("line_dept_nm", "라인부서명", C.U, C.U, C.U, C.U, true, "text"),
    col.text("dept_nm", "부서", C.U, C.U, C.U, C.U, true, "text"),
  ];
  const columnsEmployee = [
    col.text("emp_cd", CN.emp_cd, C.U, C.U, C.U, "center", true, "text"),
    col.text("emp_nm", CN.emp_nm, C.U, C.U, C.U, "center", true, "text"),
  ];
  // `?use_fg=true&worker_fg=true`
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // frozenColumn은 여기 값만 수정
  };

  const header = {};
  const headerNew = {
    height: "60",
    complexColumns: [
      {
        header: "ERP",
        name: "ERP",
        childNames: ["request_no", "corp_code", "plce_code", "prod_cd", "prod_nm", "prod_std"],
      },
      {
        header: "FacdoriOn",
        name: "FacdoriOn",
        childNames: [
          "work_order_no",
          "line_dept_cd",
          "line_dept_nm",
          "work_order_date",
          "work_start_date",
          "work_end_date",
          "work_order_qty",
          "order_emp_cd",
          "order_emp_nm",
          "input_emp_cd",
          "input_emp_nm",
        ],
      },
    ],
  };

  return {
    colPerformance,
    colInput,
    colEmployee,
    columnsNew,
    columnsRequest,
    columnsOrder,
    columnsLineDept,
    columnsEmployee,
    columnOptions,
    header,
    headerNew,
  };
}

export default ItfMixedSet;
