const URI = {
  SYS: {
    LOGIN: { MAIN: "/login", FACTORY: "/std/factory/sign-in" },
    AUT: { MAIN: "/aut", SETUP: "/setup" },
    USER: { MAIN: "/aut/user" },
    USER_LOG: { MAIN: "/sys/user-log" },
    MENU: { MAIN: "/menuinvest", AUT_CHECK: "/menuinvest/auth" },
  },
  SYNC: {
    PROD: "/sys/sync-prod",
    LINE: "/sys/sync-line",
    DEPT: "/sys/sync-dept",
    GRADE: "/sys/sync-grade",
    EMP: "/sys/sync-emp",
    SPARE: "/sys/sync-mat-income",
  },

  STD: {
    FACTORY: { MAIN: "/std/factory/" },
    DEPT: { MAIN: "/std/dept/" },
    GRADE: { MAIN: "/std/grade/" },
    WORKER_GROUP: { MAIN: "/std/worker-group/" },
    EMP: { MAIN: "/std/emp/" },
    LINE: { MAIN: "/std/line/", INCLUDE_REWORK: "/std/line/include-rework" },
    LINE_DEPT: { MAIN: "/std/line-dept/" },
    PROC: { MAIN: "/std/proc/" },
    EQUIP: { MAIN: "/std/equip/" },
    DOWNTIME_TYPE: { MAIN: "/std/downtime-type/" },
    DOWNTIME: { MAIN: "/std/downtime" },
    PROD_GBN: { MAIN: "/std/prod-gbn" },
    PROD_TYPE: { MAIN: "/std/prod-type" },
    MODEL: { MAIN: "/std/model" },
    PROD_TYPE_SMALL: { MAIN: "/std/prod-type-small" },
    PROD_CLASS: { MAIN: "/std/prod-class" },
    UNIT: { MAIN: "/std/unit" },
    PROD: { MAIN: "/std/prod" },
    STORE: { MAIN: "/std/store", INCLUDE_LOCATION: "/std/store/include-location" },
    LOCATION: { MAIN: "/std/location" },
    PARTNER_TYPE: { MAIN: "/std/partner-type" },
    PARTNER: { MAIN: "/std/partner" },
    INSP_ITEM_TYPE: { MAIN: "/std/insp-item-type" },
    INSP_ITEM: { MAIN: "/std/insp-item" },
    INSP_METHOD: { MAIN: "/std/insp-method" },
    INSP_TOOL: { MAIN: "/std/insp-tool" },
    FILING: { MAIN: "/std/insp-filing" },
    DOCUMENT: {
      MAIN: "/std/insp-document",
      DETAIL: "/std/insp-document-detail",
      INCLUDE_DETAIL: "/std/insp-document/include-details",
    },
    CONTROL_PLAN: { MAIN: "/std/control-plan", DETAIL: "/std/control-plan-detail" },
    INFC_ITEM_TYPE: { MAIN: "/std/infc-item-type" },
    INFC_ITEM: { MAIN: "/std/infc-item" },
    INFC_MEMORY: { MAIN: "/std/infc-memory" },
    BARCODE: { MAIN: "/std/barcode", ERP_CHECK: "/std/barcode/erp", MES_CHECK: "/std/barcode-by-reference" },
  },
  PRD: {
    SUBDIVISION: { MAIN: "/prd/subdivision", DETAIL: "/prd/subdivision-detail", MULTI_HEADER: "/prd/subdivisions" },
    WEIGH: { MAIN: "/prd/weigh", DETAIL: "/prd/weigh-detail", COMPLETE: "/prd/weigh/{id}/complete" },
    PACKING: { MAIN: "/prd/packing", DETAIL: "/prd/packing-detail" },
    ORDER: { MAIN: "/prd/order", DETAIL: "/prd/order-detail" },
    ORDER_INPUT: { MAIN: "/prd/order-input" },
    WORK_DOWNTIME: { MAIN: "/prd/work-downtime" },
    LOT_TRACKING: { MAIN: "/prd/lot-tracking" },
    WORKER_GROUP_STATUS: {
      MAIN: "/prd/worker-group-status",
      DETAIL: "/prd/worker-group-status-detail",
      EDIT: "/prd/worker-group-status/{id}/include-details",
    },
  },
  INV: {
    STORE: { MAIN: "inv/store" },
    TRAN_TYPE: { MAIN: "inv/tran-type" },
  },
  EQM: {
    EQUIP_CLASSIFICATION: { MAIN: "/eqm/equip-classification" },
    EQUIP_GROUP: { MAIN: "/eqm/equip-group" },
    EQUIP_CLASS: { MAIN: "/eqm/equip-class" },
    EQUIP_DETAIL: { MAIN: "/eqm/equip-detail" },
    SPARE_RELEASE: { MAIN: "/eqm/spare-release" },
  },
  QMS: {
    INSP_RESULT: {
      MAIN: "/qms/insp-result",
      DETAIL: "/qms/insp-result-detail",
      INCLUDE: "/qms/insp-result/{id}/include-details",
      EXCEL: { MAIN: "/qms/insp-result-upload", UPLOAD: "/qms/insp-result-upload/excel" },
    },
  },
  KPI: {
    PRD: {
      DAILY_LINE: "/kpi/production/daily-by-line",
      MONTHLY_LINE: "/kpi/production/monthly-by-line",
      MONTHLY_PROD: "/kpi/production/monthly-by-prod",
      DOWNTIME_TOP5: "/kpi/downtime/share",
      DOWNTIME_LINE: "/kpi/sys-downtime/share",
    },
  },
  STATUS: {
    PRD: {
      TEMP: "/prd/temp/raws",
      TEMP_MONTHLY: "/prd/temp/change-by-monthly",
      COUNT: "/prd/count/raws",
    },
    EQM: { MAIN: "/eqm/raws", COLUMNS: "/eqm/raws/columns" },
    DASHBOARD: {
      MAIN: "/dashboard/main",
      REAL_TIME: "/dashboard/realtime/prod-site",
    },
  },
  FUNC: {
    WEIGHT: "/prd/weight/raws", //소분일지 중량계
    CHECK_LIST: "/prd/order-details/raws", //운전점검일지 데이터 맵핑
  },
};

export default URI;
