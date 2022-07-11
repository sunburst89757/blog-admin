import React from "react";
import { useRoutes } from "react-router-dom";
import { useAppSelector } from "../store/types";
// 全局加载组件的loading不应该导致内部子组件的重新渲染
export const MyRoutes = React.memo(() => {
  const myRouter = useAppSelector((state) => state.permission.routes);
  const routes = useRoutes(myRouter);
  return <div style={{ height: "100vh" }}>{routes}</div>;
});
