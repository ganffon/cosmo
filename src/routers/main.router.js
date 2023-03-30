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
// import OnlySearchSingleGrid from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import OneGrid from "pages/mes/standard/oneGrid";
import Dashboard from "pages/mes/dashboard/Dashboard";
// import * as Pages from "pages";
import RealMenuList from "components/layout/datas/RealMenuList.json";
// import NotFound from "pages/notfound/NotFound";
import Document from "pages/mes/standard/document/Document";
import MenuManage from "pages/admin/menuManage/MenuManage";
import MenuList from "pages/admin/menuList/MenuList";

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
        <Route path="factory" element={<Factory menuID={"factory"} />} />
        <Route path="line" element={<Line menuID={"line"} />} />
        <Route path="process" element={<Process menuID={"process"} />} />
        <Route path="equipment" element={<Equipment menuID={"equipment"} />} />
        <Route
          path="product-gbn"
          element={<ProductGbn menuID={"product-gbn"} />}
        />
        <Route
          path="product-model"
          element={<ProductModel menuID={"product-model"} />}
        />
        <Route
          path="product-type"
          element={<ProductType menuID={"product-type"} />}
        />
        <Route path="product" element={<Product menuID={"product"} />} />
        <Route
          path="product-type-small"
          element={<ProductTypeSmall menuID={"product-type-small"} />}
        />

        <Route path="document" element={<Document menuID={"document"} />} />
        <Route
          path="menu-manage"
          element={<MenuManage menuID={"menu-manage"} />}
        />
        <Route path="menu-list" element={<MenuList menuID={"menu-list"} />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Layout>
  );
}
