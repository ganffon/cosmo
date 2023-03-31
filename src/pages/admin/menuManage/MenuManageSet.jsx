//라인관리✨
//🔍 OnlySearchSingleGrid.jsx 에서 사용
import restURI from "api/restURI.json";
import CustomGrid from "components/grid/setting/CustomGrid";
import CN from "constant/ColumnName.json";
import "components/grid/style/GridStyle.css";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
  MODAL_BACK_COLOR,
} from "constant/Grid.js";

function MenuManageSet(isEditMode) {
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
      name: "menu_id",
      header: CN.menu_id,
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
      name: "menu_cd",
      header: CN.menu_cd,
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
      name: "menu_nm",
      header: CN.menu_nm,
      minWidth: WIDTH_MIDDLE,
      align: "left",
      editor: isEditMode ? "text" : false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
      // renderer: {
      //   styles: {
      //     backgroundColor: MODAL_BACK_COLOR,
      //     padding: "9px",
      //     margin: "0px",
      //   },
      // },
    },
    {
      name: "menu_cpnt",
      header: CN.menu_cpnt,
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
      name: "act_fg",
      header: CN.act_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "act_fg",
        },
      },
      minWidth: "60",
      hidden: false,
    },
    {
      name: "read_only_fg",
      header: CN.read_only_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "read_only_fg",
        },
      },
      minWidth: "60",
      hidden: false,
    },
    {
      name: "common_fg",
      header: CN.common_fg,
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "common_fg",
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
        },
      },
      minWidth: "60",
      hidden: false,
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

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };

  const header = {
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
      id: "menu_cd",
      name: CN.menu_cd,
    },
    {
      id: "menu_nm",
      name: CN.menu_nm,
    },
  ];

  const uri = restURI.line;

  const buttonDisabled = false;

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
    uri,
    buttonDisabled,
  };
}

export default MenuManageSet;
