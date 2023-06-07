import * as C from "constant/Grid";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import * as RE from "custom/RegularExpression";
import Condition from "./Condition";

const id = (name = "", header = "", hidden = false) => {
  return {
    name: name,
    header: header,
    minWidth: C.WIDTH_SHORT,
    editor: false,
    align: "left",
    hidden: hidden,
    sortable: false,
    filter: false,
    whiteSpace: false,
    rowSpan: false,
  };
};
const text = (
  name = "",
  header = "",
  isEditMode = false,
  hidden = false,
  minWidth = C.WIDTH_SHORT,
  align = "left",
  sortable = false,
  filter = false,
  whiteSpace = false,
  rowSpan = false
) => {
  return {
    name: name,
    header: header,
    minWidth: minWidth,
    editor: isEditMode ? "text" : false,
    align: align,
    hidden: hidden,
    sortable: sortable,
    filter: filter ? "select" : false,
    whiteSpace: whiteSpace,
    rowSpan: rowSpan,
  };
};

const list = (
  id = "",
  name = "",
  header = "",
  listArray = [],
  isEditMode = false,
  minWidth = C.WIDTH_SHORT,
  hidden = false,
  align = "left",
  sortable = false,
  filter = false,
  whiteSpace = false,
  rowSpan = false
) => {
  return {
    name: isEditMode ? id : name,
    header: header,
    minWidth: minWidth,
    formatter: isEditMode ? "listItemText" : null,
    editor: isEditMode
      ? {
          type: "select",
          options: {
            listItems: listArray,
          },
        }
      : false,
    align: align,
    hidden: hidden,
    sortable: sortable,
    filter: filter,
    whiteSpace: whiteSpace,
    rowSpan: rowSpan,
  };
};
const listGbn = (
  name = "",
  header = "",
  isEditMode = false,
  minWidth = C.WIDTH_SHORT,
  hidden = false,
  align = "left",
  sortable = false,
  filter = false,
  whiteSpace = false,
  rowSpan = false
) => {
  return {
    name: name,
    header: header,
    minWidth: minWidth,
    formatter: isEditMode ? "listItemText" : null,
    editor: isEditMode
      ? {
          type: "select",
          options: {
            listItems: [
              { text: "제품", value: "제품" },
              { text: "공정", value: "공정" },
            ],
          },
        }
      : false,
    align: align,
    hidden: hidden,
    sortable: sortable,
    filter: filter,
    whiteSpace: whiteSpace,
    rowSpan: rowSpan,
  };
};
const check = (
  name = "",
  header = "",
  isEditMode = false,
  minWidth = C.WIDTH_SUPER_SHORT,
  hidden = false,
  sortable = false,
  filter = false,
  whiteSpace = false,
  rowSpan = false
) => {
  return {
    name: name,
    header: header,
    minWidth: minWidth,
    editor: false,
    renderer: {
      type: CustomGrid.CheckBox,
      options: {
        name: name,
        disabled: isEditMode ? false : true,
      },
    },
    align: "center",
    hidden: hidden,
    sortable: sortable,
    filter: filter,
    whiteSpace: whiteSpace,
    rowSpan: rowSpan,
  };
};
const button = (name = "", header = "", btnName = "", func = () => {}, disabled = false) => {
  return {
    name: name,
    header: header,
    minWidth: C.WIDTH_SHORT,
    align: "center",
    editor: false,
    renderer: {
      type: CustomGrid.Button,
      options: {
        name: btnName,
        onClick: func,
        disabled: disabled,
      },
    },
    hidden: false,
    sortable: false,
    filter: false,
    whiteSpace: false,
    rowSpan: false,
  };
};
/**
 *
 * @param {*} name
 * @param {*} header
 * @param {*} isEditMode
 * @param {*} minWidth
 * 실제 입력받는 페이지에서 Grid Edit Finish 에 정규표현식 적용해줘야함
 * if (Condition(e, ["columnName"])) {
 *  RE.NumComma(e, refGrid, "columnName");
 * }
 * @returns
 */
const number = (name = "", header = "", isEditMode = false, minWidth = C.WIDTH_SHORT, hidden = false) => {
  return {
    name: name,
    header: header,
    minWidth: minWidth,
    align: "right",
    editor: isEditMode ? "text" : false,
    formatter: function (value) {
      return CustomGrid.NumComma(value);
    },
    hidden: hidden,
    sortable: false,
    filter: false,
    whiteSpace: false,
    rowSpan: false,
  };
};

const select = (name = "", header = "", isEditMode = false, minWidth = C.WIDTH_SHORT, align = "left") => {
  return {
    name: name,
    header: header,
    minWidth: minWidth,
    align: align,
    editor: false,
    validation: isEditMode
      ? {
          required: true,
        }
      : null,
    hidden: false,
    sortable: false,
    filter: false,
    whiteSpace: false,
    rowSpan: false,
  };
};

const date = (name = "", header = "", isEditMode = false, minWidth = C.WIDTH_SHORT) => {
  return {
    name: name,
    header: header,
    minWidth: minWidth,
    align: "center",
    editor: isEditMode
      ? {
          type: "datePicker",
          options: {
            language: "ko",
            format: "yyyy-MM-dd",
          },
        }
      : false,
    hidden: false,
    sortable: false,
    filter: false,
    whiteSpace: false,
    rowSpan: false,
  };
};

const password = (name = "", header = "", isEditMode = false) => {
  return {
    name: name,
    header: header,
    minWidth: C.WIDTH_MIDDLE,
    align: "left",
    editor: isEditMode ? "password" : false,
    formatter: function (value) {
      return CustomGrid.Password(value, false);
    },
    hidden: false,
    sortable: false,
    filter: false,
    whiteSpace: false,
    rowSpan: false,
  };
};

const multi = (names = []) => {
  const columns = names.map((name) => {
    return {
      name: name,
      renderer: CustomGrid.ColumnHeaderMultiLine,
    };
  });

  return {
    columns,
  };
};

const RENumComma = (e, refGrid, columnName) => {
  if (Condition(e, [columnName])) {
    RE.NumComma(e, refGrid, columnName);
  }
};

export { id, text, list, listGbn, check, button, number, select, date, password, multi, RENumComma };
