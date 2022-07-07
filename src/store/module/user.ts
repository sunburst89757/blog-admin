import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Res } from "../../api/user";
import { roleInfo, stateType } from "../types";
import { cache } from "../../utils/localStorage";
const initialState: stateType = {
  userInfo: {
    userId: 0,
    username: "",
    role: ""
  },
  roleInfo: {
    roleId: 0,
    name: "",
    nickname: "",
    status: 0
  },
  token: "",
  isShowReloginModal: false,
  datedNum: 0,
  loading: false
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Res>) => {
      const { token, userId, nickName } = action.payload;
      state.token = token;
      state.userInfo.userId = userId;
      // 用户角色本来应该从action.payload里传递，新项目需要接口更改
      state.userInfo.role = "super-admin";
      state.userInfo.username = nickName;
      cache.setItem("token", token);
    },
    updateRoleInfo: (state, action: PayloadAction<roleInfo>) => {
      const { name, nickname, status } = action.payload;
      // 后台这里使用的名字叫id
      const roleId = (action.payload as any).id as number;
      state.roleInfo.name = name;
      state.roleInfo.nickname = nickname;
      state.roleInfo.roleId = roleId;
      state.roleInfo.status = status;
    },
    changeisShowReloginModal: (state) => {
      state.isShowReloginModal = !state.isShowReloginModal;
    },
    incrementDatedNum: (state) => {
      state.datedNum = state.datedNum + 1;
    },
    resetDatedNum: (state) => {
      state.datedNum = 0;
    },
    resetInitialState: (state) => {
      const { userInfo, datedNum, isShowReloginModal, token } = initialState;
      state.userInfo = userInfo;
      state.datedNum = datedNum;
      state.isShowReloginModal = isShowReloginModal;
      state.token = token;
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    }
  }
});
// 导出selector
export const selectUser = (state: RootState) => state.user.userInfo;
// 导出actions
export const {
  updateUserInfo,
  changeisShowReloginModal,
  incrementDatedNum,
  resetDatedNum,
  resetInitialState,
  setLoading,
  updateRoleInfo
} = userSlice.actions;
// 导出reducer
export const userReducer = userSlice.reducer;
