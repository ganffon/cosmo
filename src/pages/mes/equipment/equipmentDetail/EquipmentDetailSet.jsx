import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

function EquipmentDetailSet(
  isEditMode,
  processList,
  employeeList,
  equipmentList,
  equipmentLargeList,
  equipmentMediumList,
  equipmentSmallList
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
      name: "factory_id",
      header: CN.factory_id,
      minWidth: WIDTH_SHORT,
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
          name: "equip_id",
          header: CN.equip_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: equipmentList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "equip_nm",
          header: CN.equip_nm,
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
          name: "equip_classification_id",
          header: CN.classification_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: equipmentLargeList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "equip_classification_nm",
          header: CN.classification_nm,
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
          name: "equip_group_id",
          header: CN.group_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: equipmentMediumList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "equip_group_nm",
          header: CN.group_nm,
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
          name: "equip_class_id",
          header: CN.class_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: equipmentSmallList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "equip_class_nm",
          header: CN.class_nm,
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
      name: "equip_detail_cd",
      header: CN.eqm_detail_cd,
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
      name: "equip_detail_nm",
      header: CN.eqm_detail_nm,
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
          name: "manager_emp_id",
          header: CN.manager_emp_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: employeeList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "manager_emp_nm",
          header: CN.manager_emp_nm,
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
          name: "sub_manager_emp_id",
          header: CN.sub_manager_emp_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: employeeList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "sub_manager_emp_nm",
          header: CN.sub_manager_emp_nm,
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
      name: "equip_no",
      header: CN.equip_no,
      minWidth: WIDTH_SUPER_SHORT,
      align: "center",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_grade",
      header: CN.equip_grade,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_model",
      header: CN.equip_model,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_std",
      header: CN.equip_std,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_spec",
      header: CN.equip_spec,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "voltage",
      header: CN.voltage,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "manufacturer",
      header: CN.manufacturer,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "purchase_partner",
      header: CN.purchase_partner,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "purchase_date",
      header: CN.purchase_date,
      minWidth: WIDTH_MIDDLE,
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
      name: "purchase_tel",
      header: CN.purchase_tel,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "purchase_price",
      header: CN.purchase_price,
      minWidth: WIDTH_MIDDLE,
      align: "right",
      editor: isEditMode
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      formatter: function (value) {
        return CustomGrid.NumComma(value);
      },
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
      minWidth: WIDTH_SUPER_SHORT,
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
      minWidth: WIDTH_MIDDLE,
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
      hidden: true,
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
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModal = [
    {
      name: "equip_id",
      header: CN.equip_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: equipmentList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_classification_id",
      header: CN.classification_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: equipmentLargeList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_group_id",
      header: CN.group_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: equipmentMediumList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_class_id",
      header: CN.class_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: equipmentSmallList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_detail_cd",
      header: CN.eqm_detail_cd,
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
      name: "equip_detail_nm",
      header: CN.eqm_detail_nm,
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
      name: "manager_emp_id",
      header: CN.manager_emp_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: employeeList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "sub_manager_emp_id",
      header: CN.sub_manager_emp_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: employeeList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_no",
      header: CN.equip_no,
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
      name: "equip_grade",
      header: CN.equip_grade,
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
      name: "equip_model",
      header: CN.equip_model,
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
      name: "equip_std",
      header: CN.equip_std,
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
      name: "equip_spec",
      header: CN.equip_spec,
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
      name: "voltage",
      header: CN.voltage,
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
      name: "manufacturer",
      header: CN.manufacturer,
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
      name: "purchase_partner",
      header: CN.purchase_partner,
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
      name: "purchase_date",
      header: CN.purchase_date,
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
      name: "purchase_tel",
      header: CN.purchase_tel,
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
      name: "purchase_price",
      header: CN.purchase_price,
      minWidth: WIDTH_MIDDLE,
      align: "right",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      formatter: function (value) {
        return CustomGrid.NumComma(value);
      },
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
          disabled: false,
        },
      },
      minWidth: WIDTH_SUPER_SHORT,
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
      minWidth: WIDTH_MIDDLE,
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
    minWidth: "100",
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
      id: "equip_nm",
      name: CN.equip_nm,
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

export default EquipmentDetailSet;
