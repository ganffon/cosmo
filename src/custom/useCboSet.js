import { useState, useEffect } from "react";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GetCboParams from "api/GetCboParams";

let lineList = [];
const useLine = () => {
  const [lineOpt, setLineOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.line).then((res) => {
        setLineOpt(res?.data?.data?.rows);
        lineList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "line_id", "line_nm");
        });
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
        setProcessOpt(res?.data?.data?.rows);
        processList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "proc_id", "proc_nm");
        });
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
        setEquipmentOpt(res?.data?.data?.rows);
        equipmentList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "equip_ip", "equip_nm");
        });
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
        setProductGbnOpt(res?.data?.data?.rows);
        productGbnList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "prod_gbn_id", "prod_gbn_nm");
        });
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
        setProductModelOpt(res?.data?.data?.rows);
        productModelList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "model_id", "model_nm");
        });
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
        setProductTypeOpt(res?.data?.data?.rows);
        productTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "prod_type_id", "prod_type_nm");
        });
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
        setProductTypeSmallOpt(res?.data?.data?.rows);
        productTypeSmallList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "prod_type_small_id", "prod_type_small_nm");
        });
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
        setUnitOpt(res?.data?.data?.rows);
        unitList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "unit_id", "unit_nm");
        });
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
        setInterfaceItemTypeOpt(res?.data?.data?.rows);
        interfaceItemTypeList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "infc_item_type_id", "infc_item_type_nm");
        });
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
        setInterfaceItemOpt(res?.data?.data?.rows);
        interfaceItemList = res?.data?.data?.rows.map((data) => {
          return GetCboParams(data, "infc_item_id", "infc_item_nm");
        });
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
