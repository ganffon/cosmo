import { useState, useEffect } from "react";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GetCboParams from "api/GetCboParams";
/**
 * 🔸MUI 로 구현된 콤보박스 이름 정렬
 */
const cboMUISort = (obj, key_nm) => {
  const sortResult = obj.sort(function (a, b) {
    let x = a[key_nm].toLowerCase();
    let y = b[key_nm].toLowerCase();
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortResult;
};
/**
 * 🔸Tui Grid 로 구현된 콤보박스 이름 정렬
 */
const cboGridSort = (obj) => {
  const sortResult = obj.sort(function (a, b) {
    let x = a.text.toLowerCase();
    let y = b.text.toLowerCase();
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortResult;
};

let lineList = [];
const useLine = () => {
  const [lineOpt, setLineOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.line).then((res) => {
        setLineOpt(cboMUISort(res?.data?.data?.rows, "line_nm"));
        lineList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "line_id", "line_nm");
        });
        lineList = cboGridSort(lineList);
      });
    };
    getCboOpt();
  }, []);
  return [lineOpt, lineList];
};
let processList = [];
const useProcess = () => {
  const [processOpt, setProcessOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.process).then((res) => {
        setProcessOpt(cboMUISort(res?.data?.data?.rows, "proc_nm"));
        processList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "proc_id", "proc_nm");
        });
        processList = cboGridSort(processList);
      });
    };
    getCboOpt();
  }, []);
  return [processOpt, processList];
};
let equipmentList = [];
const useEquipment = () => {
  const [equipmentOpt, setEquipmentOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.equipment).then((res) => {
        setEquipmentOpt(cboMUISort(res?.data?.data?.rows, "equip_nm"));
        equipmentList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "equip_id", "equip_nm");
        });
        equipmentList = cboGridSort(equipmentList);
      });
    };
    getCboOpt();
  }, []);
  return [equipmentOpt, equipmentList];
};
let deptList = [];
const useDept = () => {
  const [deptOpt, setDeptOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.department).then((res) => {
        setDeptOpt(cboMUISort(res?.data?.data?.rows, "dept_nm"));
        deptList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "dept_id", "dept_nm");
        });
        deptList = cboGridSort(deptList);
      });
    };
    getCboOpt();
  }, []);
  return [deptOpt, deptList];
};
let gradeList = [];
const useGrade = () => {
  const [gradeOpt, setGradeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.grade).then((res) => {
        setGradeOpt(cboMUISort(res?.data?.data?.rows, "grade_nm"));
        gradeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "grade_id", "grade_nm");
        });
        gradeList = cboGridSort(gradeList);
      });
    };
    getCboOpt();
  }, []);
  return [gradeOpt, gradeList];
};
let employeeList = [];
const useEmployee = () => {
  const [employeeOpt, setEmployeeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.employee).then((res) => {
        setEmployeeOpt(cboMUISort(res?.data?.data?.rows, "emp_nm"));
        employeeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "emp_id", "emp_nm");
        });
        employeeList = cboGridSort(employeeList);
      });
    };
    getCboOpt();
  }, []);
  return [employeeOpt, employeeList];
};
let workerGroupList = [];
const useWorkerGroup = () => {
  const [workerGroupOpt, setWorkerGroupOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.workerGroup).then((res) => {
        setWorkerGroupOpt(cboMUISort(res?.data?.data?.rows, "worker_group_nm"));
        workerGroupList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "worker_group_id", "worker_group_nm");
        });
        workerGroupList = cboGridSort(workerGroupList);
      });
    };
    getCboOpt();
  }, []);
  return [workerGroupOpt, workerGroupList];
};
let productGbnList = [];
const useProductGbn = () => {
  const [productGbnOpt, setProductGbnOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.productGbn).then((res) => {
        setProductGbnOpt(cboMUISort(res?.data?.data?.rows, "prod_gbn_nm"));
        productGbnList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "prod_gbn_id", "prod_gbn_nm");
        });
        productGbnList = cboGridSort(productGbnList);
      });
    };
    getCboOpt();
  }, []);
  return [productGbnOpt, productGbnList];
};
let productModelList = [];
const useProductModel = () => {
  const [productModelOpt, setProductModelOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.productModel).then((res) => {
        setProductModelOpt(cboMUISort(res?.data?.data?.rows, "model_nm"));
        productModelList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "model_id", "model_nm");
        });
        productModelList = cboGridSort(productModelList);
      });
    };
    getCboOpt();
  }, []);
  return [productModelOpt, productModelList];
};
let productTypeList = [];
const useProductType = () => {
  const [productTypeOpt, setProductTypeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.productType).then((res) => {
        setProductTypeOpt(cboMUISort(res?.data?.data?.rows, "prod_type_nm"));
        productTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "prod_type_id", "prod_type_nm");
        });
        productTypeList = cboGridSort(productTypeList);
      });
    };
    getCboOpt();
  }, []);
  return [productTypeOpt, productTypeList];
};
let productTypeSmallList = [];
const useProductTypeSmall = () => {
  const [productTypeSmallOpt, setProductTypeSmallOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.productTypeSmall).then((res) => {
        setProductTypeSmallOpt(
          cboMUISort(res?.data?.data?.rows, "prod_type_small_nm")
        );
        productTypeSmallList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "prod_type_small_id", "prod_type_small_nm");
        });
        productTypeSmallList = cboGridSort(productTypeSmallList);
      });
    };
    getCboOpt();
  }, []);
  return [productTypeSmallOpt, productTypeSmallList];
};
let unitList = [];
const useUnit = () => {
  const [UnitOpt, setUnitOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.unit).then((res) => {
        setUnitOpt(cboMUISort(res?.data?.data?.rows, "unit_nm"));
        unitList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "unit_id", "unit_nm");
        });
        unitList = cboGridSort(unitList);
      });
    };
    getCboOpt();
  }, []);
  return [UnitOpt, unitList];
};
let infcItemTypeList = [];
const useInfcItemType = () => {
  const [infcItemTypeOpt, setInfcItemTypeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.infcItemType).then((res) => {
        setInfcItemTypeOpt(
          cboMUISort(res?.data?.data?.rows, "infc_item_type_nm")
        );
        infcItemTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "infc_item_type_id", "infc_item_type_nm");
        });
        infcItemTypeList = cboGridSort(infcItemTypeList);
      });
    };
    getCboOpt();
  }, []);
  return [infcItemTypeOpt, infcItemTypeList];
};
let infcItemList = [];
const useInfcItem = () => {
  const [infcItemOpt, setInfcItemOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.infcItem).then((res) => {
        setInfcItemOpt(cboMUISort(res?.data?.data?.rows, "infc_item_nm"));
        infcItemList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "infc_item_id", "infc_item_nm");
        });
        infcItemList = cboGridSort(infcItemList);
      });
    };
    getCboOpt();
  }, []);
  return [infcItemOpt, infcItemList];
};
let storeList = [];
const useStore = () => {
  const [storeOpt, setStoreOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.store).then((res) => {
        setStoreOpt(cboMUISort(res?.data?.data?.rows, "store_nm"));
        storeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "store_id", "store_nm");
        });
        storeList = cboGridSort(storeList);
      });
    };
    getCboOpt();
  }, []);
  return [storeOpt, storeList];
};
let equipmentLargeList = [];
const useEquipmentLarge = () => {
  const [equipmentLargeOpt, setEquipmentLargeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.equipmentLarge).then((res) => {
        setEquipmentLargeOpt(
          cboMUISort(res?.data?.data?.rows, "classification_nm")
        );
        equipmentLargeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "classification_id", "classification_nm");
        });
        equipmentLargeList = cboGridSort(equipmentLargeList);
      });
    };
    getCboOpt();
  }, []);
  return [equipmentLargeOpt, equipmentLargeList];
};
let equipmentMediumList = [];
const useEquipmentMedium = () => {
  const [equipmentMediumOpt, setEquipmentMediumOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.equipmentMedium).then((res) => {
        setEquipmentMediumOpt(cboMUISort(res?.data?.data?.rows, "group_nm"));
        equipmentMediumList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "group_id", "group_nm");
        });
        equipmentMediumList = cboGridSort(equipmentMediumList);
      });
    };
    getCboOpt();
  }, []);
  return [equipmentMediumOpt, equipmentMediumList];
};
let equipmentSmallList = [];
const useEquipmentSmall = () => {
  const [equipmentSmallOpt, setEquipmentSmallOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.equipmentSmall).then((res) => {
        setEquipmentSmallOpt(cboMUISort(res?.data?.data?.rows, "class_nm"));
        equipmentSmallList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "class_id", "class_nm");
        });
        equipmentSmallList = cboGridSort(equipmentSmallList);
      });
    };
    getCboOpt();
  }, []);
  return [equipmentSmallOpt, equipmentSmallList];
};
let downtimeTypeList = [];
const useDowntimeType = () => {
  const [downtimeTypeOpt, setDowntimeTypeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.downtimeType).then((res) => {
        setDowntimeTypeOpt(
          cboMUISort(res?.data?.data?.rows, "downtime_type_nm")
        );
        downtimeTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "downtime_type_id", "downtime_type_nm");
        });
        downtimeTypeList = cboGridSort(downtimeTypeList);
      });
    };
    getCboOpt();
  }, []);
  return [downtimeTypeOpt, downtimeTypeList];
};
let inspItemTypeList = [];
const useInspItemType = () => {
  const [inspItemTypeOpt, setInspItemTypeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.inspItemType).then((res) => {
        setInspItemTypeOpt(
          cboMUISort(res?.data?.data?.rows, "insp_item_type_nm")
        );
        inspItemTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "insp_item_type_id", "insp_item_type_nm");
        });
        inspItemTypeList = cboGridSort(inspItemTypeList);
      });
    };
    getCboOpt();
  }, []);
  return [inspItemTypeOpt, inspItemTypeList];
};
let inspMethodList = [];
const useInspMethod = () => {
  const [inspMethodOpt, setInspMethodOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.inspMethod).then((res) => {
        setInspMethodOpt(cboMUISort(res?.data?.data?.rows, "insp_method_nm"));
        inspMethodList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "insp_method_id", "insp_method_nm");
        });
        inspMethodList = cboGridSort(inspMethodList);
      });
    };
    getCboOpt();
  }, []);
  return [inspMethodOpt, inspMethodList];
};
let inspToolList = [];
const useInspTool = () => {
  const [inspToolOpt, setInspToolOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.inspTool).then((res) => {
        setInspToolOpt(cboMUISort(res?.data?.data?.rows, "insp_tool_nm"));
        inspToolList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "insp_tool_id", "insp_tool_nm");
        });
        inspToolList = cboGridSort(inspToolList);
      });
    };
    getCboOpt();
  }, []);
  return [inspToolOpt, inspToolList];
};
let inspFilingList = [];
const useInspFiling = () => {
  const [inspFilingOpt, setInspFilingOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.inspFiling).then((res) => {
        setInspFilingOpt(cboMUISort(res?.data?.data?.rows, "insp_filing_nm"));
        inspFilingList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "insp_filing_id", "insp_filing_nm");
        });
        inspFilingList = cboGridSort(inspFilingList);
      });
    };
    getCboOpt();
  }, []);
  return [inspFilingOpt, inspFilingList];
};
let partnerTypeList = [];
const usePartnerTypeList = () => {
  const [partnerTypeOpt, setPartnerTypeOpt] = useState([]);

  useEffect(() => {
    const getCboOpt = () => {
      restAPI.get(restURI.partnerType).then((res) => {
        setPartnerTypeOpt(cboMUISort(res?.data?.data?.rows, "partner_type_nm"));
        partnerTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "partner_type_id", "partner_type_nm");
        });
        partnerTypeList = cboGridSort(partnerTypeList);
      });
    };
    getCboOpt();
  }, []);
  return [partnerTypeOpt, partnerTypeList];
};

export {
  useLine,
  useProcess,
  useEquipment,
  useDept,
  useGrade,
  useEmployee,
  useWorkerGroup,
  useProductGbn,
  useProductModel,
  useProductType,
  useProductTypeSmall,
  useUnit,
  useInfcItemType,
  useInfcItem,
  useStore,
  useEquipmentLarge,
  useEquipmentMedium,
  useEquipmentSmall,
  useDowntimeType,
  useInspItemType,
  useInspMethod,
  useInspTool,
  useInspFiling,
  usePartnerTypeList,
};
