import React, { useContext } from "react";
import { LayoutContext } from "components/layout/common/Layout";

const Dashboard = () => {
  const { isAllScreen } = useContext(LayoutContext);

  return <div>{`여기는 Dashboard 영역입니다.`}</div>;
};

export default Dashboard;
