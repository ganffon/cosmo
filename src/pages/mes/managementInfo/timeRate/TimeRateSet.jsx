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

export const getCol = () => [
  { header: CN.work_date, name: "work_date", align: "center" },
  { header: CN.operating_hours, name: "E1_time", align: "right" },
  { header: CN.planned_downTime, name: "E1_scheduled", align: "right" },
  { header: CN.unplanned_downTime, name: "E1_non_scheduled", align: "right" },
  { header: CN.time_rate, name: "E1_availability", align: "right" },

  { header: CN.operating_hours, name: "E2_time", align: "right" },
  { header: CN.planned_downTime, name: "E2_scheduled", align: "right" },
  { header: CN.unplanned_downTime, name: "E2_non_scheduled", align: "right" },
  { header: CN.time_rate, name: "E2_availability", align: "right" },

  { header: CN.operating_hours, name: "E3_time", align: "right" },
  { header: CN.planned_downTime, name: "E3_scheduled", align: "right" },
  { header: CN.unplanned_downTime, name: "E3_non_scheduled", align: "right" },
  { header: CN.time_rate, name: "E3_availability", align: "right" },

  { header: "합계", name: "total_availability", align: "right", width: "auto" },
];
export const getTimeHeader = () => ({
  height: 60,
  complexColumns: [
    {
      header: "E1",
      name: "E1",
      childNames: ["E1_time", "E1_scheduled", "E1_non_scheduled", "E1_availability"],
    },
    {
      header: "E2",
      name: "E2",
      childNames: ["E2_time", "E2_scheduled", "E2_non_scheduled", "E2_availability"],
    },
    {
      header: "E3",
      name: "E3",
      childNames: ["E3_time", "E3_scheduled", "E3_non_scheduled", "E3_availability"],
    },
  ],
});

export const getAutoTimeHeader = () => ({
  height: 60,
  complexColumns: [
    {
      header: "E1",
      name: "E1",
      childNames: ["E1_time", "E1_downtime", "E1_facility"],
    },
    {
      header: "E2",
      name: "E2",
      childNames: ["E2_time", "E2_downtime", "E2_facility"],
    },
    {
      header: "E3",
      name: "E3",
      childNames: ["E3_time", "E3_downtime", "E3_facility"],
    },
  ],
});
export const getAutoCol = () => [
  { header: "생산일자", name: "work_date", align: "center" },

  { header: "조업시간", name: "E1_time", align: "right" },
  { header: "비가동시간", name: "E1_downtime", align: "right" },
  { header: "설비가동률", name: "E1_facility", align: "right" },

  { header: "조업시간", name: "E2_time", align: "right" },
  { header: "비가동시간", name: "E2_downtime", align: "right" },
  { header: "설비가동률", name: "E2_facility", align: "right" },

  { header: "조업시간", name: "E3_time", align: "right" },
  { header: "비가동시간", name: "E3_downtime", align: "right" },
  { header: "설비가동률", name: "E3_facility", align: "right" },

  { header: "합계", name: "total_facility", align: "right" },
];

export const getData = (tmpStr) => {
  const tmpRows = [];
  tmpStr.data.rows.map((row) => {
    const createAt = new Date(row.create_at);
    let formattedCreateAt = `${createAt.getFullYear()}-${(createAt.getMonth() + 1).toString().padStart(2, "0")}-${createAt
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    if (isNaN(createAt.getTime())) {
      formattedCreateAt = "TOTAL";
    }

    const rowData = {
      create_at: formattedCreateAt,
      e1_work: row.e1_work,
      e1_pTime: row.e1_pTime,
      e1_nTime: row.e1_nTime,
      e1_Oper: row.e1_Oper,
      e2_work: row.e2_work,
      e2_pTime: row.e2_pTime,
      e2_nTime: row.e2_nTime,
      e2_Oper: row.e2_Oper,
      e3_work: row.e3_work,
      e3_pTime: row.e3_pTime,
      e3_nTime: row.e3_nTime,
      e3_Oper: row.e3_Oper,
      total: row.total,
    };

    tmpRows.push(rowData);
    return rowData;
  });

  return tmpRows;
};
