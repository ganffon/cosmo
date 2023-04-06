import { useState, useEffect } from "react";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GetCboParams from "api/GetCboParams";

let processList = [];
const useProcess = () => {
  const [processOpt, setProcessOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.process).then((res) => {
        setProcessOpt(res?.data?.data?.rows);
        processList = res?.data?.data?.rows.map((data) => {
          return GetCboParams("process", data);
        });
      });
    };
    getCboOpt();
  }, []);
  return [processOpt, processList];
};
let productGbnList = [];
const useProductGbn = () => {
  const [productGbnOpt, setProductGbnOpt] = useState([]);
  useEffect(() => {
    const getCboOpt = async () => {
      await restAPI.get(restURI.productGbn).then((res) => {
        setProductGbnOpt(res?.data?.data?.rows);
        productGbnList = res?.data?.data?.rows.map((data) => {
          return GetCboParams("productGbn", data);
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
          return GetCboParams("productModel", data);
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
          return GetCboParams("productType", data);
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
          return GetCboParams("productTypeSmall", data);
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
          return GetCboParams("unit", data);
        });
      });
    };
    getCboOpt();
  }, []);
  return [UnitOpt, unitList];
};

export {
  useProcess,
  useProductGbn,
  useProductModel,
  useProductType,
  useProductTypeSmall,
  useUnit,
};
