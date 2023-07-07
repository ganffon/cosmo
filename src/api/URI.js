const URI = {
  AUT: {
    LOGIN: { BASE: "/login", FACTORY: "/std/factory/sign-in" },
    AUT: { BASE: "/aut", SETUP: "/setup" },
    USER: { BASE: "/aut/user" },
    USER_LOG: { BASE: "/sys/user-log" },
    MENU: { BASE: "/menuinvest", AUT_CHECK: "/menuinvest/auth" },
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
    FACTORY: { BASE: "/std/factory/" },
    DEPT: { BASE: "/std/dept/" },
    GRADE: { BASE: "/std/grade/" },
    WORKER_GROUP: { BASE: "/std/worker-group/" },
    EMP: { BASE: "/std/emp/" },
    LINE: { BASE: "/std/line/", INCLUDE_REWORK: "/std/line/include-rework" },
    LINE_DEPT: { BASE: "/std/line-dept/" },
    PROC: { BASE: "/std/proc/" },
    EQUIP: { BASE: "/std/equip/" },
    DOWNTIME_TYPE: { BASE: "/std/downtime-type/" },
    DOWNTIME: { BASE: "/std/downtime" },
    PROD_GBN: { BASE: "/std/prod-gbn" },
    PROD_TYPE: { BASE: "/std/prod-type" },
    MODEL: { BASE: "/std/model" },
    PROD_TYPE_SMALL: { BASE: "/std/prod-type-small" },
    PROD_CLASS: { BASE: "/std/prod-class" },
    UNIT: { BASE: "/std/unit" },
    PROD: { BASE: "/std/prod" },
    STORE: { BASE: "/std/store", INCLUDE_LOCATION: "/std/store/include-location" },
    LOCATION: { BASE: "/std/location" },
    PARTNER_TYPE: { BASE: "/std/partner-type" },
    PARTNER: { BASE: "/std/partner" },
    INSP_ITEM_TYPE: { BASE: "/std/insp-item-type" },
    INSP_ITEM: { BASE: "/std/insp-item" },
    INSP_METHOD: { BASE: "/std/insp-method" },
    INSP_TOOL: { BASE: "/std/insp-tool" },
    FILING: { BASE: "/std/insp-filing" },
    DOCUMENT: {
      BASE: "/std/insp-document",
      DETAIL: "/std/insp-document-detail",
      INCLUDE_DETAIL: "/std/insp-document/include-details",
    },
    CONTROL_PLAN: { BASE: "/std/control-plan", DETAIL: "/std/control-plan-detail" },
    INFC_ITEM_TYPE: { BASE: "/std/infc-item-type" },
    INFC_ITEM: { BASE: "/std/infc-item" },
    INFC_MEMORY: { BASE: "/std/infc-memory" },
    BARCODE: { BASE: "/std/barcode", ERP_CHECK: "/std/barcode/erp", MES_CHECK: "/std/barcode-by-reference" },
  },
  PRD: {
    SUBDIVISION: { BASE: "/prd/subdivision", DETAIL: "/prd/subdivision-detail", MULTI_HEADER: "/prd/subdivisions" },
    WEIGH: { BASE: "/prd/weigh", DETAIL: "/prd/weigh-detail", COMPLETE: "/prd/weigh/{id}/complete" },
    PACKING: { BASE: "/prd/packing", DETAIL: "/prd/packing-detail" },
    ORDER: { BASE: "/prd/order", DETAIL: "/prd/order-detail" },
    ORDER_INPUT: { BASE: "/prd/order-input" },
    WORK_DOWNTIME: { BASE: "/prd/work-downtime" },
    LOT_TRACKING: { BASE: "/prd/lot-tracking" },
    WORKER_GROUP_STATUS: {
      BASE: "/prd/worker-group-status",
      DETAIL: "/prd/worker-group-status-detail",
      EDIT: "/prd/worker-group-status/{id}/include-details",
    },
  },
  INV: {
    STORE: { BASE: "inv/store" },
    TRAN_TYPE: { BASE: "inv/tran-type" },
  },
  EQM: {
    EQUIP_CLASSIFICATION: { BASE: "/eqm/equip-classification" },
    EQUIP_GROUP: { BASE: "/eqm/equip-group" },
    EQUIP_CLASS: { BASE: "/eqm/equip-class" },
    EQUIP_DETAIL: { BASE: "/eqm/equip-detail" },
    SPARE_RELEASE: { BASE: "/eqm/spare-release" },
  },
  QMS: {
    INSP_RESULT: {
      BASE: "/qms/insp-result",
      DETAIL: "/qms/insp-result-detail",
      INCLUDE: "/qms/insp-result/{id}/include-details",
      EXCEL: { BASE: "/qms/insp-result-upload", UPLOAD: "/qms/insp-result-upload/excel" },
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
    EQM: { BASE: "/eqm/raws", COLUMNS: "/eqm/raws/columns" },
    DASHBOARD: {
      BASE: "/dashboard/main",
      REAL_TIME: "/dashboard/realtime/prod-site",
    },
  },
  FUNC: {
    WEIGHT: "/prd/weight/raws", //소분일지 중량계
    CHECK_LIST: "/prd/order-details/raws", //운전점검일지 데이터 맵핑
  },
};

export default URI;
