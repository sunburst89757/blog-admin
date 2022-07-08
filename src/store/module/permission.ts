import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEndRoute } from "../types";
type IPermissonType = {
  endRoutes: IEndRoute[];
  endPermission: string[];
};
const initialState: IPermissonType = {
  endRoutes: [
    {
      name: "",
      id: 0,
      parentId: 0,
      icon: "",
      path: "",
      perms: null
    }
  ],
  endPermission: [""]
};
const permissonSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    updateEndRoutes: (state, action: PayloadAction<IEndRoute[]>) => {
      state.endRoutes = action.payload;
    },
    updateEndPermission: (state, action: PayloadAction<string[]>) => {
      state.endPermission = action.payload;
    },
    resetInitialState: (state) => {
      state.endPermission = initialState.endPermission;
      state.endRoutes = initialState.endRoutes;
    }
  }
});
export const { updateEndRoutes, updateEndPermission, resetInitialState } =
  permissonSlice.actions;
export const permissionReducer = permissonSlice.reducer;
