//거래처유형관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

function PartnerSet(isEditMode, partnerTypeList) {
  const data = [
    {
      id: 1,
      test: "TEST",
      test2: "TEST TEST",
    },
  ];
  const rowHeaders = ["checkbox", "rowNum"];
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
    {
      name: "partner_id",
      header: CN.partner_id,
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
          name: "partner_type_id",
          header: CN.partner_type_nm,
          minWidth: WIDTH_SHORT,
          align: "left",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: partnerTypeList,
            },
          },
          hidden: false,
          sortable: false,
          filter: false,
          whiteSpace: false,
          rowSpan: false,
        }
      : {
          name: "partner_type_nm",
          header: CN.partner_type_nm,
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
      name: "partner_cd",
      header: CN.partner_cd,
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
      name: "partner_nm",
      header: CN.partner_nm,
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
      name: "partner_no",
      header: CN.partner_no,
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
      name: "boss_nm",
      header: CN.boss_nm,
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
      name: "manager",
      header: CN.manager,
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
      name: "email",
      header: CN.email,
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
      name: "tel",
      header: CN.tel,
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
      name: "fax",
      header: CN.fax,
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
      name: "post",
      header: CN.post,
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
      name: "addr",
      header: CN.addr,
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
      name: "addr_detail",
      header: CN.addr_detail,
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
      name: "vendor_fg",
      header: CN.vendor_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "vendor_fg",
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
      name: "customer_fg",
      header: CN.customer_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "customer_fg",
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
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // frozenColumn은 여기 값만 수정
  };

  const header = {
    columns: [
      {
        name: "vendor_fg",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "use_fg",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "customer_fg",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
    ],
  };

  const rowHeadersModal = ["rowNum"];

  const columnsModal = [
    {
      name: "partner_type_id",
      header: CN.partner_type_nm,
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          listItems: partnerTypeList,
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      name: "partner_cd",
      header: CN.partner_cd,
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
      name: "partner_nm",
      header: CN.partner_nm,
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
      name: "partner_no",
      header: CN.partner_no,
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
      name: "boss_nm",
      header: CN.boss_nm,
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
      name: "manager",
      header: CN.manager,
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
      name: "email",
      header: CN.email,
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
      name: "tel",
      header: CN.tel,
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
      name: "fax",
      header: CN.fax,
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
      name: "use_fg",
      header: CN.use_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "use_fg",
          disabled: false,
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
      name: "vendor_fg",
      header: CN.vendor_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "vendor_fg",
          disabled: false,
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
      name: "customer_fg",
      header: CN.customer_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "customer_fg",
          disabled: false,
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

  const datePickerSet = null; // "single" || "range" || null

  const inputSet = [
    {
      id: "partner_cd",
      name: CN.partner_cd,
    },
    {
      id: "partner_nm",
      name: CN.partner_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    columns,
    columnOptions,
    rowHeadersModal,
    columnsModal,
    header,
    datePickerSet,
    inputSet,
  };
}

export default PartnerSet;
