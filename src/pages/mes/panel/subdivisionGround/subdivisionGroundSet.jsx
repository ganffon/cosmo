import CN from "json/ColumnName.json";
import * as col from "custom/GridColumnSet";
import * as C from "constant/Grid";

export function subdivisionGroundSet(continueButton = () => {}) {
  const data = [];
  const rowHeaders = ["rowNum"];
  const rowHeadersModal = ["rowNum"];

  const gridCol = [
    col.text("lot_no", CN.lot_no, false, C.U, C.WIDTH_MIDDLE),
    col.text("subdivision_qty", CN.weight, true, false, C.WIDTH_MIDDLE),
    col.id("work_subdivision_detail_id", C.U, C.HIDDEN_ID),
  ];

  const commonGridCol = [
    col.button("continue", "바코드", "재출력", continueButton),
    col.text("subdivision_date", CN.date, false, false, C.U, "center"),
    col.text("subdivision_time", CN.hour_time, false, false, C.WIDTH_SUPER_SHORT, "center"),
    col.text("lot_no", CN.lot_no, false, false),
    col.number("bag_cnt", CN.bag_count, false, C.WIDTH_SHORT, false),
    col.number("total_qty", CN.bag_qty, false, C.WIDTH_SHORT, false),
    col.text("worker_group_nm", CN.worker_group_nm, false, false, C.WIDTH_SUPER_SHORT, "center"),
    col.text("remark", CN.remark, false, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false),
    col.id("work_subdivision_id", C.U, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
  ];

  const inputSet = [
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  return {
    data,
    rowHeaders,
    rowHeadersModal,
    inputSet,
    gridCol,
    commonGridCol,
  };
}
