import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
  MODAL_BACK_COLOR,
  NORMAL_BACK_COLOR,
} from "constant/Grid.js";

function PackingSet(isEditModeHeader, barcodePrintDetail, barcodePrintHeader) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    minWidth: WIDTH_SHORT,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsHeader = [
    {
      name: "work_packing_id",
      header: CN.work_packing_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_order_id",
      header: CN.work_order_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_order_no",
      header: CN.work_order_no,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_dept_id",
      header: CN.line_dept_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_dept_nm",
      header: CN.line_dept_nm,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
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
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_nm",
      header: CN.line_nm,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
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
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
      minWidth: WIDTH_MIDDLE,
      width: WIDTH_MIDDLE,
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
      minWidth: WIDTH_MIDDLE,
      width: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_packing_date",
      header: CN.work_packing_date,
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
      name: "lot_no",
      header: CN.lot_no,
      minWidth: WIDTH_MIDDLE,
      width: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "packing_qty",
      header: CN.packing_qty,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "right",
      editor: false,
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
      name: "packing_cnt",
      header: CN.packing_cnt,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "right",
      editor: false,
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
      name: "packing_emp_id",
      header: CN.packing_emp_id,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: isEditModeHeader
        ? {
            required: true,
          }
        : null,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "packing_emp_nm",
      header: CN.packing_emp_nm,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: isEditModeHeader
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
      name: "inv_to_store_id",
      header: CN.inv_to_store_id,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "store_nm",
      header: CN.store_nm,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "inv_to_location_id",
      header: CN.inv_to_location_id,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "location_nm",
      header: CN.location_nm,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
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
      minWidth: WIDTH_MIDDLE,
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
  const columnsDetail = [
    {
      name: "work_packing_detail_id",
      header: CN.work_packing_detail_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_packing_id",
      header: CN.work_packing_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_weigh_id",
      header: CN.work_weigh_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "lot_no",
      header: CN.lot_no,
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
      name: "input_qty",
      header: CN.input_qty,
      minWidth: WIDTH_SHORT,
      width: WIDTH_SHORT,
      align: "right",
      editor: false,
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
      name: "remark",
      header: CN.remark,
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
  const columnsHeaderNew = [
    {
      name: "work_packing_id",
      header: CN.work_packing_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_order_id",
      header: CN.work_order_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_order_no",
      header: CN.work_order_no,
      minWidth: WIDTH_SHORT,
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
      name: "line_dept_id",
      header: CN.line_dept_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_dept_nm",
      header: CN.line_dept_nm,
      minWidth: WIDTH_SHORT,
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
      name: "line_id",
      header: CN.line_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
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
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
      minWidth: WIDTH_MIDDLE,
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
      minWidth: WIDTH_MIDDLE,
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
      name: "work_packing_date",
      header: CN.work_packing_date,
      minWidth: WIDTH_SHORT,
      align: "center",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "lot_no",
      header: CN.lot_no,
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
      name: "packing_qty",
      header: CN.packing_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: {
        type: CustomGrid.EditorFloat1,
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
      name: "packing_cnt",
      header: CN.packing_cnt,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: {
        type: CustomGrid.EditorFloat1,
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
      name: "packing_emp_id",
      header: CN.packing_emp_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "packing_emp_nm",
      header: CN.packing_emp_nm,
      minWidth: WIDTH_SHORT,
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
      name: "inv_to_store_id",
      header: CN.inv_to_store_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "store_nm",
      header: CN.store_nm,
      minWidth: WIDTH_SHORT,
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
      name: "inv_to_location_id",
      header: CN.inv_to_location_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "location_nm",
      header: CN.location_nm,
      minWidth: WIDTH_SHORT,
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
  const columnsDetailNew = [
    {
      name: "work_packing_detail_id",
      header: CN.work_packing_detail_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_packing_id",
      header: CN.work_packing_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_weigh_id",
      header: CN.work_weigh_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
      minWidth: WIDTH_MIDDLE,
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
      minWidth: WIDTH_MIDDLE,
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
      name: "lot_no",
      header: CN.lot_no,
      minWidth: WIDTH_MIDDLE,
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
      name: "input_qty",
      header: CN.input_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: {
        type: CustomGrid.EditorFloat1,
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
      name: "inv_to_store_id",
      header: CN.inv_to_store_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "store_nm",
      header: CN.store_nm,
      minWidth: WIDTH_MIDDLE,
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
      name: "inv_to_location_id",
      header: CN.inv_to_location_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      validation: {
        required: true,
      },
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "location_nm",
      header: CN.location_nm,
      minWidth: WIDTH_MIDDLE,
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
  const columnsSelectProd = [
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: "select",
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_nm",
      header: CN.prod_nm,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: "select",
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsSelectOrder = [
    {
      name: "work_order_id",
      header: CN.work_order_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "request_no",
      header: CN.request_no,
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
      name: "work_order_no",
      header: CN.work_order_no,
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
      name: "work_order_date",
      header: CN.work_order_date,
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
      name: "line_dept_id",
      header: CN.line_dept_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "line_dept_nm",
      header: CN.line_dept_nm,
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
      hidden: true,
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
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "inv_to_store_id",
      header: CN.inv_to_store_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "store_nm",
      header: CN.store_nm,
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
      name: "inv_to_location_id",
      header: CN.inv_to_location_id,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "location_nm",
      header: CN.location_nm,
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
      name: "work_start_date",
      header: CN.work_start_date,
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
      name: "work_end_date",
      header: CN.work_end_date,
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
  const columnsSelectEmp = [
    {
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
    {
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
      hidden: true,
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
      hidden: true,
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
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
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
  ];
  const columnsSelectWeight = [
    {
      name: "work_weigh_id",
      header: CN.work_weigh_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "lot_no",
      header: CN.lot_no,
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
      name: "total_qty",
      header: CN.actual_weight,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "work_input_date",
      header: CN.work_input_date,
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
      name: "work_input_time",
      header: CN.work_input_time,
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
      name: "inv_to_store_id",
      header: CN.inv_to_store_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "store_nm",
      header: CN.store_nm,
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
      name: "inv_to_location_id",
      header: CN.inv_to_location_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "location_nm",
      header: CN.location_nm,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsSelectWeightDetail = [
    {
      name: "prod_id",
      header: CN.prod_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_cd",
      header: CN.prod_cd,
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "lot_no",
      header: CN.lot_no,
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
      name: "total_qty",
      header: CN.actual_weight,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "bag_qty",
      header: CN.bag_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "input_qty",
      header: CN.input_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const inputSet = [
    {
      id: "line_nm",
      name: CN.line_nm,
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
      name: CN.actual_weight,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  const columnsSelectStore = [
    {
      name: "store_id",
      header: CN.store_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "store_nm",
      header: CN.store_nm,
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
      name: "location_id",
      header: CN.location_id,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "location_nm",
      header: CN.location_nm,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  return {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsHeaderNew,
    columnsDetailNew,
    columnsSelectProd,
    columnsSelectOrder,
    columnsSelectEmp,
    columnsSelectWeight,
    columnsSelectWeightDetail,
    columnsSelectStore,
    inputSet,
    inputInfo,
  };
}
export default PackingSet;
