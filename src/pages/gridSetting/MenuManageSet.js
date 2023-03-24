//라인관리✨
//🔍 OnlySearchSingleGrid.jsx 에서 사용
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
      header: "메뉴ID",
      name: "menu_id",
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
      header: "메뉴코드",
      name: "menu_cd",
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
      header: "메뉴명",
      name: "menu_nm",
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
      header: "컴포넌트명",
      name: "menu_cpnt",
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
      header: "동작메뉴",
      name: "act_fg",
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
      header: "메뉴구분",
      name: "read_only_fg",
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
      header: "공용폼",
      name: "common_fg",
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
      header: "사용여부",
      name: "use_fg",
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
      header: "공장ID",
      name: "factory_id",
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
      name: "line_id",
      header: "라인ID",
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
      header: "라인코드",
      name: "line_cd",
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
      name: "line_nm",
      header: "라인명",
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
      name: "메뉴코드",
      id: "menu_cd",
    },
    {
      name: "메뉴명",
      id: "menu_nm",
    },
  ];

  const uri = restURI.lines;

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

export default MenuManageSet;
