import { ColumnsType } from "antd/lib/table";
import { useRef, useState } from "react";
import { BasePage, IMyRef } from "../../../base-ui/BasePage";
import { IFormItemConfig } from "../../../base-ui/MyForm";
import { UserModal } from "./components/UserModal";
import {
  columns as columnsConfig,
  formItemConfig,
  IQueryForm,
  IUserList
} from "./config";
export default function UserManage() {
  const url = useRef<string>("/sys/user/listUser");
  const formItemsConfig = useRef<IFormItemConfig[]>(formItemConfig);
  const columns = useRef<ColumnsType<IUserList>>(columnsConfig);
  const myRef = useRef<IMyRef>(null);
  const [isAdd, setisAdd] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  // 选中用户的信息
  const currentUserInfo = useRef<IUserList>();

  // const onChange = useCallback(
  //   (pageNumber: number, pageSize: number) => {
  //     console.log(pageNumber, "页码", pageSize);
  //     params.current = {
  //       pageNum: pageNumber,
  //       pageSize: pageSize
  //     };
  //     getDataList();
  //   },
  //   [getDataList]
  // );
  // const handleDelete = useCallback(
  //   (userId: number) => {
  //     deleteUser(userId).then((res) => {
  //       getDataList();
  //     });
  //   },
  //   [getDataList]
  // );
  // const handleEdit = useCallback((userInfo: IUserList) => {
  //   setisUpdate(true);
  //   currentUserInfo.current = userInfo;
  // }, []);
  // 首次渲染
  return (
    <div>
      <BasePage<IQueryForm, IUserList>
        url={url.current}
        formItems={formItemsConfig.current}
        columns={columns.current}
        myRef={myRef}
      ></BasePage>
      <UserModal
        type="add"
        visible={isAdd}
        handleOk={() => {
          setisAdd(false);
          // getDataList();
        }}
        handleCancel={() => {
          // setisAdd(false);
        }}
      ></UserModal>
      <UserModal
        type="update"
        visible={isUpdate}
        userInfo={currentUserInfo.current}
        handleOk={() => {
          setisUpdate(false);
          // getDataList();
        }}
        handleCancel={() => {
          setisUpdate(false);
        }}
      ></UserModal>
    </div>
  );
}
