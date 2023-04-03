import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// ⬇️ reference of page
import Layout from "components/layout/common/Layout";
import Factory from "pages/mes/standard/factory/Factory";
import Line from "pages/mes/standard/line/Line";
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
import RealMenuList from "json/RealMenuList.json";
import Document from "pages/mes/standard/document/Document";
import MenuManage from "pages/admin/menuManage/MenuManage";
import MenuList from "pages/admin/menuList/MenuList";
import Store from "pages/mes/standard/store/Store";
import Department from "pages/mes/standard/department/Department";
import WorkingGroup from "pages/mes/standard/workingGroup/WorkingGroup";
import { Grade } from "@mui/icons-material";

export default function MainRouter() {
  const [realMenuList, setRealMenuList] = useState([]);
  useEffect(() => {
    setRealMenuList(RealMenuList);
  }, []);
  // const routeList = useMemo(() => {
  //   const result = realMenuList.map((menu) => {
  //     const result = { ...menu };
  //     // console.log(`menu.componentName: ${menu.componentName}`);
  //     const component = Pages[menu.componentName];
  //     // console.log(`component: ${component}`);
  //     if (component) {
  //       result.component = Pages[menu.componentName]();
  //       // console.log(result.component);
  //     }
  //     return result;
  //   });
  //   return result;
  // }, [realMenuList]);

  // if (realMenuList.length === 0) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        {/* {realMenuList.map((menu) => {
          return (
            menu.onlySearch && (
              <Route
                key={menu.id}
                path={menu.path}
                element={<OneGrid componentName={menu.componentName} />}
              />
            )
          );
        })} */}
        <Route path="factory" element={<Factory />} />
        <Route path="line" element={<Line />} />
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
        <Route path="working-group" element={<WorkingGroup />} />

        <Route path="document" element={<Document />} />
        <Route path="unit" element={<Unit />} />
        <Route path="menu-manage" element={<MenuManage />} />
        <Route path="menu-list" element={<MenuList />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Layout>
  );
}
