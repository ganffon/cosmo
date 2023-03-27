//설비관리✨
import restURI from "api/restURI.json";
import restAPI from "api/restAPI";
import "components/grid/style/GridStyle.css";
import CustomGrid from "components/grid/setting/CustomGrid";
import getComboParams from "api/getComboParams";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

const comboBoxData = async () => {
  let data;
  data = await restAPI.get("/process/search").then((res) => {
    res.data.data.rows.map((raw) => getComboParams("ProcessSet", raw));
  });
  console.log(data);
};

comboBoxData();
// console.log(data);
// const listItem = data?.data?.data?.rows.map((raw) =>
//   getComboParams("ProcessSet", raw)
// );
// console.log(listItem);

function EquipmentSet(isEditMode) {
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
      header: "설비ID",
      name: "equip_id",
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
      header: "공장ID",
      name: "factory_id",
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
      header: "공정ID",
      name: "proc_id",
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
      header: "공정명",
      name: "proc_nm",
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
      header: "설비유형ID",
      name: "equip_type_id",
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
      header: "설비코드",
      name: "equip_cd",
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
      header: "설비명",
      name: "equip_nm",
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
      header: "작업장ID",
      name: "workings_id",
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
      header: "관리자(정)ID",
      name: "manager_emp_id",
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
      header: "관리자(부)ID",
      name: "sub_manager_emp_id",
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
      name: "use_fg",
      header: "사용여부",
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "use_fg",
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
      name: "prd_fg",
      header: "생산설비",
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "prd_fg",
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
      header: "비고",
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
      header: "등록시간",
      name: "create_at",
      minWidth: WIDTH_LONG,
      align: "cneter",
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
      align: "cneter",
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
      align: "cneter",
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
      align: "cneter",
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
      align: "cneter",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      header: "삭제자ID",
      name: "delete_id",
      minWidth: WIDTH_SHORT,
      align: "cneter",
      editor: false,
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
  ];
  const columnsModal = [
    {
      header: "공정명",
      name: "proc_nm",
      minWidth: WIDTH_SHORT,
      align: "left",
      formatter: "listItemText",
      editor: {
        type: "select",
        options: {
          // listItems: listItem,
          listItems: [
            { text: "1번공정", value: "88DB6539-57CC-ED11-A1E2-A0D3C1FA18B6" },
            { text: "2번공정", value: "89DB6539-57CC-ED11-A1E2-A0D3C1FA18B6" },
            { text: "3번공정", value: "8ADB6539-57CC-ED11-A1E2-A0D3C1FA18B6" },
          ],
        },
      },
      hidden: false,
      sortable: false,
      filter: false,
      whiteSpace: false,
      rowSpan: false,
    },
    {
      header: "설비코드",
      name: "equip_cd",
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
      header: "설비명",
      name: "equip_nm",
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
      header: "사용여부",
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "use_fg",
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
      name: "prd_fg",
      header: "생산설비",
      renderer: {
        type: CustomGrid.CheckBox,
        options: {
          name: "prd_fg",
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
      header: "비고",
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
      name: "설비코드",
      id: "equip_cd",
    },
    {
      name: "설비명",
      id: "equip_nm",
    },
  ];

  const uri = restURI.equipment;

  const buttonDisabled = false;

  return {
    data,
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

export default EquipmentSet;
