import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";

function ProductionOrderSet(
  isEditModeHeader,
  isEditModeMid,
  isEditModeBottom,
  lineList,
  processList,
  equipmentList,
  inspectMethodList,
  inspectToolList,
  inspectFilingList
) {
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const datePickerSet = null;

  const columnsHeader = [
    {
      name: "factory_id",
      header: CN.factory_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "order_id",
      header: CN.order_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "request_no",
      header: CN.request_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "order_no",
      header: CN.order_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "reg_date",
      header: CN.reg_date,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeHeader
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
      name: "line_dept_id",
      header: CN.line_dept_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_dept_nm",
      header: CN.line_dept_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_no",
      header: CN.prod_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_nm",
      header: CN.prod_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "start_date",
      header: CN.start_date,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeHeader
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
      name: "end_date",
      header: CN.end_date,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeHeader
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
      name: "qty",
      header: CN.qty,
      minWidth: C.WIDTH_SHORT,
      align: "right",
      editor: isEditModeHeader
        ? {
            type: CustomGrid.EditorNumber,
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
      name: "complete_fg",
      header: CN.complete_fg,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "complete_date",
      header: CN.complete_date,
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeHeader ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_at",
      header: CN.create_at,
      minWidth: C.WIDTH_LONG,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_LONG,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_uid",
      header: CN.delete_uid,
      minWidth: C.WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsMid = [
    {
      name: "order_input_id",
      header: CN.order_input_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "order_id",
      header: CN.order_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_no",
      header: CN.prod_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_nm",
      header: CN.prod_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_std",
      header: CN.spec_std,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeMid ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_min",
      header: CN.spec_min,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeMid
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_max",
      header: CN.spec_max,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeMid
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_lcl",
      header: CN.spec_lcl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeMid
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_ucl",
      header: CN.spec_ucl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeMid
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_id",
      header: CN.infc_memory_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_nm",
      header: CN.infc_memory_nm,
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeMid ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_at",
      header: CN.create_at,
      minWidth: C.WIDTH_LONG,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_LONG,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_uid",
      header: CN.delete_uid,
      minWidth: C.WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsBottom = [
    {
      name: "order_detail_id",
      header: CN.order_detail_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "order_id",
      header: CN.order_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_id",
      header: CN.proc_id,
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_type_id",
      header: CN.insp_item_type_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_type_nm",
      header: CN.insp_item_type_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_id",
      header: CN.insp_item_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_nm",
      header: CN.insp_item_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_desc",
      header: CN.insp_item_desc,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_std",
      header: CN.spec_std,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeBottom ? "text" : false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_min",
      header: CN.spec_min,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeBottom
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_max",
      header: CN.spec_max,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeBottom
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_lcl",
      header: CN.spec_lcl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeBottom
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_ucl",
      header: CN.spec_ucl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeBottom
        ? {
            type: CustomGrid.EditorFloat2,
          }
        : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_method_id",
      header: CN.insp_method_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_method_nm",
      header: CN.insp_method_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_tool_id",
      header: CN.insp_tool_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_tool_nm",
      header: CN.insp_tool_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_filing_id",
      header: CN.insp_filing_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_filing_nm",
      header: CN.insp_filing_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_id",
      header: CN.infc_memory_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_nm",
      header: CN.infc_memory_nm,
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: isEditModeBottom ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "create_at",
      header: CN.create_at,
      minWidth: C.WIDTH_LONG,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_LONG,
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
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_LONG,
      align: "center",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "delete_uid",
      header: CN.delete_uid,
      minWidth: C.WIDTH_SHORT,
      align: "center",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModalHeader = [
    {
      name: "factory_id",
      header: CN.factory_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "request_no",
      header: CN.request_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "reg_date",
      header: CN.reg_date,
      minWidth: C.WIDTH_SHORT,
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
      name: "line_dept_id",
      header: CN.line_dept_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_dept_nm",
      header: CN.line_dept_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_no",
      header: CN.prod_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_nm",
      header: CN.prod_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
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
      minWidth: C.WIDTH_SHORT,
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
      name: "end_date",
      header: CN.end_date,
      minWidth: C.WIDTH_SHORT,
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
      name: "qty",
      header: CN.qty,
      minWidth: C.WIDTH_SHORT,
      align: "right",
      editor: {
        type: CustomGrid.EditorNumber,
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
      name: "complete_fg",
      header: CN.complete_fg,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "complete_fg",
          disabled: false,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "complete_date",
      header: CN.complete_date,
      minWidth: C.WIDTH_SHORT,
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
      name: "remark",
      header: CN.remark,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModalMid = [
    {
      name: "order_id",
      header: CN.order_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_no",
      header: CN.prod_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_nm",
      header: CN.prod_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_std",
      header: CN.spec_std,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_min",
      header: CN.spec_min,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_max",
      header: CN.spec_max,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_lcl",
      header: CN.spec_lcl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_ucl",
      header: CN.spec_ucl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_id",
      header: CN.infc_memory_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_nm",
      header: CN.infc_memory_nm,
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModalBottom = [
    {
      name: "order_detail_id",
      header: CN.order_detail_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "order_id",
      header: CN.order_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_id",
      header: CN.proc_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "proc_nm",
      header: CN.proc_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_id",
      header: CN.equip_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "equip_nm",
      header: CN.equip_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_type_id",
      header: CN.insp_item_type_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_type_nm",
      header: CN.insp_item_type_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_id",
      header: CN.insp_item_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_nm",
      header: CN.insp_item_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_item_desc",
      header: CN.insp_item_desc,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_std",
      header: CN.spec_std,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: "text",
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_min",
      header: CN.spec_min,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_max",
      header: CN.spec_max,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_lcl",
      header: CN.spec_lcl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "spec_ucl",
      header: CN.spec_ucl,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: {
        type: CustomGrid.EditorFloat2,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_method_id",
      header: CN.insp_method_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_method_nm",
      header: CN.insp_method_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_tool_id",
      header: CN.insp_tool_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_tool_nm",
      header: CN.insp_tool_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_filing_id",
      header: CN.insp_filing_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "insp_filing_nm",
      header: CN.insp_filing_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_id",
      header: CN.infc_memory_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "infc_memory_nm",
      header: CN.infc_memory_nm,
      minWidth: C.WIDTH_SHORT,
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
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsSelectRequest = [
    {
      name: "request_id",
      header: CN.request_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "request_no",
      header: CN.request_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_no",
      header: CN.prod_no,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_nm",
      header: CN.prod_nm,
      minWidth: C.WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];

  /**
   * 🔸inputSet id 값이 ⭐ BE : query params
   */
  const inputSet = [
    {
      id: "line_nm",
      name: CN.line_nm,
    },
    {
      id: "request_no",
      name: CN.request_no,
    },
  ];
  const data = [];
  return {
    data,
    columnsHeader,
    columnsMid,
    columnsBottom,
    columnsModalHeader,
    columnsModalMid,
    columnsModalBottom,
    columnsSelectRequest,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
  };
}

export default ProductionOrderSet;
