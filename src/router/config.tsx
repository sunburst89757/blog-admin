import { ReactNode, useEffect, useMemo } from "react";
import { RouteObject } from "react-router-dom";
import { getUserMenuList, getUserMenuPerms } from "../api/permission";
import { getUserInfo } from "../api/user";
import { LazyLoad } from "../components/LazyLoad";
import { Redirect } from "../components/Redirect";
import MyLayout from "../Layout";
import { Login } from "../pages/Login";
import { addRoutes, updateEndPermission } from "../store/module/permission";
import { updateUserInfo } from "../store/module/user";
import { IEndRoute, useAppDispatch, useAppSelector } from "../store/types";
import { cache } from "../utils/localStorage";

type interceptOBj = {
  children: ReactNode;
  title: string;
};
/* 
  配置说明 meta 下的hidden icon perms
  hidden 是否显示在菜单
  perm 权限路由
  */
//  菜单路由
const siderRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "布局"
    },
    children: [
      {
        path: "dashboard",
        element: <LazyLoad path="/Dashboard"></LazyLoad>,
        meta: {
          title: "首页"
        }
      }
    ]
  },
  // 外部链接跳转github，这里的配置没什么意义
  {
    path: "/abc",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "Github"
    }
  }
];
const myRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login></Login>,
    meta: {
      title: "登录",
      hidden: true
    }
  },
  {
    path: "/404",
    element: <LazyLoad path="/NotFound"></LazyLoad>,
    meta: {
      title: "404",
      hidden: true
    }
  },
  {
    path: "*",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "404",
      hidden: true
    }
  },
  ...siderRoutes
];
// 一级路由不需要鉴权
const isInterceptRoute = (route: RouteObject): boolean => {
  if (
    route.children ||
    route.meta.title === "登录" ||
    route.meta.title === "404"
  ) {
    return false;
  }
  return true;
};
// 后端的路由结构生成前端需要的配置路由结构类似myRoutes
export const generateRouterForBackEnd = (
  routes: IEndRoute[]
): RouteObject[] => {
  const myRoutes: RouteObject[] = [];
  routes.forEach((route) => {
    let routeObj: RouteObject = {
      path: "",
      element: <MyLayout></MyLayout>,
      meta: {
        title: "",
        icon: "",
        perms: ""
      }
    };
    routeObj.path = "/" + route.path;
    routeObj.meta.icon = route.icon;
    routeObj.meta.title = route.name;
    routeObj.meta.perms = route.perms;
    if (route.children && route.children.length > 0) {
      routeObj.children = [];
      route.children.forEach((childRoute) => {
        let routeObj1: RouteObject = {
          path: "",
          element: <MyLayout></MyLayout>,
          meta: {
            title: "",
            icon: "",
            perms: ""
          }
        };
        routeObj1.path = childRoute.path;
        routeObj1.meta.icon = childRoute.icon;
        routeObj1.meta.title = childRoute.name;
        routeObj1.meta.perms = childRoute.perms;
        routeObj1.element = (
          <LazyLoad path={routeObj.path + "/" + routeObj1.path}></LazyLoad>
        );
        routeObj.children!.push(routeObj1);
      });
    }
    myRoutes.push(routeObj!);
  });
  return myRoutes;
};
// 根据路由配置生成react router dom需要的路由结构
export const generateRouterForReactRouter = (routes: RouteObject[]) => {
  return routes.map((route) => {
    if (route.children) {
      route.children = generateRouterForReactRouter(route.children);
    }
    // 路由拦截器 登录和授权页面不需要鉴权
    if (isInterceptRoute(route)) {
      route.element = (
        <RouterBeforeEach title={route.meta.title}>
          {route.element}
        </RouterBeforeEach>
      );
    }
    return route;
  });
};
// 路由拦截器组件
const RouterBeforeEach = ({ children, title }: interceptOBj) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  // 验证是否登录（刷新）
  const authLogin = useMemo(() => {
    const token = cache.getItem("token");
    if (!token) {
      return false;
    } else {
      // 获取用户的角色 菜单路由 权限信息
      if (!userInfo.username) {
        // 说明没有获取用户的角色，第一次登录需要获取用户信息 获取菜单和权限 | 或者说是刷新导致的
        getUserInfo().then((res) => {
          dispatch(updateUserInfo(res.data));
        });
        getUserMenuList().then((res) => {
          // 后端生成需要的路由结构
          const accessibleRoutes = generateRouterForBackEnd(res.data);
          // 生成react router需要的路由结构
          const routes = generateRouterForReactRouter(accessibleRoutes);
          dispatch(addRoutes(routes));
        });
        getUserMenuPerms().then((res) => {
          dispatch(updateEndPermission(res.data));
        });
      }
      return true;
    }
  }, [dispatch, userInfo.username]);
  useEffect(() => {
    document.title = title;
  });
  return <div>{authLogin ? children : <Redirect to="/login"></Redirect>}</div>;
};

export const myRouter = generateRouterForReactRouter(myRoutes);
export const generateAccessRoutes1 = (routes: IEndRoute[]): string[] => {
  const res: string[] = [];
  routes.forEach((route) => {
    let path: string = "/";
    path += route.path;
    if (route.children && route.children.length > 0) {
      route.children.forEach((routeChild) => {
        let nestRoute: string = path;
        nestRoute += "/" + routeChild.path;
        res.push(nestRoute);
      });
    } else {
      res.push(path);
    }
  });
  return res;
};
