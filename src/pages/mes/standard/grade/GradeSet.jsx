//공정관리✨
//🔍 OnlySearchSingleGrid.jsx 에서 사용
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

function GradeSet(isEditMode) {
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
      name: "grade_id",
      header: CN.grade_id,
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
      name: "grade_cd",
      header: CN.grade_cd,
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
      name: "grade_nm",
      header: CN.grade_nm,
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
      hidden: false,
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

  const header = {};
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

  const datePickerSet = null; // "single" || "range" || null

  const inputSet = [
    {
      id: "grade_cd",
      name: CN.grade_cd,
    },
    {
      id: "grade_nm",
      name: CN.grade_nm,
    },
  ];

  const uri = restURI.grade;

  return {
    data,
    rowHeaders,
    columns,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
    uri,
  };
}

export default GradeSet;