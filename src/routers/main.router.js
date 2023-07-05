import { Routes, Route, Navigate, Link } from "react-router-dom";
// ⬇️ reference of page
import Layout from "components/layout/common/Layout";
import Factory from "pages/mes/standard/factory/Factory";
import Line from "pages/mes/standard/line/Line";
import User from "pages/mes/standard/user/User";
import Employee from "pages/mes/standard/employee/Employee";
import Process from "pages/mes/standard/process/Process";
import Equipment from "pages/mes/standard/equipment/Equipment";
import ProductGbn from "pages/mes/standard/productGbn/ProductGbn";
import ProductModel from "pages/mes/standard/productModel/ProductModel";
import ProductType from "pages/mes/standard/productType/ProductType";
import Product from "pages/mes/standard/product/Product";
import ProductTypeSmall from "pages/mes/standard/productTypeSmall/ProductTypeSmall";
import Unit from "pages/mes/standard/unit/Unit";
import PartnerType from "pages/mes/standard/partnerType/PartnerType";
import Partner from "pages/mes/standard/partner/Partner";
import Dashboard from "pages/mes/dashboard/Dashboard";
import Document from "pages/mes/standard/document/Document";
import MenuManage from "pages/admin/menuManage/MenuManage";
import MenuList from "pages/admin/menuList/MenuList";
import Grade from "pages/mes/standard/grade/Grade";
import Store from "pages/mes/standard/store/Store";
import Department from "pages/mes/standard/department/Department";
import WorkerGroup from "pages/mes/standard/workerGroup/WorkerGroup";
import StoreLocation from "pages/mes/standard/storeLocation/StoreLocation";
import DowntimeType from "pages/mes/standard/downtimeType/DowntimeType";
import Downtime from "pages/mes/standard/downtime/Downtime";
import InspectFiling from "pages/mes/standard/inspectFiling/InspectFiling";
import InspectMethod from "pages/mes/standard/inspectMethod/InspectMethod";
import InspectTool from "pages/mes/standard/inspectTool/InspectTool";
import InspectType from "pages/mes/standard/inspectType/InspectType";
import InspectItem from "pages/mes/standard/inspectItem/InspectItem";
import InterfaceItemType from "pages/mes/standard/interfaceItemType/InterfaceItemType";
import InterfaceItem from "pages/mes/standard/interfaceItem/InterfaceItem";
import InterfaceMemory from "pages/mes/standard/interfaceMemory/InterfaceMemory";
import EquipmentLarge from "pages/mes/equipment/equipmentLarge/EquipmentLarge";
import EquipmentMedium from "pages/mes/equipment/equipmentMedium/EquipmentMedium";
import EquipmentSmall from "pages/mes/equipment/equipmentSmall/EquipmentSmall";
import EquipmentDetail from "pages/mes/equipment/equipmentDetail/EquipmentDetail";
import ControlPlan from "pages/mes/standard/controlPlan/ControlPlan";
import Setup from "pages/mes/standard/setup/Setup";
import StoreView from "pages/mes/store/storeView/StoreView";
import StoreTransferView from "pages/mes/store/storeTransferView/StoreTransferView";
import StoreCheck from "pages/mes/store/storeCheck/StoreCheck";
import Subdivision from "pages/mes/production/subdivision/Subdivision";
import ProductionOrder from "pages/mes/production/productionOrder/ProductionOrder";
import SparepartIncome from "pages/mes/equipment/sparepartsIncome/SparepartsIncome";
import SparepartsRelease from "pages/mes/equipment/sparepartsRelease/sparepartsRelease";
import SparepartsStoreView from "pages/mes/equipment/sparepartsStoreView/sparepartsStoreView";
import SparepartsStoreTransView from "pages/mes/equipment/sparepartsStoreTransView/sparepartsStoreTransView";
import LineDepartment from "pages/mes/standard/lineDepartment/lineDepartment";
import ProductClass from "pages/mes/standard/productClass/productClass";
import Weight from "pages/mes/production/weight/Weight";
import ProductionDownTime from "pages/mes/equipment/productionDownTime/productionDownTime";
import ProductionLotTracking from "pages/mes/production/productionLotTracking/productionLotTracking";
import UserHistory from "pages/mes/standard/userHistory/userHistory";

import SubdivisionPanel from "pages/mes/panel/subdivision/SubdivisionPanel";
import InspResultUpload from "pages/mes/insp/inspResultInfo/inspResultUpload/InspResultUpload";
import WeightPanel from "pages/mes/panel/weight/WeightPanel";
import Packing from "pages/mes/production/packing/Packing";
import PackingPanel from "pages/mes/panel/packing/PackingPanel";
import WeightReport from "pages/mes/production/weightReport/WeightReport";
import EquipmentResult from "pages/mes/standard/equipmentResult/EquipmentResult";

import ProductionPackingView from "pages/mes/production/productionPackingView/productionPackingView";
import EquipmentRawDataView from "pages/mes/equipment/equipmentRawDataView/equipmentRawDataView";

import MonthlyLineCapa from "pages/mes/managementInfo/monthlyLineCapa/MonthlyLineCapa";
import DailyLineCapa from "pages/mes/managementInfo/dailyLineCapa/DailyLineCapa";
import MonthlyPartCapa from "pages/mes/managementInfo/monthlyPartCapa/MonthlyPartCapa";
import PerformanceRate from "pages/mes/managementInfo/performanceRate/PerformancRate";
import TimeRate from "pages/mes/managementInfo/timeRate/TimeRate";
import DownTimePanel from "pages/mes/panel/downTime/DownTimePanel";
import ManagementAll from "pages/mes/managementInfo/managementAll/managementAll";
import EquipStatus from "pages/mes/managementInfo/EquipStatus/EquipStatus";
import TempView from "pages/mes/managementInfo/TempView/TempView";
import TempRaws from "pages/mes/production/tempRaws/TempRaws";
import CountRaws from "pages/mes/production/countRaws/CountRaws";
import MonthlyTempHumidChart from "pages/mes/managementInfo/monthlyTempHumidChart/MonthlyTempHumidChart";

import DowntimeReport from "pages/mes/production/downtimeReport/DowntimeReport";
import SubdivisionReport from "pages/mes/production/subdivisionReport/SubdivisionReport";

import WorkerGroupStatus from "pages/mes/panel/workerGroupStatus/WorkerGroupStatus";
import InspectionResult from "pages/mes/quality/inspectionResult/inspectionResult";
import LineYield from "pages/mes/production/lineYield/LineYield";

export default function MainRouter() {
  const pages = [
    { path: "", component: Dashboard },
    { path: "factory", component: Factory },
    { path: "line", component: Line },
    { path: "user", component: User },
    { path: "employee", component: Employee },
    { path: "process", component: Process },
    { path: "equipment", component: Equipment },
    { path: "product-gbn", component: ProductGbn },
    { path: "product-model", component: ProductModel },
    { path: "product-type", component: ProductType },
    { path: "product", component: Product },
    { path: "product-type-small", component: ProductTypeSmall },
    { path: "partner-type", component: PartnerType },
    { path: "partner", component: Partner },
    { path: "department", component: Department },
    { path: "grade", component: Grade },
    { path: "store", component: Store },
    { path: "store-location", component: StoreLocation },
    { path: "worker-group", component: WorkerGroup },
    { path: "downtime-type", component: DowntimeType },
    { path: "downtime", component: Downtime },
    { path: "filing", component: InspectFiling },
    { path: "method", component: InspectMethod },
    { path: "tool", component: InspectTool },
    { path: "inspection-item-type", component: InspectType },
    { path: "inspection-item", component: InspectItem },
    { path: "document", component: Document },
    { path: "control-plan", component: ControlPlan },
    { path: "interface-item-type", component: InterfaceItemType },
    { path: "interface-item", component: InterfaceItem },
    { path: "interface-memory", component: InterfaceMemory },
    { path: "equipment-classification", component: EquipmentLarge },
    { path: "equipment-group", component: EquipmentMedium },
    { path: "equipment-class", component: EquipmentSmall },
    { path: "equipment-detail", component: EquipmentDetail },
    { path: "equipment-result", component: EquipmentResult },
    { path: "equipment", component: EquipmentMedium },
    { path: "equipment", component: EquipmentMedium },
    { path: "store-view", component: StoreView },
    { path: "store-transfer-view", component: StoreTransferView },
    { path: "store-check", component: StoreCheck },

    { path: "subdivision", component: Subdivision },
    { path: "production-order", component: ProductionOrder },
    { path: "packing", component: Packing },

    { path: "spareparts-income", component: SparepartIncome },
    { path: "spareparts-outgo", component: SparepartsRelease },
    { path: "spareparts-store-view", component: SparepartsStoreView },
    {
      path: "spareparts-store-transfer-view",
      component: SparepartsStoreTransView,
    },
    { path: "line-dept", component: LineDepartment },
    { path: "product-class", component: ProductClass },
    { path: "weight", component: Weight },
    { path: "production-downtime", component: ProductionDownTime },
    { path: "production-lot-tracking", component: ProductionLotTracking },
    { path: "userHistoryStatus", component: UserHistory },

    { path: "subdivision-panel", component: SubdivisionPanel },
    { path: "weight-panel", component: WeightPanel },
    { path: "packing-panel", component: PackingPanel },

    { path: "unit", component: Unit },
    { path: "menu-manage", component: MenuManage },
    { path: "menu-list", component: MenuList },
    { path: "setup", component: Setup },
    { path: "insp-result-upload", component: InspResultUpload },
    { path: "weight-report", component: WeightReport },
    { path: "equipment-rawdata-view", component: EquipmentRawDataView },

    { path: "production-packing-view", component: ProductionPackingView },

    { path: "monthly-line-capa", component: MonthlyLineCapa },
    { path: "daily-line-capa", component: DailyLineCapa },
    { path: "monthly-part-capa", component: MonthlyPartCapa },
    { path: "time-rate", component: TimeRate },
    { path: "performance-rate", component: PerformanceRate },
    { path: "downtime-panel", component: DownTimePanel },
    { path: "managementAll", component: ManagementAll },
    { path: "temp-view", component: TempView },
    { path: "equip-status", component: EquipStatus },
    { path: "downtime-report", component: DowntimeReport },
    { path: "temp-raws", component: TempRaws },
    { path: "count-raws", component: CountRaws },
    { path: "monthly-temp-humid-chart", component: MonthlyTempHumidChart },
    { path: "subdivision-report", component: SubdivisionReport },
    { path: "worker-group-status", component: WorkerGroupStatus },
    { path: "quality-result", component: InspectionResult },
    { path: "line-yield", component: LineYield },
  ];
  return (
    <Layout>
      <Routes>
        {pages.map((page, index) => (
          <Route key={index} path={page.path} element={<page.component />} />
        ))}

        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Layout>
  );
}
