import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function WorkerGroupStatusSet() {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = col.multi(["shift_type", "work_start_time", "work_end_time"]);
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columns = [
    col.id("worker_group_status_id", CN.worker_group_status_id, C.HIDDEN_ID),
    col.id("master_emp_id", CN.master_emp_id, C.HIDDEN_ID),
    col.text("master_emp_nm", CN.master_emp_nm, false, true),

    col.text("shift_type", CN.shift_type, C.U, C.U, C.WIDTH_SUPER_SHORT),
    col.text("worker_group_nm", CN.worker_group_nm, C.U, C.U, C.WIDTH_SUPER_SHORT),
    col.text("work_start_date", CN.work_start_date, C.U, C.U, C.U, "center"),
    col.text("work_start_time", CN.work_start_time, C.U, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.text("work_end_date", CN.work_end_date, C.U, C.U, C.U, "center"),
    col.text("work_end_time", CN.work_end_time, C.U, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.text("remark", CN.remark, C.U, false),
  ];
  const columnsSelectEmp = [
    col.text("dept_nm", CN.dept_nm, false, false, C.WIDTH_MIDDLE, false, false, true),
    col.text("grade_nm", CN.grade_nm, false, false, C.WIDTH_MIDDLE, false, false, true),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, false, true, C.WIDTH_SHORT, false, false, true),
    col.text("emp_nm", CN.emp_nm, false, false, C.WIDTH_SHORT, false, false, true),
    col.text("worker_group_nm", CN.worker_group_nm, false, true, C.WIDTH_MIDDLE, false, false, true),
  ];
  const columnsWorkType = [
    col.id("work_type_id", CN.work_type_id, C.HIDDEN_ID),
    col.text("work_type_cd", CN.work_type_cd, false, false, C.WIDTH_SHORT, false, false, true),
    col.text("work_type_nm", CN.work_type_nm, false, false, C.WIDTH_SHORT, false, false, true),
  ];
  const columnsNewEmp = [
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.select("emp_cd", CN.emp_cd, true),
    col.select("emp_nm", CN.emp_nm, true),
    col.id("work_type_id", CN.work_type_id, C.HIDDEN_ID),
    col.id("work_type_cd", CN.work_type_cd, C.HIDDEN_ID),
    col.select("work_type_nm", CN.work_type_nm, true),
    col.check("leader_fg", CN.leader_fg, true),
    col.date("work_start_date", CN.work_start_date, true),
    col.text("work_start_time", CN.work_start_time, true, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.date("work_end_date", CN.work_end_date, true),
    col.text("work_end_time", CN.work_end_time, true, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnsAddEmp = [
    col.id("worker_group_status_id", CN.worker_group_status_id, C.HIDDEN_ID),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.select("emp_cd", CN.emp_cd, true),
    col.select("emp_nm", CN.emp_nm, true),
    col.id("work_type_id", CN.work_type_id, C.HIDDEN_ID),
    col.select("work_type_cd", CN.work_type_cd, true),
    col.select("work_type_nm", CN.work_type_nm, true),
    col.date("work_start_date", CN.work_start_date, true),
    col.text("work_start_time", CN.work_start_time, true, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.date("work_end_date", CN.work_end_date, true),
    col.text("work_end_time", CN.work_end_time, true, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.check("leader_fg", CN.leader_fg, true),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
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
      name: CN.total_qty2,
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
    columnsSelectEmp,
    columnsNewEmp,
    columnsAddEmp,
    inputSet,
    inputInfo,
    columnsWorkType,
  };
}
export default WorkerGroupStatusSet;
