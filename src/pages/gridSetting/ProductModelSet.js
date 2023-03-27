//제품군관리✨
import restURI from "api/restURI.json";
import CustomGrid from "components/grid/setting/CustomGrid";
import "components/grid/style/GridStyle.css";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
  MODAL_BACK_COLOR,
} from "constant/Grid.js";

function ProductModelSet(isEditMode) {
  const data = [
    {
      prod_gbn_id: 1,
      prod_gbn_cd: "TEST",
      prod_gbn_nm: "TEST TEST",
      checkTest: 1,
    },
    {
      prod_gbn_id: 2,
      prod_gbn_cd: "TEST",
      prod_gbn_nm: "TEST TEST",
      checkTest: 1,
    },
    {
      prod_gbn_id: 3,
      prod_gbn_cd: "TEST",
      prod_gbn_nm: "TEST TEST",
      checkTest: 0,
    },
  ];
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
      header: "제품군ID",
      name: "model_id",
      minWidth: WIDTH_SHORT,
      align: "left",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
      backgroundColor: "green",
    },
    {
      header: "제품군코드",
      name: "model_cd",
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
      header: "제품군명",
      name: "model_nm",
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: true,
      filter: true,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      header: "등록시간",
      name: "create_at",
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
      header: "등록자ID",
      name: "create_uid",
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
      header: "수정시간",
      name: "update_at",
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
      header: "수정자ID",
      name: "update_uid",
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
      header: "삭제시간",
      name: "delete_at",
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
      header: "삭제자ID",
      name: "delete_id",
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
      header: "제품군코드",
      name: "model_cd",
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
      header: "제품군명",
      name: "model_nm",
      minWidth: WIDTH_SHORT,
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

  const header = {
    // height: 100,
    // complexColumns: [
    //   {
    //     header: "test",
    //     name: "test_test",
    //     childNames: ["line_cd", "line_nm"],
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
    // columns: [
    //   {
    //     name: "line_cd",
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
  };
  // const header = {
  //   height: "60",
  //   complexColumns: [
  //     {
  //       header: "ID + Name",
  //       name: "parent1",
  //       childNames: ["id", "name"],
  //     },
  //   ],
  // };

  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안씀 - null
   */
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ⭐ BE : query params
   */
  const inputSet = [
    {
      name: "제품군코드",
      id: "model_cd",
    },
    {
      name: "제품군명",
      id: "model_nm",
    },
  ];

  const uri = restURI.productModel;

  const buttonDisabled = false;

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
    uri,
    buttonDisabled,
  };
}

export default ProductModelSet;
