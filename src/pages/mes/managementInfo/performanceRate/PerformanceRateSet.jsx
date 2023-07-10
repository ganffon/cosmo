import React from "react";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";

class CustomColumnHeader {
  constructor(props) {
    const columnInfo = props.columnInfo;
    const el = document.createElement("div");
    el.className = "columnHeaderMultiLine";
    el.textContent = columnInfo.header;
    this.el = el;
    console.log(el);
  }
  getElement() {
    return this.el;
  }
  render(props) {
    this.el.textContent = props.columnInfo.header;
  }
}

export const getPerformanceCol = () => [
  { header: CN.work_date, name: "work_date", width: "auto", align: "center" },

  { header: CN.target, name: "E1_target", align: "right" },
  { header: CN.perf_schedule, name: "E1_scheduled", align: "right" },
  { header: CN.perf_scheduled_qty, name: "E1_scheduled_qty", width: 130, align: "right" },
  { header: CN.perf_qty, name: "E1_qty", align: "right" },
  { header: CN.performance, name: "E1_performance", align: "right" },

  { header: CN.target, name: "E2_target", align: "right" },
  { header: CN.perf_schedule, name: "E2_scheduled", align: "right" },
  { header: CN.perf_scheduled_qty, name: "E2_scheduled_qty", width: 130, align: "right" },
  { header: CN.perf_qty, name: "E2_qty", align: "right" },
  { header: CN.performance, name: "E2_performance", align: "right" },

  { header: CN.target, name: "E3_target", align: "right" },
  { header: CN.perf_schedule, name: "E3_scheduled", align: "right" },
  { header: CN.perf_scheduled_qty, name: "E3_scheduled_qty", width: 130, align: "right" },
  { header: CN.perf_qty, name: "E3_qty", align: "right" },
  { header: CN.performance, name: "E3_performance", align: "right" },

  { header: "합계", name: "total_performance", align: "right", width: "auto" },
];
export const getPerformanceHeader = () => ({
  height: 60,
  complexColumns: [
    {
      header: "E1",
      name: "E1",
      childNames: ["E1_target", "E1_scheduled", "E1_scheduled_qty", "E1_qty", "E1_performance"],
    },
    {
      header: "E2",
      name: "E2",
      childNames: ["E2_target", "E2_scheduled", "E2_scheduled_qty", "E2_qty", "E2_performance"],
    },
    {
      header: "E3",
      name: "E3",
      childNames: ["E3_target", "E3_scheduled", "E3_scheduled_qty", "E3_qty", "E3_performance"],
    },
  ],
});
