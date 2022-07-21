import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useRef, useState } from "react";
import { deleteUser } from "../../../api/systemSetting/userManage";
import { BasePage, IMyRef } from "../../../base-ui/BasePage";
import { IFormItemConfig } from "../../../base-ui/MyForm";
import { UserModal } from "./components/UserModal";
import { formItemConfig, IQueryForm, IUserList } from "./config";
export default function UserManage() {
  const url = useRef<string>("/sys/user/listUser");
  const formItemsConfig = useRef<IFormItemConfig[]>(formItemConfig);
  // 列配置
  const columns = useRef<ColumnsType<IUserList>>([
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
      align: "center"
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      align: "center"
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      align: "center"
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, { status }) => (
        <>
          {status ? (
            <Tag color="error">离线</Tag>
          ) : (
            <Tag color="success">在线</Tag>
          )}
        </>
      )
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center"
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button
            danger
            type="text"
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </Button>
          <Button
            type="link"
            onClick={() => {
              setisUpdate(true);
              handleEdit(record);
            }}
          >
            修改
          </Button>
        </Space>
      )
    }
  ]);
  const myRef = useRef<IMyRef>(null);
  const [isAdd, setisAdd] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  // 选中用户的信息
  const currentUserInfo = useRef<IUserList>();
  const handleDelete = useCallback((userId: number) => {
    deleteUser(userId).then((res) => {
      if (myRef.current) {
        myRef.current.getDataList();
      }
    });
  }, []);
  const handleEdit = useCallback((userInfo: IUserList) => {
    setisUpdate(true);
    currentUserInfo.current = userInfo;
  }, []);
  // 首次渲染
  return (
    <div>
      <BasePage<IQueryForm, IUserList>
        url={url.current}
        formItems={formItemsConfig.current}
        columns={columns.current}
        headerBtns={() => (
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setisAdd(true);
              }}
            >
              添加用户
            </Button>
          </Space>
        )}
        myRef={myRef}
      ></BasePage>
      <UserModal
        type="add"
        visible={isAdd}
        handleOk={() => {
          setisAdd(false);
          if (myRef.current) {
            myRef.current.getDataList();
          }
        }}
        handleCancel={() => {
          setisAdd(false);
        }}
      ></UserModal>
      <UserModal
        type="update"
        visible={isUpdate}
        userInfo={currentUserInfo.current}
        handleOk={() => {
          setisUpdate(false);
          if (myRef.current) {
            myRef.current.getDataList();
          }
        }}
        handleCancel={() => {
          setisUpdate(false);
        }}
      ></UserModal>
    </div>
  );
}
