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

function EmployeeSet(isEditMode, deptList, gradeList, workingGroupList) {
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
    isEditMode
      ? {
          name: "dept_id",
          header: CN.dept_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: deptList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "dept_nm",
          header: CN.dept_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          editor: false,
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        },
    isEditMode
      ? {
          name: "grade_id",
          header: CN.grade_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: gradeList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "grade_nm",
          header: CN.grade_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          editor: false,
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        },
    {
      name: "emp_id",
      header: CN.emp_id,
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
      name: "emp_cd",
      header: CN.emp_cd,
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
      name: "emp_nm",
      header: CN.emp_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    isEditMode
      ? {
          name: "worker_group_id",
          header: CN.worker_group_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: workingGroupList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "worker_group_nm",
          header: CN.worker_group_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          editor: false,
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        },
    {
      name: "birthday",
      header: CN.birthday,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: isEditMode
        ? {
            type: "datePicker",
            options: {
              language: "ko",
              format: "yyyy-MM-dd",
            },
          }
        : false,
      formatter: function (value) {
        return CustomGrid.DateFormat(value);
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "hp",
      header: CN.hp,
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
      name: "post",
      header: CN.post,
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
      name: "addr",
      header: CN.addr,
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
      name: "addr_detail",
      header: CN.addr_detail,
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
      name: "enter_date",
      header: CN.enter_date,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: isEditMode
        ? {
            type: "datePicker",
            options: {
              language: "ko",
              format: "yyyy-MM-dd",
            },
          }
        : false,
      formatter: function (value) {
        return CustomGrid.DateFormat(value);
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "leave_date",
      header: CN.leave_date,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: isEditMode
        ? {
            type: "datePicker",
            options: {
              language: "ko",
              format: "yyyy-MM-dd",
            },
          }
        : false,
      formatter: function (value) {
        return CustomGrid.DateFormat(value);
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "worker_fg",
      header: CN.worker_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "worker_fg",
          disabled: isEditMode ? false : true,
        },
      },
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "use_fg",
      header: CN.use_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "use_fg",
          disabled: isEditMode ? false : true,
        },
      },
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "center",
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
      name: "create_uid",
      header: CN.create_uid,
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
      name: "update_uid",
      header: CN.update_uid,
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
      name: "delete_uid",
      header: CN.delete_uid,
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
      name: "dept_nm",
      header: CN.dept_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: deptList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "grade_nm",
      header: CN.grade_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: gradeList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "emp_cd",
      header: CN.emp_cd,
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
      name: "emp_nm",
      header: CN.emp_nm,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "worker_group_nm",
      header: CN.worker_group_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: workingGroupList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "birthday",
      header: CN.birthday,
      minWidth: WIDTH_MIDDLE,
      align: "center",
      editor: {
        type: "datePicker",
        options: {
          language: "ko",
          format: "yyyy-MM-dd",
        },
      },
      formatter: function (value) {
        return CustomGrid.DateFormat(value);
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "hp",
      header: CN.hp,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "post",
      header: CN.post,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "addr",
      header: CN.addr,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "addr_detail",
      header: CN.addr_detail,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "enter_date",
      header: CN.enter_date,
      minWidth: WIDTH_MIDDLE,
      align: "center",
      editor: {
        type: "datePicker",
        options: {
          language: "ko",
          format: "yyyy-MM-dd",
        },
      },
      formatter: function (value) {
        return CustomGrid.DateFormat(value);
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "leave_date",
      header: CN.leave_date,
      minWidth: WIDTH_MIDDLE,
      align: "center",
      editor: {
        type: "datePicker",
        options: {
          language: "ko",
          format: "yyyy-MM-dd",
        },
      },
      formatter: function (value) {
        return CustomGrid.DateFormat(value);
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "worker_fg",
      header: CN.worker_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "worker_fg",
        },
      },
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "use_fg",
      header: CN.use_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "use_fg",
        },
      },
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "center",
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
      id: "emp_cd",
      name: CN.emp_cd,
    },
    {
      id: "emp_nm",
      name: CN.emp_nm,
    },
  ];

  const uri = restURI.employee;

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
    uri,
  };
}

export default EmployeeSet;
