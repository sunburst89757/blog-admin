import { Col, Form, Input, Row } from "antd";
import { TableLayout } from "../../../components/TableLayout";

export default function userManage() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <TableLayout>
        <Form
          name="basic"
          // labelCol={{ span: 2 }}
          // wrapperCol={{ span: 16 }}
          labelAlign="left"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={8}>
              <Form.Item label="用户名" name="nickName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="邮箱">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="用户名" name="nickName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="邮箱">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </TableLayout>
    </div>
  );
}
