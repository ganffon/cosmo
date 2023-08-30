const convertURL = (id) => {
  const path = id.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  return path;
};
const MenuList = [
  {
    name: "기준정보",
    id: "standard",
    path: null,
    under: [
      {
        name: "기본정보",
        id: "standard-info",
        path: null,
        under: [
          {
            name: "사업부관리",
            id: "Factory",
            path: convertURL("Factory"),
            under: null,
          },
          {
            name: "라인관리",
            id: "Line",
            path: convertURL("Line"),
            under: null,
          },
          {
            name: "라인부서관리",
            id: "LineDepartment",
            path: convertURL("LineDepartment"),
            under: null,
          },
          {
            name: "공정관리",
            id: "Process",
            path: convertURL("Process"),
            under: null,
          },
          {
            name: "설비관리",
            id: "Equipment",
            path: convertURL("Equipment"),
            under: null,
          },
        ],
      },

      {
        name: "제품정보",
        id: "product-info",
        path: null,
        under: [
          {
            name: "제품구분관리",
            id: "ProductGbn",
            path: convertURL("ProductGbn"),
            under: null,
          },
          {
            name: "제품군관리",
            id: "ProductModel",
            path: convertURL("ProductModel"),
            under: null,
          },
          {
            name: "제품분류관리",
            id: "ProductClass",
            path: convertURL("ProductClass"),
            under: null,
          },
          {
            name: "품목관리",
            id: "Product",
            path: convertURL("Product"),
            under: null,
          },
          {
            name: "단위관리",
            id: "Unit",
            path: convertURL("Unit"),
            under: null,
          },
          {
            name: "품목매칭관리",
            id: "ProductRouting",
            path: convertURL("ProductRouting"),
            under: null,
          },
        ],
      },
      {
        name: "사원정보",
        id: "employee-info",
        path: null,
        under: [
          {
            name: "부서관리",
            id: "Department",
            path: convertURL("Department"),
            under: null,
          },
          {
            name: "직급관리",
            id: "Grade",
            path: convertURL("Grade"),
            under: null,
          },
          {
            name: "사원관리",
            id: "Employee",
            path: convertURL("Employee"),
            under: null,
          },
          {
            name: "근무유형",
            id: "WorkType",
            path: convertURL("WorkType"),
            under: null,
          },
        ],
      },
      {
        name: "창고정보",
        id: "store-info",
        path: null,
        under: [
          {
            name: "창고관리",
            id: "Store",
            path: convertURL("Store"),
            under: null,
          },
          {
            name: "위치관리",
            id: "StoreLocation",
            path: convertURL("StoreLocation"),
            under: null,
          },
        ],
      },
      {
        name: "비가동정보",
        id: "downtime-info",
        path: null,
        under: [
          {
            name: "비가동유형관리",
            id: "DowntimeType",
            path: convertURL("DowntimeType"),
            under: null,
          },
          {
            name: "비가동관리",
            id: "Downtime",
            path: convertURL("Downtime"),
            under: null,
          },
        ],
      },
      {
        name: "관리계획서정보",
        id: "inspection-info",
        path: null,
        under: [
          {
            name: "검사기록물관리",
            id: "InspectFiling",
            path: convertURL("InspectFiling"),
            under: null,
          },
          {
            name: "검사방법관리",
            id: "InspectMethod",
            path: convertURL("InspectMethod"),
            under: null,
          },
          {
            name: "검사구관리",
            id: "InspectTool",
            path: convertURL("InspectTool"),
            under: null,
          },
          {
            name: "검사유형관리",
            id: "InspectType",
            path: convertURL("InspectType"),
            under: null,
          },
          {
            name: "검사항목관리",
            id: "InspectItem",
            path: convertURL("InspectItem"),
            under: null,
          },
          {
            name: "관리계획서",
            id: "InspDocument",
            path: convertURL("InspDocument"),
            under: null,
          },
        ],
      },
      {
        name: "설비I/F정보",
        id: "interface-info",
        path: null,
        under: [
          {
            name: "설비I/F유형관리",
            id: "InterfaceItemType",
            path: convertURL("InterfaceItemType"),
            under: null,
          },
          {
            name: "설비I/F항목관리",
            id: "InterfaceItem",
            path: convertURL("InterfaceItem"),
            under: null,
          },
          {
            name: "MemoryMap관리",
            id: "InterfaceMemory",
            path: convertURL("InterfaceMemory"),
            under: null,
          },
        ],
      },
      {
        name: "계정관리",
        id: "account-info",
        path: null,
        under: [
          {
            name: "사용자관리",
            id: "User",
            path: convertURL("User"),
            under: null,
          },
          {
            name: "설정관리",
            id: "SysOptionManage",
            path: convertURL("SysOptionManage"),
            under: null,
          },
          {
            name: "권한관리",
            id: "Setup",
            path: convertURL("Setup"),
            under: null,
          },
          {
            name: "사용자이력현황",
            id: "UserHistory",
            path: convertURL("UserHistory"),
            under: null,
          },
        ],
      },
      {
        name: "공지사항",
        id: "Notice",
        path: convertURL("Notice"),
        under: null,
      },
    ],
  },
  {
    name: "재고관리",
    id: "inventory",
    path: null,
    under: [
      {
        name: "재고정보",
        id: "inventory-info",
        path: null,
        under: [
          {
            name: "재고현황",
            id: "StoreView",
            path: convertURL("StoreView"),
            under: null,
          },
          {
            name: "재고실사",
            id: "StoreCheck",
            path: convertURL("StoreCheck"),
            under: null,
          },
        ],
      },
    ],
  },
  {
    name: "생산관리",
    id: "production",
    path: null,
    under: [
      {
        name: "작업지시",
        id: "dayreport-info",
        path: null,
        under: [
          {
            name: "작업지시서",
            id: "ProductionOrder",
            path: convertURL("ProductionOrder"),
            under: null,
          },
        ],
      },
      {
        name: "생산일지정보",
        id: "production-dayreport-info",
        path: null,
        under: [
          {
            name: "일일소분일지",
            id: "Subdivision",
            path: convertURL("Subdivision"),
            under: null,
          },
          {
            name: "일일계량일지",
            id: "Weight",
            path: convertURL("Weight"),
            under: null,
          },
          {
            name: "일일포장일지",
            id: "Packing",
            path: convertURL("Packing"),
            under: null,
          },
          {
            name: "일일운전점검일지",
            id: "EquipmentResult",
            path: convertURL("EquipmentResult"),
            under: null,
          },
          {
            name: "포장투입일지",
            id: "PackingInput",
            path: convertURL("PackingInput"),
            under: null,
          },
        ],
      },
      {
        name: "생산현황",
        id: "production-dayreport",
        path: null,
        under: [
          {
            name: "일일소분실적현황",
            id: "SubdivisionReport",
            path: convertURL("SubdivisionReport"),
            under: null,
          },
          {
            name: "일일계량실적현황",
            id: "WeightReport",
            path: convertURL("WeightReport"),
            under: null,
          },
          {
            name: "일일포장실적현황",
            id: "ProductionPackingView",
            path: convertURL("ProductionPackingView"),
            under: null,
          },
        ],
      },
      {
        name: "비가동관리",
        id: "ProductionDowntime",
        path: convertURL("ProductionDowntime"),
        under: null,
      },
      {
        name: "비가동현황(충진)",
        id: "DowntimeReport",
        path: convertURL("DowntimeReport"),
        under: null,
      },
      {
        name: "Lot추적일지",
        id: "ProductionLotTracking",
        path: convertURL("ProductionLotTracking"),
        under: null,
      },
      {
        name: "근무이력조회",
        id: "WorkerGroupHistory",
        path: convertURL("WorkerGroupHistory"),
        under: null,
      },
    ],
  },
  {
    name: "설비관리",
    id: "equipment",
    path: null,
    under: [
      {
        name: "상세제원정보",
        id: "equipment-spec-info",
        path: null,
        under: [
          {
            name: "대분류관리",
            id: "EquipmentLarge",
            path: convertURL("EquipmentLarge"),
            under: null,
          },
          {
            name: "중분류관리",
            id: "EquipmentMedium",
            path: convertURL("EquipmentMedium"),
            under: null,
          },
          {
            name: "소분류관리",
            id: "EquipmentSmall",
            path: convertURL("EquipmentSmall"),
            under: null,
          },
          {
            name: "상세제원관리",
            id: "EquipmentDetail",
            path: convertURL("EquipmentDetail"),
            under: null,
          },
        ],
      },
      {
        name: "SpareParts정보",
        id: "spareparts-info",
        path: null,
        under: [
          {
            name: "SpareParts출고관리",
            id: "SparePartsRelease",
            path: convertURL("SparePartsRelease"),
            under: null,
          },
          {
            name: "SpareParts재고현황",
            id: "SparePartsStoreView",
            path: convertURL("SparePartsStoreView"),
            under: null,
          },
        ],
      },
      {
        name: "Raw Data",
        id: "raw-data",
        path: null,
        under: [
          {
            name: "설비 데이터",
            id: "EquipmentRawDataView",
            path: convertURL("EquipmentRawDataView"),
            under: null,
          },
          {
            name: "온습도 데이터",
            id: "TempRaws",
            path: convertURL("TempRaws"),
            under: null,
          },
          {
            name: "충진기 생산 횟수",
            id: "CountRaws",
            path: convertURL("CountRaws"),
            under: null,
          },
        ],
      },
    ],
  },
  {
    name: "품질관리",
    id: "quality",
    path: null,
    under: [
      {
        name: "제품검사정보",
        id: "quality-result-info",
        path: null,
        under: [
          {
            name: "검사성적서관리",
            id: "InspectionResult",
            path: convertURL("InspectionResult"),
            under: null,
          },
          {
            name: "검사결과현황",
            id: "InspResult",
            path: convertURL("InspResult"),
            under: null,
          },
        ],
      },
      {
        name: "공정관리도(SPC)",
        id: "QualitySpc",
        path: convertURL("QualitySpc"),
        under: null,
      },
    ],
  },
  {
    name: "경영정보",
    id: "management",
    path: null,
    under: [
      {
        name: "생산량",
        id: "product-qty",
        path: null,
        under: [
          {
            name: "라인별생산량(일)",
            id: "DailyLineCapa",
            path: convertURL("DailyLineCapa"),
            under: null,
          },
          {
            name: "라인별생산량(월)",
            id: "MonthlyLineCapa",
            path: convertURL("MonthlyLineCapa"),
            under: null,
          },
          {
            name: "품목별생산량",
            id: "MonthlyPartCapa",
            path: convertURL("MonthlyPartCapa"),
            under: null,
          },
          {
            name: "투입/생산",
            id: "DailyLineInputCapa",
            path: convertURL("DailyLineInputCapa"),
            under: null,
          },
        ],
      },
      {
        name: "가동률",
        id: "capa",
        path: null,
        under: [
          {
            name: "시간가동률",
            id: "TimeRate",
            path: convertURL("TimeRate"),
            under: null,
          },
          {
            name: "성능가동률",
            id: "PerformanceRate",
            path: convertURL("PerformanceRate"),
            under: null,
          },
        ],
      },
      {
        name: "대시보드",
        id: "dash",
        path: null,
        under: [
          {
            name: "현장 대시보드",
            id: "TempView",
            path: convertURL("TempView"),
            under: null,
          },
          {
            name: "비가동 대시보드",
            id: "EquipStatus",
            path: convertURL("EquipStatus"),
            under: null,
          },
          {
            name: "공장 온습도 월별 추이 현황",
            id: "MonthlyTempHumidChart",
            path: convertURL("MonthlyTempHumidChart"),
            under: null,
          },
          {
            name: "시간별 충진 count",
            id: "CountChart",
            path: convertURL("CountChart"),
            under: null,
          },
        ],
      },
    ],
  },
  {
    name: "생산현장",
    id: "panel",
    path: null,
    under: [
      {
        name: "현장용",
        id: "panel-info",
        path: null,
        under: [
          {
            name: "소분 공정(대량)",
            id: "SubdivisionPanel",
            path: convertURL("SubdivisionPanel"),
            under: null,
          },
          {
            name: "소분 공정(소량)",
            id: "SubdivisionGround",
            path: convertURL("SubdivisionGround"),
            under: null,
          },
          {
            name: "계량/투입 공정",
            id: "WeightPanel",
            path: convertURL("WeightPanel"),
            under: null,
          },
          {
            name: "포장 공정",
            id: "PackingPanel",
            path: convertURL("PackingPanel"),
            under: null,
          },
          {
            name: "운전점검일지",
            id: "EquipmentResult",
            path: convertURL("EquipmentResult"),
            under: null,
          },
          {
            name: "비가동 등록",
            id: "DowntimePanel",
            path: convertURL("DowntimePanel"),
            under: null,
          },
          {
            name: "조별상황일지",
            id: "WorkerGroupStatus",
            path: convertURL("WorkerGroupStatus"),
            under: null,
          },
        ],
      },
    ],
  },
];
export default MenuList;
