import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function DownTimePanelSet(onDowntimeEnd = () => {}) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = col.multi(["start_time"]);
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columns = [
    col.id("work_downtime_id", CN.work_downtime_id, C.HIDDEN_ID),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false),
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text("proc_nm", CN.proc_nm, false, C.U, C.WIDTH_MIDDLE),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm, false, C.U, C.WIDTH_MIDDLE),
    col.date("start_date", CN.start_date, false),
    col.text("start_time", CN.start_time, false, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.text("remark", CN.remark, false, false, C.WIDTH_LONG),
    col.button("downtimeEnd", "종료", "종료 입력", onDowntimeEnd),
  ];
  const columnsEquip = [
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text("proc_nm", CN.proc_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
  ];
  const columnsDowntime = [
    col.id("downtime_type_id", CN.downtime_type_id, C.HIDDEN_ID),
    col.text("downtime_type_nm", CN.downtime_type_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.id("downtime_id", CN.downtime_id, C.HIDDEN_ID),
    col.text("downtime_nm", CN.downtime_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
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
    columnsEquip,
    columnsDowntime,
    inputSet,
    inputInfo,
  };
}
export default DownTimePanelSet;
