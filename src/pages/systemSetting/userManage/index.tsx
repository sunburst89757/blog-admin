import { PlusOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Space,
  Table,
  Tag
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  deleteUser,
  getUserList,
  IUserList
} from "../../../api/systemSetting/userManage";
import { IPageType } from "../../../api/types";
import { TableLayout } from "../../../components/TableLayout";
import { UserModal } from "./components/AddUser";
import style from "./test.module.scss";
type IQueryForm = {
  username?: string;
  phone?: string;
  email?: string;
  nickName?: string;
};
type ITotal = {
  total: number;
  totalPage: number;
};
export interface IQueryParams extends IQueryForm {
  pageSize: number;
  pageNum: number;
}
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: IUserList[]) => {
    console.log(
      `选中行的key: ${selectedRowKeys}`,
      "选中行的值: ",
      selectedRows
    );
  }
};

export default function UserManage() {
  const [queryForm] = Form.useForm<IQueryForm>();
  const [pageInformation, setPageInformation] = useState<IPageType>({
    pageNum: 1,
    pageSize: 10
  });
  const [total, setTotal] = useState<ITotal>({
    total: 1,
    totalPage: 1
  });
  const [isAdd, setisAdd] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);

  const [userList, setUserList] = useState<IUserList[]>()!;
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
  // 查询参数
  const params = useRef<IQueryParams>({
    pageNum: 1,
    pageSize: 10
  });
  // 选中用户的信息
  const currentUserInfo = useRef<IUserList>();
  const getDataList = useCallback(() => {
    getUserList(params.current).then((res) => {
      setUserList(res.data.list);
      setPageInformation((state) => ({
        pageNum: res.data.pageNum,
        pageSize: res.data.pageSize
      }));
      setTotal(() => ({
        total: res.data.total,
        totalPage: res.data.totalPage
      }));
    });
  }, [setPageInformation, setUserList]);
  // 查询按钮
  const onFinish = (values: IQueryForm) => {
    params.current = {
      pageNum: pageInformation.pageNum,
      pageSize: pageInformation.pageSize,
      ...queryForm.getFieldsValue()
    };
    getDataList();
  };
  const onReset = useCallback(() => {
    queryForm.resetFields();
    params.current = {
      pageNum: pageInformation.pageNum,
      pageSize: pageInformation.pageSize,
      ...queryForm.getFieldsValue()
    };
    getDataList();
  }, [
    queryForm,
    pageInformation.pageNum,
    pageInformation.pageSize,
    getDataList
  ]);
  const onChange = useCallback(
    (pageNumber: number, pageSize: number) => {
      console.log(pageNumber, "页码", pageSize);
      params.current = {
        pageNum: pageNumber,
        pageSize: pageSize
      };
      getDataList();
    },
    [getDataList]
  );
  const handleDelete = useCallback(
    (userId: number) => {
      deleteUser(userId).then((res) => {
        getDataList();
      });
    },
    [getDataList]
  );
  const handleEdit = useCallback((userInfo: IUserList) => {
    setisUpdate(true);
    currentUserInfo.current = userInfo;
  }, []);
  // 首次渲染
  useEffect(() => {
    getDataList();
  }, []);

  return (
    <div>
      <TableLayout>
        <>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            labelAlign="right"
            onFinish={onFinish}
            autoComplete="off"
            form={queryForm}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="用户名" name="username">
                  <Input allowClear placeholder="请输入用户名" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="电话" name="phone">
                  <Input allowClear placeholder="请输入电话" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[{ type: "email" }]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="昵称" name="nickName">
                  <Input allowClear placeholder="请输入昵称" />
                </Form.Item>
              </Col>
              <Col span={8} offset={8}>
                <Form.Item wrapperCol={{ span: 16 }}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                    >
                      查询
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={onReset}
                      icon={<UndoOutlined />}
                    >
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Table
            rowKey={(record) => record.id}
            dataSource={userList}
            columns={columns.current}
            rowSelection={{ type: "checkbox", ...rowSelection }}
            pagination={false}
            size="middle"
            scroll={{ y: 300 }}
            bordered
            title={() => (
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
          />
          <div className={style.pagination}>
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={total.total}
              onChange={onChange}
              pageSize={pageInformation.pageSize}
              pageSizeOptions={[10, 20]}
              showSizeChanger={true}
              className={style.center}
              showTotal={(total) => `总计 ${total}`}
            />
          </div>
        </>
      </TableLayout>
      <UserModal
        type="add"
        visible={isAdd}
        handleOk={() => {
          setisAdd(false);
          getDataList();
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
          getDataList();
        }}
        handleCancel={() => {
          setisUpdate(false);
        }}
      ></UserModal>
    </div>
  );
}
