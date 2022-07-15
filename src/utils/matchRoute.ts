import { RouteObject } from "react-router-dom";
import { tabObject } from "../store/module/tabs";

export const matchRoute = (routes: RouteObject[], route: string): tabObject => {
  //   route只能是 /dashboard 或者 /systemSetting/userManage
  const routeArr = route.split("/");
  let title: string = "";
  if (routeArr.length === 2) {
    // 只能是一级路由 一定是 / 作为一级路由 dashboard作为二级路由
    const childRoute = routes.find((route) => route.path === "/")!;
    const element = childRoute.children?.find(
      (route) => route.path === routeArr[1]
    );
    title = element!.meta.title;
  } else {
    //    二级路由  /systemSetting/userManage
    const childRoute = routes.find((route) => route.path === "/" + routeArr[1]);
    const element = childRoute?.children?.find(
      (route) => route.path === routeArr[2]
    );
    title = element!.meta.title;
  }
  return {
    key: route,
    title
  };
};
