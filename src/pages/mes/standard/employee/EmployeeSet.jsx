//작업자관리✨
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import TuiDatePicker from "tui-date-picker";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function EmployeeSet(isEditMode, deptList, gradeList, workerGroupList) {
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
    col.list("dept_id", "dept_nm", CN.dept_nm, deptList, false, C.WIDTH_LONG),
    col.list("grade_id", "grade_nm", CN.grade_nm, gradeList, false),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd),
    col.text("emp_nm", CN.emp_nm, false),
    col.check("worker_fg", CN.worker_fg, isEditMode),
    col.check("use_fg", CN.use_fg, isEditMode),
    col.date("birthday", CN.birthday, false),
    col.text("hp", CN.hp, false),
    col.text("post", CN.post, false),
    col.text("addr", CN.addr, false, C.U, C.WIDTH_LONG),
    col.text("addr_detail", CN.addr_detail, false, C.U, C.WIDTH_LONG),
    col.date("enter_date", CN.enter_date, false),
    col.date("leave_date", CN.leave_date, false),
    col.text("remark", CN.remark, false, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.list("dept_id", "dept_nm", CN.dept_nm, deptList, true, C.WIDTH_LONG),
    col.list("grade_id", "grade_nm", CN.grade_nm, gradeList, true),
    col.text("emp_cd", CN.emp_cd, true),
    col.text("emp_nm", CN.emp_nm, true),
    col.check("worker_fg", CN.worker_fg, true),
    col.check("use_fg", CN.use_fg, true),
    col.date("birthday", CN.birthday, true),
    col.text("hp", CN.hp, true),
    col.text("post", CN.post, true),
    col.text("addr", CN.addr, true, C.U, C.WIDTH_LONG),
    col.text("addr_detail", CN.addr_detail, true, C.U, C.WIDTH_LONG),
    col.date("enter_date", CN.enter_date, true),
    col.date("leave_date", CN.leave_date, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = col.multi(["worker_fg", "use_fg"]);
  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
    {
      id: "emp_cd",
      name: CN.emp_cd,
    },
    {
      id: "emp_nm",
      name: CN.emp_nm,
    },
  ];

  return {
    data,
    columns,
    columnsModal,
    columnOptions,
    rowHeaders,
    rowHeadersModal,
    header,
    datePickerSet,
    inputSet,
  };
}

export default EmployeeSet;
