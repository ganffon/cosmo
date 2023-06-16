import CN from "json/ColumnName.json";
const convertChar = (column) => {
  return column.includes("\n") ? column.replace(/\n/g, " ") : column;
};
const TooltipStore = {
  pwd_fg: {
    columnName: "pwd_fg",
    tooltip: `🔸${convertChar(CN.pwd_fg)}
    비밀번호를 분실한 사용자를 체크하세요
    체크시 비밀번호는 초기비밀번호로 설정되며 
    사용자는 로그인 시 비밀번호 변경 페이지로 이동합니다`,
  },
  admin_fg: {
    columnName: "admin_fg",
    tooltip: `🔸${convertChar(CN.admin_fg)}
    프로그램 메뉴에 대한 전체 권한을 갖는 사용자를 체크하세요
    admin계정은 시스템상에서 필수로 등록됩니다.`,
  },
  worker_fg: {
    columnName: "worker_fg",
    tooltip: `🔸${convertChar(CN.worker_fg)}
    생산정보에 작업자로 등록할 사원을 체크하세요`,
  },
  is_spareparts: {
    columnName: "is_spareparts",
    tooltip: `🔸${convertChar(CN.is_spareparts)}
    설비관리 > SpareParts정보에서
    관리하는 품목을 체크하세요`,
  },
  apply_fg: {
    columnName: "apply_fg",
    tooltip: `🔸${convertChar(CN.apply_fg)}
    품목 별로 관리하는 검사기준서를 체크하세요`,
  },
};

export default TooltipStore;
