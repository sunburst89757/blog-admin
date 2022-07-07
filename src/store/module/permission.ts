import { createSlice } from "@reduxjs/toolkit";
import { IEndRoute } from "../types";

const initialState: IEndRoute[] = [
  {
    name: "test",
    id: 0,
    parentId: 0,
    icon: "",
    path: ""
  }
];
const permissonSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {}
});
export const permissionReducer = permissonSlice.reducer;
