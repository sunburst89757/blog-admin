import { myRequest } from "../service";
import { roleInfo } from "../store/types";

export interface requestParams {
  username: string;
  password: string;
}
export interface Res {
  token: string;
  nickName: string;
  userId: number;
  username: string;
}
export function login(params: requestParams) {
  return myRequest<requestParams, Res>({
    url: "/login/login",
    params,
    method: "post"
  });
}
export function getUserRoleInfo(params: number) {
  return myRequest<number, roleInfo>({
    url: `/sys/user/getUserRoleInfo/${params}`,
    method: "get"
  });
}

export function logout() {
  return myRequest({
    url: "/login/logout",
    method: "post"
  });
}
