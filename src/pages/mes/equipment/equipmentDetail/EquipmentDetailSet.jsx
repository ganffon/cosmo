import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

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
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.list("equip_id", "equip_nm", CN.equip_nm, equipmentList, isEditMode, C.WIDTH_MIDDLE),
    col.list(
      "equip_classification_id",
      "equip_classification_nm",
      CN.classification_nm,
      equipmentLargeList,
      isEditMode,
      C.WIDTH_MIDDLE
    ),
    col.list("equip_group_id", "equip_group_nm", CN.group_nm, equipmentMediumList, isEditMode, C.WIDTH_MIDDLE),
    col.list("equip_class_id", "equip_class_nm", CN.class_nm, equipmentSmallList, isEditMode, C.WIDTH_MIDDLE),
    col.id("equip_detail_id", CN.equip_detail_id, C.HIDDEN_ID),
    col.text("equip_detail_cd", CN.equip_detail_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("equip_detail_nm", CN.equip_detail_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.list("manager_emp_id", "manager_emp_nm", CN.manager_emp_nm, employeeList, isEditMode),
    col.list("sub_manager_emp_id", "sub_manager_emp_nm", CN.sub_manager_emp_nm, employeeList, isEditMode),
    col.text("equip_no", CN.equip_no, isEditMode),
    col.text("equip_grade", CN.equip_grade, isEditMode),
    col.text("equip_model", CN.equip_model, isEditMode),
    col.text("equip_std", CN.equip_std, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("equip_spec", CN.equip_spec, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("voltage", CN.voltage, isEditMode),
    col.text("manufacturer", CN.manufacturer, isEditMode),
    col.text("purchase_partner", CN.purchase_partner, isEditMode),
    col.date("purchase_date", CN.purchase_date, isEditMode),
    col.text("purchase_tel", CN.purchase_tel, isEditMode),
    col.number("purchase_price", CN.purchase_price, isEditMode),
    col.check("use_fg", CN.use_fg, isEditMode),
    col.text("remark", CN.remark, isEditMode, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.list("equip_id", "equip_nm", CN.equip_nm, equipmentList, true, C.WIDTH_MIDDLE),
    col.list(
      "equip_classification_id",
      "equip_classification_nm",
      CN.classification_nm,
      equipmentLargeList,
      true,
      C.WIDTH_MIDDLE
    ),
    col.list("equip_group_id", "equip_group_nm", CN.group_nm, equipmentMediumList, true, C.WIDTH_MIDDLE),
    col.list("equip_class_id", "equip_class_nm", CN.class_nm, equipmentSmallList, true, C.WIDTH_MIDDLE),
    col.text("equip_detail_cd", CN.equip_detail_cd, true, C.U, C.WIDTH_MIDDLE),
    col.text("equip_detail_nm", CN.equip_detail_nm, true, C.U, C.WIDTH_MIDDLE),
    col.list("manager_emp_id", "manager_emp_nm", CN.manager_emp_nm, employeeList, true),
    col.list("sub_manager_emp_id", "sub_manager_emp_nm", CN.sub_manager_emp_nm, employeeList, true),
    col.text("equip_no", CN.equip_no, true, C.U, C.WIDTH_MIDDLE),
    col.text("equip_grade", CN.equip_grade, true),
    col.text("equip_model", CN.equip_model, true),
    col.text("equip_std", CN.equip_std, true, C.U, C.WIDTH_MIDDLE),
    col.text("equip_spec", CN.equip_spec, true, C.U, C.WIDTH_MIDDLE),
    col.text("voltage", CN.voltage, true),
    col.text("manufacturer", CN.manufacturer, true),
    col.text("purchase_partner", CN.purchase_partner, true),
    col.date("purchase_date", CN.purchase_date, true),
    col.text("purchase_tel", CN.purchase_tel, true),
    col.number("purchase_price", CN.purchase_price, true),
    col.check("use_fg", CN.use_fg, true),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = col.multi(["use_fg"]);
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
