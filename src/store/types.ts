import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
// 对dispatch 和 useSelector作类型扩展
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface userInfo {
  /* 用户信息 */
  userId: number;
  username: string;
  role: string;
}

export interface roleInfo {
  /* 角色信息 */
  roleId: number;
  name: string;
  nickname: string;
  status: number;
}
export interface stateType {
  userInfo: userInfo;
  roleInfo: roleInfo;
  token: string;
  isShowReloginModal: boolean;
  datedNum: number;
  loading: boolean;
}
export interface IEndRoute {
  id: number;
  name: string;
  parentId: number;
  icon: string;
  path: string;
  children?: IEndRoute[];
}
