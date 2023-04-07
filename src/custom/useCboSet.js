import { useState, useEffect } from "react";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GetCboParams from "api/GetCboParams";

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
          return GetCboParams(data, "equip_ip", "equip_nm");
        });
        equipmentList = cboGridSort(equipmentList);
      });
    };
    getCboOpt();
  }, []);
  return [equipmentOpt, equipmentList];
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
        console.log(res?.data?.data?.rows);
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
let interfaceItemTypeList = [];
const useInterfaceItemType = () => {
  const [interfaceItemTypeOpt, setInterfaceItemTypeOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.interfaceItemType).then((res) => {
        setInterfaceItemTypeOpt(
          cboMUISort(res?.data?.data?.rows, "infc_item_type_nm")
        );
        interfaceItemTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "infc_item_type_id", "infc_item_type_nm");
        });
        interfaceItemTypeList = cboGridSort(interfaceItemTypeList);
      });
    };
    getCboOpt();
  }, []);
  return [interfaceItemTypeOpt, interfaceItemTypeList];
};
let interfaceItemList = [];
const useInterfaceItem = () => {
  const [interfaceItemOpt, setInterfaceItemOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.interfaceItem).then((res) => {
        setInterfaceItemOpt(cboMUISort(res?.data?.data?.rows, "infc_item_nm"));
        interfaceItemList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "infc_item_id", "infc_item_nm");
        });
        interfaceItemList = cboGridSort(interfaceItemList);
      });
    };
    getCboOpt();
  }, []);
  return [interfaceItemOpt, interfaceItemList];
};

export {
  useLine,
  useProcess,
  useEquipment,
  useProductGbn,
  useProductModel,
  useProductType,
  useProductTypeSmall,
  useUnit,
  useInterfaceItemType,
  useInterfaceItem,
};
