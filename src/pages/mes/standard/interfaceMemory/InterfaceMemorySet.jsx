import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function InterfaceMemorySet(isEditMode, lineList, processList, equipmentList) {
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
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.number("sortby", CN.sortby, isEditMode),
    col.select("infc_item_type_nm", CN.infc_item_type_nm, isEditMode, C.WIDTH_MIDDLE),
    col.id("infc_item_id", CN.infc_item_id, C.HIDDEN_ID),
    col.select("infc_item_nm", CN.infc_item_nm, isEditMode, C.WIDTH_MIDDLE),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("infc_memory_nm", CN.infc_memory_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.list("line_id", "line_nm", CN.line_nm, lineList, isEditMode),
    col.list("proc_id", "proc_nm", CN.proc_nm, processList, isEditMode),
    col.list("equip_id", "equip_nm", CN.equip_nm, equipmentList, isEditMode, C.WIDTH_MIDDLE),
    col.text("plc_ip", CN.plc_ip, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("plc_port", CN.plc_port, isEditMode),
    col.text("device_address", CN.device_address, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("tag_id", CN.tag_id, isEditMode, C.U, C.WIDTH_SUPER_LONG),
    col.text("unit_nm", CN.unit_nm, isEditMode),
    col.text("constant_value", CN.constant_value, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("weight", CN.weight, isEditMode),
    col.check("history_fg", CN.history_fg, isEditMode),
    col.text("remark", CN.remark, isEditMode, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.number("sortby", CN.sortby, true),
    col.select("infc_item_type_nm", CN.infc_item_type_nm, true, C.WIDTH_MIDDLE),
    col.id("infc_item_id", CN.infc_item_id, C.HIDDEN_ID),
    col.select("infc_item_nm", CN.infc_item_nm, true, C.WIDTH_MIDDLE),
    col.text("infc_memory_nm", CN.infc_memory_nm, true, C.U, C.WIDTH_MIDDLE),
    col.list("line_id", "line_nm", CN.line_nm, lineList, true),
    col.list("proc_id", "proc_nm", CN.proc_nm, processList, true),
    col.list("equip_id", "equip_nm", CN.equip_nm, equipmentList, true, C.WIDTH_MIDDLE),
    col.text("plc_ip", CN.plc_ip, true, C.U, C.WIDTH_MIDDLE),
    col.text("plc_port", CN.plc_port, true),
    col.text("device_address", CN.device_address, true, C.U, C.WIDTH_MIDDLE),
    col.text("tag_id", CN.tag_id, true, C.U, C.WIDTH_SUPER_LONG),
    col.text("unit_nm", CN.unit_nm, true),
    col.text("constant_value", CN.constant_value, true, C.U, C.WIDTH_MIDDLE),
    col.text("weight", CN.weight, true),
    col.check("history_fg", CN.history_fg, true),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnsModalSelect = [
    col.text("infc_item_type_nm", CN.infc_item_type_nm, C.U, C.U, C.U, C.U, C.U, true),

    col.id("infc_item_id", CN.infc_item_id, C.HIDDEN_ID),
    col.text("infc_item_nm", CN.infc_item_nm, C.U, C.U, C.U, C.U, C.U, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };

  const header = col.multi(["rework_fg", "history_fg"]);
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
      id: "proc_nm",
      name: CN.proc_nm,
    },
    {
      id: "equip_nm",
      name: CN.equip_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnsModal,
    columnsModalSelect,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default InterfaceMemorySet;
