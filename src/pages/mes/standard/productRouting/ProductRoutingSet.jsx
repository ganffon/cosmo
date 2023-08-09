import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductRoutingSet() {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsHeader = [
    col.text("prod_gbn_nm", CN.prod_gbn_nm, C.U, C.U, C.U, C.U, true, true),
    col.text("model_nm", CN.model_nm, C.U, C.U, C.U, C.U, true, true),
    col.text("prod_class_nm", CN.prod_class_nm, C.U, C.U, C.U, C.U, true, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("unit_nm", CN.unit_nm, C.U, C.U, C.WIDTH_SUPER_SHORT, C.U, true, true),
  ];
  const columnsDetail = [
    col.id("prod_mapping_id", CN.prod_mapping_id, C.HIDDEN_ID),
    // col.text("prod_gbn_nm", CN.prod_gbn_nm),
    // col.text("model_nm", CN.model_nm),
    // col.text("prod_type_small_nm", CN.prod_type_small_nm),
    col.text("mapping_id", CN.prod_id, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("mapping_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("mapping_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    // col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE),
    // col.text("unit_nm", CN.unit_nm, C.U, C.U, C.WIDTH_SUPER_SHORT),
    col.id("mapping_system", CN.mapping_system, C.HIDDEN_ID),
  ];
  const columnsModal = [
    col.id("prod_id_fdr", CN.prod_id_fdr, C.HIDDEN_ID),
    col.select("prod_gbn_nm", CN.prod_gbn_nm, true),
    col.select("model_nm", CN.model_nm, true),
    col.select("prod_type_small_nm", CN.prod_type_small_nm, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true),
    col.select("prod_nm", CN.prod_nm, true),
    col.select("prod_std", CN.prod_std, true),
    col.select("unit_nm", CN.unit_nm, true),
    col.id("mapping_system", CN.mapping_system, C.HIDDEN_ID),
  ];
  const columnsSelect = [
    col.text("prod_gbn_nm", CN.prod_gbn_nm, C.U, C.U, C.U, C.U, true, true),
    col.text("model_nm", CN.model_nm, C.U, C.U, C.U, C.U, true, true),
    col.text("prod_type_small_nm", CN.prod_type_small_nm, C.U, C.U, C.U, C.U, true, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("unit_nm", CN.unit_nm, C.U, C.U, C.WIDTH_SUPER_SHORT, C.U, true, true),
    col.id("mapping_system", CN.mapping_system, C.HIDDEN_ID),
  ];
  const inputSet = [
    {
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
  ];
  const inputInfo = [
    {
      id: "subdivision_date",
      name: CN.subdivision_date,
    },
    // {
    //   id: "prod_cd",
    //   name: CN.prod_cd,
    // },
    // {
    //   id: "prod_nm",
    //   name: CN.prod_nm,
    // },
    {
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "total_qty",
      name: CN.total_qty,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  return {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModal,
    columnsSelect,
    inputSet,
    inputInfo,
  };
}
export default ProductRoutingSet;
