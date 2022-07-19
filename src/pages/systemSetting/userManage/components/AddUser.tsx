import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { useCallback, useEffect } from "react";
import {
  addUser,
  IUserList,
  updateUser
} from "../../../../api/systemSetting/userManage";
export interface IAddUserType {
  avatar?: string;
  email: string;
  nickname: string;
  password: string;
  phone: string;
  remark?: string;
  sex: number;
  username: string;
  id?: number;
}
export function AddUser({
  type,
  visible,
  handleOk,
  handleCancel,
  userInfo
}: {
  type: string;
  visible: boolean;
  userInfo?: IUserList;
  handleOk: () => any;
  handleCancel: () => any;
}) {
  const [form] = Form.useForm<IUserList>();
  const onFinish = useCallback(() => {
    if (type === "add") {
      addUser(form.getFieldsValue()).then((res) => {
        if (res.success) {
          handleOk();
        }
      });
    } else {
      updateUser({ ...form.getFieldsValue(), id: userInfo?.id! }).then(
        (res) => {
          if (res.success) {
            handleOk();
          }
        }
      );
    }
  }, [form, handleOk, type]);
  useEffect(() => {
    form.setFieldsValue({ ...userInfo });
  });
  return (
    <>
      <Modal
        title={type === "add" ? "新增用户" : "修改用户信息"}
        visible={visible}
        width={1000}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          labelAlign="right"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
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
                rules={[{ type: "email", required: true }]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="昵称" name="nickname">
                <Input allowClear placeholder="请输入昵称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="密码" name="password">
                <Input allowClear placeholder="请输入密码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="性别" name="sex">
                <Input allowClear placeholder="请输入性别" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="头像" name="avatar">
                <Input allowClear placeholder="请输入头像url" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4} offset={20}>
              <Space>
                <Button onClick={handleCancel}>取消</Button>
                <Button htmlType="submit" type="primary">
                  确定
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
