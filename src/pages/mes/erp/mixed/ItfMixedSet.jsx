import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ItfMixedSet() {
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
    col.text("erp_yn", "ERP 처리", C.U, C.U, C.WIDTH_SHORT, "center", true, "select"),
    col.text("erp_date", "ERP 처리일시", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "select"),
    col.text("erp_work_order_no", "ERP지시번호", C.U, C.U, C.WIDTH_MIDDLE, "center", true, "select"),
    col.text("corp_code", "회사코드", C.U, C.U, C.WIDTH_SHORT, "center", true, "select"),
    col.text("plce_code", "사업장코드", C.U, C.U, C.WIDTH_SHORT, "center", true, "select"),
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
    col.number("work_qty", "생산수량", C.U, C.U, C.U, true, "select"),
    col.id("unit_cd", "unit_cd", C.HIDDEN_ID),
    col.select("unit_nm", "단위", C.U, C.U, C.U, true, "select"),
    col.id("input_emp_cd", "input_emp_cd", C.HIDDEN_ID),
    col.text("input_emp_nm", "I/F등록자", C.U, C.U, C.U, "center", true, "select"),
    col.text("input_date", "I/F일자", C.U, C.U, C.U, "center", true, "select"),
  ];

  const colInput = [
    col.id("item_id", "item_id", C.HIDDEN_ID),
    col.text("item_cd", "품목코드", C.U, C.U, C.U, C.U, true, "select"),
    col.text("item_nm", "품목", C.U, C.U, C.U, C.U, true, "select"),
    col.text("item_spec", "규격", C.U, C.U, C.U, C.U, true, "select"),
    col.text("input_lot_no", "생산Lot", C.U, C.U, C.U, C.U, true, "select"),
    col.text("input_unit_nm", "단위", C.U, C.U, C.U, C.U, true, "select"),
    col.number("input_qty", "생산중량", C.U, C.U, C.U, true, "select"),
    col.id("stock_dept_cd", "stock_dept_cd", C.HIDDEN_ID),
    col.text("stock_dept_nm", "재고부서", C.U, C.U, C.U, C.U, true, "select"),
    col.date("stock_in_date", "재고입고일자", C.U, C.U, true, "select"),
    col.date("in_date", "생산일자", C.U, C.U, true, "select"),
    col.id("input_dept_cd", "input_dept_cd", C.HIDDEN_ID),
    col.text("input_dept_nm", "생산부서", C.U, C.U, C.U, C.U, true, "select"),

    col.id("in_emp_cd", "in_emp_cd", C.HIDDEN_ID),
    col.text("in_emp_nm", "생산자", C.U, C.U, C.U, "center", true, "select"),

    col.id("input_input_cd", "input_input_cd", C.HIDDEN_ID),
    col.text("input_input_nm", "I/F등록자", C.U, C.U, C.U, "center", true, "select"),
    col.text("input_date", "I/F일자", C.U, C.U, C.U, "center", true, "select"),
  ];

  const colEmployee = [
    col.id("work_emp_cd", "work_emp_cd", C.HIDDEN_ID),
    col.text("work_emp_nm", "생산자", C.U, C.U, C.U, "center", true, "select"),
    col.id("input_emp_cd", "input_emp_cd", C.HIDDEN_ID),
    col.text("input_emp_nm", "I/F등록자", C.U, C.U, C.U, "center", true, "select"),
    col.text("input_date", "I/F일자", C.U, C.U, C.U, "center", true, "select"),
  ];

  const colErpLineDept = [
    col.text("line_dept_cd", "라인부서코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("line_dept_nm", "라인부서", C.U, C.U, C.U, C.U, true, "text"),
  ];

  const colErpUnit = [
    col.text("unit_cd", "단위코드", C.U, C.U, C.U, C.U, true, "text"),
    col.text("unit_nm", "단위", C.U, C.U, C.U, C.U, true, "text"),
  ];

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
    colErpLineDept,
    colErpUnit,
    columnOptions,
    header,
    headerNew,
  };
}

export default ItfMixedSet;
