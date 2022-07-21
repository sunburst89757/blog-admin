import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IFormItemConfig } from "../../../base-ui/MyForm";
export interface IUserList {
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
}
export type IQueryForm = {
  name: string;
  nickName: string;
  email: string;
  phone: string;
};
export const formItemConfig: IFormItemConfig[] = [
  {
    type: "Input",
    label: "用户名",
    name: "username",
    config: {
      placeholder: "请输入用户名",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "昵称",
    name: "nickName",
    config: {
      placeholder: "请输入昵称",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "邮箱",
    name: "email",
    config: {
      placeholder: "请输入邮箱",
      allowClear: true
    }
  },
  {
    type: "Input",
    label: "电话",
    name: "phone",
    config: {
      placeholder: "请输入电话",
      allowClear: true
    }
  }
];
export const columns: ColumnsType<IUserList> = [
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
          //   onClick={() => {
          //     handleDelete(record.id);
          //   }}
        >
          删除
        </Button>
        <Button
          type="link"
          //   onClick={() => {
          //     setisUpdate(true);
          //     handleEdit(record);
          //   }}
        >
          修改
        </Button>
      </Space>
    )
  }
];
