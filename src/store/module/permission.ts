import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteObject } from "react-router-dom";
import { myRouter } from "../../router/config";
const isIncludeRoute = (
  route: RouteObject[],
  routes: RouteObject[]
): boolean => {
  if (
    routes[routes.length - 2].meta.title === route[route.length - 1].meta.title
  ) {
    return true;
  }
  return false;
};
type IPermissonType = {
  routes: RouteObject[];
  endPermission: string[];
};
const initialState: IPermissonType = {
  routes: myRouter,
  endPermission: [""]
};
const permissonSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    addRoutes: (state, action: PayloadAction<RouteObject[]>) => {
      if (!isIncludeRoute(action.payload, state.routes)) {
        state.routes = [...state.routes, ...action.payload];
        // 将github固定在最后
        const index = state.routes.findIndex(
          (item) => item.meta.title === "Github"
        );
        const GithubLink = state.routes[index];
        state.routes.splice(index, 1);
        state.routes.push(GithubLink);
      }
    },
    updateEndPermission: (state, action: PayloadAction<string[]>) => {
      state.endPermission = action.payload;
    },
    resetInitialState: () => initialState
  }
});
export const { addRoutes, updateEndPermission, resetInitialState } =
  permissonSlice.actions;
export const permissionReducer = permissonSlice.reducer;
