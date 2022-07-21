import { myRequest } from "../service";
// U 是返回data的具体类型
type IQueryRes<T> = {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  total: number;
  list: T[];
};
// U是list的类型
export function getDataList<T, U>(url: string, params: T) {
  return myRequest<any, IQueryRes<U>>({
    url,
    method: "get",
    params
  });
}
