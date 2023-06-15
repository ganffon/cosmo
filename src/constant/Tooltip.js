import CN from "json/ColumnName.json";
const convertChar = (column) => {
  return column.includes("\n") ? column.replace(/\n/g, " ") : column;
};
const TooltipStore = {
  lineNm: {
    columnName: "line_nm",
    tooltip: `🔸${convertChar(CN.line_nm)}
    라인명을 입력합니다`,
  },
  lineCd: {
    columnName: "line_cd",
    tooltip: `🔸${convertChar(CN.line_cd)}`,
  },
  spareParts: {
    columnName: "is_spareparts",
    tooltip: `🔸${convertChar(CN.is_spareparts)}`,
  },
  pwdFg: {
    columnName: "pwd_fg",
    tooltip: `🔸${convertChar(CN.pwd_fg)}`,
  },
};

export default TooltipStore;
