import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteObject } from "react-router-dom";
import { myRouter } from "../../router/config";
const isIncludeRoute = (
  route: RouteObject[],
  routes: RouteObject[]
): boolean => {
  if (
    routes[routes.length - 1].meta.title === route[route.length - 1].meta.title
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
