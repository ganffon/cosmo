//사업부관리✨
import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

function SparePartReleaseSet(isEditMode) {
  const data = [];
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
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
      name: "spare_release_id",
      header: CN.spare_release_id,
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
    {
      name: "prod_id",
      header: CN.prod_id,
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
      name: "prod_no",
      header: CN.prod_no,
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "reg_date",
      header: CN.reg_date,
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
      editor: isEditMode ? "text" : false,
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
      align: "left",
      editor: isEditMode
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
      name: "eqm_detail_id",
      header: CN.eqm_detail_id,
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
      name: "eqm_detail_nm",
      header: CN.eqm_detail_nm,
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
      name: "from_store_id",
      header: CN.from_store_id,
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
      name: "from_store_nm",
      header: CN.from_store_nm,
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
      name: "from_location_id",
      header: CN.from_location_id,
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
      name: "from_location_nm",
      header: CN.from_location_nm,
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
      name: "release_uid",
      header: CN.release_uid,
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
      name: "release_nm",
      header: CN.release_nm,
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
      name: "barcode",
      header: CN.barcode,
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
      hidden: true,
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
      hidden: true,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModal = [
    {
      name: "factory_cd",
      header: CN.factory_cd,
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
      name: "factory_nm",
      header: CN.factory_nm,
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

  const columnsModalHeader = [
    {
      name: "prod_id",
      header: CN.prod_id,
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
      name: "prod_no",
      header: CN.prod_no,
      minWidth: WIDTH_SHORT,
      align: "left",
      validation: {
        required: true,
      },
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
      minWidth: WIDTH_SHORT,
      align: "left",
      validation: {
        required: true,
      },
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
      name: "lot_no",
      header: CN.lot_no,
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
      name: "qty",
      header: CN.qty,
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: { type: CustomGrid.EditorNumber },
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
      name: "eqm_detail_id",
      header: CN.eqm_detail_id,
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
      name: "eqm_detail_nm",
      header: CN.eqm_detail_nm,
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
      name: "from_store_id",
      header: CN.from_store_id,
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
      name: "from_store_nm",
      header: CN.from_store_nm,
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
      name: "from_location_id",
      header: CN.from_location_id,
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
      name: "from_location_nm",
      header: CN.from_location_nm,
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
      name: "release_uid",
      header: CN.release_uid,
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
      name: "release_nm",
      header: CN.release_nm,
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
      name: "barcode",
      header: CN.barcode,
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

  const columnsModalSelectProduct = [
    {
      name: "prod_id",
      header: CN.prod_id,
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
      name: "prod_no",
      header: CN.prod_no,
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
      filter: "select",
      whiteSpace: false,
      rowSpan: false,
    },
  ];

  const columnsModalSelectEquipDetail = [
    {
      name: "eqm_detail_id",
      header: CN.prod_id,
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
      name: "eqm_detail_nm",
      header: CN.prod_no,
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

  const columnsModalSelectStore = [
    {
      name: "from_store_id",
      header: CN.from_store_id,
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
      name: "from_store_nm",
      header: CN.from_store_nm,
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
      name: "from_location_id",
      header: CN.from_location_id,
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
      name: "from_location_nm",
      header: CN.from_location_nm,
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

  const columnsModalSelectReleaseUser = [
    {
      name: "release_uid",
      header: CN.release_uid,
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
      name: "release_nm",
      header: CN.release_nm,
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
  };

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
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "eqm_detail_nm",
      name: CN.eqm_detail_nm,
    },
    {
      id: "release_nm",
      name: CN.release_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnsModal,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
    columnsModalHeader,
    columnsModalSelectProduct,
    columnsModalSelectEquipDetail,
    columnsModalSelectStore,
    columnsModalSelectReleaseUser,
  };
}

export default SparePartReleaseSet;