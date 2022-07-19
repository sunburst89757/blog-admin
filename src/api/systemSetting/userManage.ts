import { IQueryParams } from "../../pages/systemSetting/userManage";
import { IAddUserType } from "../../pages/systemSetting/userManage/components/AddUser";
import { myRequest } from "../../service";
import { ISortPagination } from "../types";
export type IUserList = {
  id: number;
  username: string;
  password: string;
  nickname: string;
  userType: number;
  email: string;
  phone: string;
  sex: number;
  avatar: string;
  status: number;
  remark?: any;
  createTime: string;
  updateTime: string;
  deleted: number;
};
export function getUserList(params: IQueryParams) {
  return myRequest<any, ISortPagination<IUserList>>({
    url: "/sys/user/listUser",
    method: "get",
    params
  });
}
export function deleteUser(params: number) {
  return myRequest<any, any>({
    url: `/sys/user/deleteOneUser/${params}`,
    method: "post",
    successMsg: "删除成功"
  });
}
export function addUser(data: IAddUserType) {
  return myRequest<any, any>({
    url: "/sys/user/addOneUser",
    method: "post",
    data,
    successMsg: "添加成功"
  });
}
