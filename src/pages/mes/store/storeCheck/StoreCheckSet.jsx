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

function StoreCheckSet(
  isEditMode,
  productGbnList,
  productModelList,
  productTypeList,
  productTypeSmallList
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
      name: "prod_id",
      header: CN.prod_id,
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
      name: "prod_gbn_id",
      header: CN.prod_gbn_id,
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
      name: "prod_gbn_nm",
      header: CN.prod_gbn_nm,
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
      name: "model_id",
      header: CN.model_id,
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
      name: "model_nm",
      header: CN.model_nm,
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
      name: "prod_type_id",
      header: CN.prod_type_id,
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
      name: "prod_type_nm",
      header: CN.prod_type_nm,
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
      name: "prod_type_small_id",
      header: CN.prod_type_small_id,
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
      name: "prod_type_small_nm",
      header: CN.prod_type_small_nm,
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
      name: "qty",
      header: CN.qty,
      minWidth: WIDTH_SHORT,
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
      name: "stock_inspection",
      header: CN.stock_inspection,
      minWidth: WIDTH_SHORT,
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
  ];
  const columnsModal = [
    {
      name: "prod_id",
      header: CN.prod_id,
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
      name: "prod_gbn_id",
      header: CN.prod_gbn_id,
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
      name: "prod_gbn_nm",
      header: CN.prod_gbn_nm,
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
      name: "model_id",
      header: CN.model_id,
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
      name: "model_nm",
      header: CN.model_nm,
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
      name: "prod_type_id",
      header: CN.prod_type_id,
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
      name: "prod_type_nm",
      header: CN.prod_type_nm,
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
      name: "prod_type_small_id",
      header: CN.prod_type_small_id,
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
      name: "prod_type_small_nm",
      header: CN.prod_type_small_nm,
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
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "qty",
      header: CN.stock_inspection,
      minWidth: WIDTH_MIDDLE,
      align: "right",
      editor: "text",
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
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModalStockInspection = [
    {
      name: "tran_id",
      header: CN.tran_id,
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
      name: "prod_gbn_id",
      header: CN.prod_gbn_id,
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
      name: "prod_gbn_nm",
      header: CN.prod_gbn_nm,
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
      name: "model_id",
      header: CN.model_id,
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
      name: "model_nm",
      header: CN.model_nm,
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
      name: "prod_type_id",
      header: CN.prod_type_id,
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
      name: "prod_type_nm",
      header: CN.prod_type_nm,
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
      name: "prod_type_small_id",
      header: CN.prod_type_small_id,
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
      name: "prod_type_small_nm",
      header: CN.prod_type_small_nm,
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
      name: "reg_date",
      header: CN.reg_date,
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
      name: "lot_no",
      header: CN.lot_no,
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
      name: "income_qty",
      header: CN.income_qty,
      minWidth: WIDTH_SHORT,
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
      name: "outgo_qty",
      header: CN.outgo_qty,
      minWidth: WIDTH_SHORT,
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
      minWidth: WIDTH_SUPER_LONG,
      align: "left",
      editor: false,
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
      name: "prod_gbn_id",
      header: CN.prod_gbn_id,
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
      name: "prod_gbn_nm",
      header: CN.prod_gbn_nm,
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
      name: "model_id",
      header: CN.model_id,
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
      name: "model_nm",
      header: CN.model_nm,
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
      name: "prod_type_id",
      header: CN.prod_type_id,
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
      name: "prod_type_nm",
      header: CN.prod_type_nm,
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
      name: "prod_type_small_id",
      header: CN.prod_type_small_id,
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
      name: "prod_type_small_nm",
      header: CN.prod_type_small_nm,
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
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
    minWidth: "100",
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = "single";

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
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
  ];

  return {
    data,
    columns,
    columnsModal,
    columnsModalStockInspection,
    columnsSelectProd,
    columnsSelectStore,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
  };
}

export default StoreCheckSet;
