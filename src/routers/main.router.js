import { Routes, Route, Navigate } from "react-router-dom";
import * as Pages from "pages";
import React, { Suspense } from "react";
import Layout from "components/layout/common/Layout";

export default function MainRouter() {
  const routes = Object.entries(Pages).map(([componentName, Component]) => {
    // camelCase 로 작성된 컴포넌트 이름을 가지고 dash-case로 변환하는 정규식을 거쳐 URL로 사용함
    // ex) DowntimeType => downtime-type
    const path = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    return {
      path: path === "dashboard" ? "" : path,
      component: Component,
    };
  });

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
