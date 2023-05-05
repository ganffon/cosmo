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

function ProductSet(
  isEditMode,
  productGbnList,
  productModelList,
  productTypeList,
  productTypeSmallList,
  unitList
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
    isEditMode
      ? {
          name: "prod_gbn_id",
          header: CN.prod_gbn_nm,
          minWidth: WIDTH_MIDDLE,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: productGbnList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
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
    isEditMode
      ? {
          name: "model_id",
          header: CN.model_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: productModelList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
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
    isEditMode
      ? {
          name: "prod_type_id",
          header: CN.prod_type_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: productTypeList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
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
    isEditMode
      ? {
          name: "prod_type_small_id",
          header: CN.prod_type_small_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: productTypeSmallList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "rev",
      header: CN.rev,
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
      name: "prod_std",
      header: CN.prod_std,
      minWidth: WIDTH_MIDDLE,
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
          name: "unit_id",
          header: CN.unit_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: unitList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "unit_nm",
          header: CN.unit_nm,
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
      name: "lot_fg",
      header: CN.lot_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "lot_fg",
          disabled: isEditMode ? false : true,
        },
      },
      minWidth: "60",
      hidden: false,
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
      name: "active_fg",
      header: CN.active_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "active_fg",
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
      name: "bom_type_id",
      header: CN.bom_type_id,
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
      name: "width",
      header: CN.width,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "length",
      header: CN.length,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "height",
      header: CN.height,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "material",
      header: CN.material,
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
      name: "color",
      header: CN.color,
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
      name: "weight",
      header: CN.weight,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "thickness",
      header: CN.thickness,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "is_spareparts",
      header: CN.is_spareparts,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "is_spareparts",
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
      name: "mat_order_fg",
      header: CN.mat_order_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "mat_order_fg",
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
      name: "mat_unit_id",
      header: CN.mat_unit_id,
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
      name: "mat_order_min_qty",
      header: CN.mat_order_min_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "mat_supply_days",
      header: CN.mat_supply_days,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "sal_order_fg",
      header: CN.sal_order_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "sal_order_fg",
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
      name: "inv_use_fg",
      header: CN.inv_use_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "inv_use_fg",
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
      name: "inv_unit_qty",
      header: CN.inv_unit_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "inv_safe_qty",
      header: CN.inv_safe_qty,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "inv_to_store_id",
      header: CN.inv_to_store_id,
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
      name: "inv_to_store_nm",
      header: CN.inv_to_store_nm,
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
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "inv_to_location_nm",
      header: CN.inv_to_location_nm,
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
      name: "qms_receive_insp_fg",
      header: CN.qms_receive_insp_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "qms_receive_insp_fg",
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
      name: "qms_proc_insp_fg",
      header: CN.qms_proc_insp_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "qms_proc_insp_fg",
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
      name: "qms_final_insp_fg",
      header: CN.qms_final_insp_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "qms_final_insp_fg",
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
      name: "prd_plan_type_id",
      header: CN.prd_plan_type_id,
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
      name: "prd_active_fg",
      header: CN.prd_active_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "prd_active_fg",
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
      name: "prd_min",
      header: CN.prd_min,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "prd_max",
      header: CN.prd_max,
      minWidth: WIDTH_SHORT,
      align: "right",
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
      name: "prod_gbn_id",
      header: CN.prod_gbn_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: productGbnList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "model_id",
      header: CN.model_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: productModelList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_type_id",
      header: CN.prod_type_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: productTypeList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_type_small_id",
      header: CN.prod_type_small_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: productTypeSmallList,
        },
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
      name: "prod_nm",
      header: CN.prod_nm,
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
      name: "rev",
      header: CN.rev,
      minWidth: WIDTH_SUPER_SHORT,
      align: "center",
      editor: "text",
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "prod_std",
      header: CN.prod_std,
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
      name: "unit_id",
      header: CN.unit_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: unitList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "lot_fg",
      header: CN.lot_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "lot_fg",
          disabled: false,
        },
      },
      minWidth: "60",
      hidden: false,
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
      name: "active_fg",
      header: CN.active_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "active_fg",
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
      name: "width",
      header: CN.width,
      minWidth: WIDTH_SHORT,
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
      name: "length",
      header: CN.length,
      minWidth: WIDTH_SHORT,
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
      name: "height",
      header: CN.height,
      minWidth: WIDTH_SHORT,
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
      name: "material",
      header: CN.material,
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
      name: "color",
      header: CN.color,
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
      name: "weight",
      header: CN.weight,
      minWidth: WIDTH_SHORT,
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
      name: "thickness",
      header: CN.thickness,
      minWidth: WIDTH_SHORT,
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
      name: "is_spareparts",
      header: CN.is_spareparts,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "is_spareparts",
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
      name: "mat_order_fg",
      header: CN.mat_order_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "mat_order_fg",
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
      name: "mat_order_min_qty",
      header: CN.mat_order_min_qty,
      minWidth: WIDTH_SHORT,
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
      name: "mat_supply_days",
      header: CN.mat_supply_days,
      minWidth: WIDTH_SHORT,
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
      name: "sal_order_fg",
      header: CN.sal_order_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "sal_order_fg",
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
      name: "inv_use_fg",
      header: CN.inv_use_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "inv_use_fg",
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
      name: "inv_unit_qty",
      header: CN.inv_unit_qty,
      minWidth: WIDTH_SHORT,
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
      name: "inv_safe_qty",
      header: CN.inv_safe_qty,
      minWidth: WIDTH_SHORT,
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
      name: "qms_receive_insp_fg",
      header: CN.qms_receive_insp_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "qms_receive_insp_fg",
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
      name: "qms_proc_insp_fg",
      header: CN.qms_proc_insp_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "qms_proc_insp_fg",
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
      name: "qms_final_insp_fg",
      header: CN.qms_final_insp_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "qms_final_insp_fg",
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
      name: "prd_active_fg",
      header: CN.prd_active_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "prd_active_fg",
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
      name: "prd_min",
      header: CN.prd_min,
      minWidth: WIDTH_SHORT,
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
      name: "prd_max",
      header: CN.prd_max,
      minWidth: WIDTH_SHORT,
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
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
    {
      id: "prod_std",
      name: CN.prod_std,
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

export default ProductSet;
