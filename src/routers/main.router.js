import { Routes, Route, Navigate } from "react-router-dom";
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
import WorkingGroup from "pages/mes/standard/workingGroup/WorkingGroup";
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
import DayreportSubdivision from "pages/mes/production/dayreportSubdivision/DayreportSubdivision";
import ProductionOrder from "pages/mes/production/productionOrder/ProductionOrder";
import SparepartIncome from "pages/mes/equipment/sparepartsIncome/SparepartsIncome";
import SparepartsRelease from "pages/mes/equipment/sparepartsRelease/sparepartsRelease";

export default function MainRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<Dashboard />} />

        <Route path="factory" element={<Factory />} />
        <Route path="line" element={<Line />} />
        <Route path="user" element={<User />} />
        <Route path="employee" element={<Employee />} />
        <Route path="process" element={<Process />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="product-gbn" element={<ProductGbn />} />
        <Route path="product-model" element={<ProductModel />} />
        <Route path="product-type" element={<ProductType />} />
        <Route path="product" element={<Product />} />
        <Route path="product-type-small" element={<ProductTypeSmall />} />
        <Route path="partner-type" element={<PartnerType />} />
        <Route path="partner" element={<Partner />} />
        <Route path="department" element={<Department />} />
        <Route path="grade" element={<Grade />} />
        <Route path="store" element={<Store />} />
        <Route path="store-location" element={<StoreLocation />} />
        <Route path="working-group" element={<WorkingGroup />} />
        <Route path="downtime-type" element={<DowntimeType />} />
        <Route path="downtime" element={<Downtime />} />
        <Route path="filing" element={<InspectFiling />} />
        <Route path="method" element={<InspectMethod />} />
        <Route path="tool" element={<InspectTool />} />
        <Route path="inspection-item-type" element={<InspectType />} />
        <Route path="inspection-item" element={<InspectItem />} />
        <Route path="document" element={<Document />} />
        <Route path="control-plan" element={<ControlPlan />} />

        <Route path="interface-item-type" element={<InterfaceItemType />} />
        <Route path="interface-item" element={<InterfaceItem />} />
        <Route path="interface-memory" element={<InterfaceMemory />} />

        <Route path="equipment-classification" element={<EquipmentLarge />} />
        <Route path="equipment-group" element={<EquipmentMedium />} />
        <Route path="equipment-class" element={<EquipmentSmall />} />
        <Route path="equipment-detail" element={<EquipmentDetail />} />

        <Route path="store-view" element={<StoreView />} />
        <Route path="store-transfer-view" element={<StoreTransferView />} />
        <Route path="store-check" element={<StoreCheck />} />

        <Route
          path="production-dayreport-subdivision"
          element={<DayreportSubdivision />}
        />
        <Route path="production-order" element={<ProductionOrder />} />

        <Route path="spareparts-income" element={<SparepartIncome />} />
        <Route path="spareparts-outgo" element={<SparepartsRelease />} />

        <Route path="unit" element={<Unit />} />
        <Route path="menu-manage" element={<MenuManage />} />
        <Route path="menu-list" element={<MenuList />} />
        <Route path="setup" element={<Setup />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Layout>
  );
}
