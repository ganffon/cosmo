//작업자관리✨
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import TuiDatePicker from "tui-date-picker";
import CN from "json/ColumnName.json";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

function ProductionDownTimeSet(
  isEditMode,
  deptList,
  gradeList,
  workerGroupList
) {
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
    {
      name: "work_downtime_id",
      header: CN.work_downtime_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_id",
      header: CN.line_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_nm",
      header: CN.line_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_id",
      header: CN.proc_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_nm",
      header: CN.proc_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_id",
      header: CN.equip_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_nm",
      header: CN.equip_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_id",
      header: CN.downtime_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_type_nm",
      header: CN.downtime_type_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_nm",
      header: CN.downtime_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      validation: isEditMode
        ? {
            required: true,
          }
        : null,
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_date",
      header: CN.downtime_date,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode
        ? {
            type: "datePicker",
            options: {
              language: "ko",
              format: "yyyy-MM-dd",
            },
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "start_date",
      header: CN.start_date,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode
        ? {
            type: "datePicker",
            options: {
              language: "ko",
              format: "yyyy-MM-dd",
            },
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "start_time",
      header: CN.start_time,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "end_date",
      header: CN.end_date,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode
        ? {
            type: "datePicker",
            options: {
              language: "ko",
              format: "yyyy-MM-dd",
            },
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "end_time",
      header: CN.end_time,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime",
      header: CN.downtime,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "remark",
      header: CN.remark,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_at",
      header: CN.create_at,
      minWidth: WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_user_nm",
      header: CN.create_user_nm,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "update_at",
      header: CN.update_at,
      minWidth: WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "update_user_nm",
      header: CN.update_user_nm,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_at",
      header: CN.delete_at,
      minWidth: WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_user_nm",
      header: CN.delete_user_nm,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModal = [
    {
      name: "work_downtime_id",
      header: CN.work_downtime_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_id",
      header: CN.line_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_nm",
      header: CN.line_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_id",
      header: CN.proc_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_nm",
      header: CN.proc_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_id",
      header: CN.equip_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_nm",
      header: CN.equip_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_id",
      header: CN.downtime_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      validation: {
        required: true,
      },
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_type_nm",
      header: CN.downtime_type_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_nm",
      header: CN.downtime_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      validation: {
        required: true,
      },
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_date",
      header: CN.downtime_date,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: {
        type: "datePicker",
        options: {
          language: "ko",
          format: "yyyy-MM-dd",
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "start_date",
      header: CN.start_date,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: {
        type: "datePicker",
        options: {
          language: "ko",
          format: "yyyy-MM-dd",
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "start_time",
      header: CN.start_time,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "end_date",
      header: CN.end_date,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: {
        type: "datePicker",
        options: {
          language: "ko",
          format: "yyyy-MM-dd",
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "end_time",
      header: CN.end_time,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime",
      header: CN.downtime,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "remark",
      header: CN.remark,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_at",
      header: CN.create_at,
      minWidth: WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_user_nm",
      header: CN.create_user_nm,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "update_at",
      header: CN.update_at,
      minWidth: WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "update_user_nm",
      header: CN.update_user_nm,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_at",
      header: CN.delete_at,
      minWidth: WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_user_nm",
      header: CN.delete_user_nm,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];

  const columnLineSelect = [
    {
      name: "line_id",
      header: CN.line_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_nm",
      header: CN.line_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];

  const columnDownTimeSelect = [
    {
      name: "downtime_id",
      header: CN.downtime_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_type_nm",
      header: CN.downtime_type_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "downtime_nm",
      header: CN.downtime_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];

  const columnProcEquipSelect = [
    {
      name: "proc_id",
      header: CN.proc_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_nm",
      header: CN.proc_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_id",
      header: CN.equip_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_nm",
      header: CN.equip_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = {};
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
      id: "line_nm",
      name: CN.line_nm,
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
    columnLineSelect,
    columnProcEquipSelect,
    columnDownTimeSelect,
    datePickerSet,
    inputSet,
  };
}

export default ProductionDownTimeSet;
