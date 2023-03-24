import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// ⬇️ reference of page
import Layout from "components/layout/common/Layout";
import Line from "pages/mes/standard/oneGrid";
// import OnlySearchSingleGrid from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import OneGrid from "pages/mes/standard/oneGrid";
import Dashboard from "pages/mes/dashboard/Dashboard";
// import * as Pages from "pages";
import RealMenuList from "components/layout/datas/RealMenuList.json";
// import NotFound from "pages/notfound/NotFound";
import Document from "pages/mes/standard/Document";
import MenuManage from "pages/admin/menu/MenuManage";
import MenuList from "pages/admin/menu/MenuList";

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
        {realMenuList.map((menu) => {
          return (
            menu.onlySearch && (
              <Route
                key={menu.id}
                path={menu.path}
                element={<OneGrid componentName={menu.componentName} />}
              />
            )
          );
        })}
        {/* <Route path="lines" element={<Line />} /> */}
        <Route path="document" element={<Document />} />
        <Route path="menu-manage" element={<MenuManage />} />
        <Route path="menu-list" element={<MenuList />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Layout>
  );
}
