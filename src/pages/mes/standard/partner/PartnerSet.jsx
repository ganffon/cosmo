//거래처유형관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";

import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

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
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.list(
      "partner_id",
      "partner_type_nm",
      CN.partner_type_nm,
      partnerTypeList,
      isEditMode
    ),
    col.text(
      "partner_cd",
      CN.partner_cd,
      isEditMode,
      false,
      C.WIDTH_MIDDLE,
      "left",
      C.U,
      false
    ),
    col.text(
      "partner_nm",
      CN.partner_nm,
      isEditMode,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      false,
      false
    ),
    col.text(
      "partner_no",
      CN.partner_no,
      isEditMode,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      false,
      false
    ),
    col.text(
      "boss_nm",
      CN.boss_nm,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "manager",
      CN.manager,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "email",
      CN.email,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "tel",
      CN.tel,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "fax",
      CN.fax,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "post",
      CN.post,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "addr",
      CN.addr,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.text(
      "addr_detail",
      CN.addr_detail,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE,
      "left",
      false,
      false
    ),
    col.check("use_fg", CN.use_fg, isEditMode, false, C.WIDTH_SHORT),
    col.check("vendor_fg", CN.vendor_fg, isEditMode, false, C.WIDTH_SHORT),
    col.check("customer_fg", CN.customer_fg, isEditMode, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditMode, false, C.WIDTH_MIDDLE),
    col.text(
      "create_at",
      CN.create_at,
      false,
      false,
      C.WIDTH_LONG,
      "center",
      false,
      false
    ),
    col.text(
      "create_user_nm",
      CN.create_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center",
      false,
      false
    ),
    col.text(
      "update_at",
      CN.update_at,
      false,
      false,
      C.WIDTH_LONG,
      "center",
      false,
      false
    ),
    col.text(
      "update_user_nm",
      CN.update_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center",
      false,
      false
    ),
    col.text(
      "delete_at",
      CN.delete_at,
      false,
      false,
      C.WIDTH_LONG,
      "center",
      false,
      false
    ),
    col.text(
      "delete_user_nm",
      CN.delete_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center",
      false,
      false
    ),
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
    col.list(
      "partner_type_id",
      "partner_type_nm",
      CN.partner_type_nm,
      partnerTypeList,
      true,
      C.WIDTH_SHORT,
      false,
      "left"
    ),
    col.text("partner_cd", CN.partner_cd, true, false, C.WIDTH_MIDDLE),
    col.text("partner_nm", CN.partner_nm, true, false, C.WIDTH_MIDDLE),
    col.text("partner_no", CN.partner_no, true, false, C.WIDTH_MIDDLE),
    col.text("boss_nm", CN.boss_nm, true, false, C.WIDTH_MIDDLE),
    col.text("manager", CN.manager, true, false, C.WIDTH_MIDDLE),
    col.text("email", CN.email, true, false, C.WIDTH_MIDDLE),
    col.text("tel", CN.tel, true, false, C.WIDTH_MIDDLE),
    col.text("fax", CN.fax, true, false, C.WIDTH_MIDDLE),
    col.text("post", CN.post, true, false, C.WIDTH_MIDDLE),
    col.text("addr", CN.addr, true, false, C.WIDTH_MIDDLE),
    col.text("addr_detail", CN.addr_detail, true, false, C.WIDTH_MIDDLE),
    col.check("use_fg", CN.use_fg, true, false, C.WIDTH_SHORT),
    col.check("vendor_fg", CN.vendor_fg, true, false, C.WIDTH_SHORT),
    col.check("customer_fg", CN.customer_fg, true, false, C.WIDTH_SHORT),
    col.text(
      "remark",
      CN.remark,
      true,
      false,
      C.WIDTH_MIDDLE,
      false,
      false,
      false
    ),
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
