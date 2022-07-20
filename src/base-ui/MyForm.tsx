import {
  Cascader,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  TimePicker,
  Input,
  Space,
  Button
} from "antd";
import { Rule } from "antd/lib/form";
import { useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import style from "./MyForm.module.scss";
type IGridType = {
  span: number;
};
// Select组件的类型必须IOptionType;
export interface IOptionType {
  content: string;
  value: string;
}
export type IFormConfig = {
  labelAlign: "right" | "left";
  labelCol: IGridType;
  autoComplete: "off" | "on";
};
export type IFormItemLayout = {
  rowGutter?: number;
  colSpan?: number;
};
export interface IFormItemConfig<T = any> {
  type:
    | "Input"
    | "DatePicker"
    | "Select"
    | "Cascader"
    | "TimePicker"
    | "RangePicker" // RangePicker 是DatePicker的子选项
    | "btns"; // 查询重置按钮 ，并不要传递btns
  label?: string;
  name?: string;
  rules?: Rule[];
  // 对应表单组件的具体配置
  config: any;
  // 有些子组件需要嵌套的子组件 Select组件需要子组件Option,暂时只针对Select Options
  options?: T[];
}
const initialFormConfig: IFormConfig = {
  labelAlign: "right",
  labelCol: { span: 4 },
  autoComplete: "off"
};
const initialIFormItemLayout: IFormItemLayout = {
  rowGutter: 16,
  colSpan: 8
};
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function MyForm<T>({
  formConfig = initialFormConfig,
  formLayout = initialIFormItemLayout,
  formItems
}: {
  formConfig?: IFormConfig;
  formLayout?: IFormItemLayout;
  formItems: IFormItemConfig[];
}) {
  const [form] = Form.useForm<T>();
  const onFinish = useCallback(() => {
    console.log(form.getFieldsValue(), "表单子组件");
  }, [form]);
  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);
  const formItemArr = useMemo(() => {
    const res: IFormItemConfig[][] = [];
    const itmesNumber = formItems.length;
    // 每行可以放几个Input类似组件
    const itemEachRow = Math.floor(24 / formLayout.colSpan!);
    const rows = Math.ceil(itmesNumber / itemEachRow);
    // 计算表单的位置
    for (let i = 0; i < rows; i++) {
      const arr: IFormItemConfig[] = [];
      for (let j = 0; j < itemEachRow; j++) {
        arr.push(formItems[j]);
      }
      // 滤除不足一行的个数中的空
      res.push(arr.filter((item) => item));
    }
    // 计算最后查找重置按钮的位置
    const lastArr = res[res.length - 1];
    if (lastArr.length < itemEachRow) {
      lastArr.push({ type: "btns", config: "" });
    } else {
      let tempArr: IFormItemConfig[] = [];
      tempArr.push({
        type: "btns",
        config: {
          offset: (itemEachRow - 1) * formLayout.colSpan!
        }
      });
      res.push(tempArr);
    }
    console.log(res, "结果");

    return res;
  }, [formItems, formLayout.colSpan]);
  const component = useCallback(
    (formItemConfig: IFormItemConfig) => {
      switch (formItemConfig.type) {
        case "Input":
          return <Input {...formItemConfig.config}></Input>;
        case "TimePicker":
          return <TimePicker {...formItemConfig.config}></TimePicker>;
        case "DatePicker":
          return <DatePicker {...formItemConfig.config}></DatePicker>;
        case "RangePicker":
          return <RangePicker {...formItemConfig.config}></RangePicker>;
        case "Cascader":
          return <Cascader {...formItemConfig.config}></Cascader>;
        case "Select":
          return (
            <Select {...formItemConfig.config}>
              {formItemConfig?.options?.map((item) => (
                <Option value={item.value}>{item.content}</Option>
              ))}
            </Select>
          );
        case "btns":
          return (
            <div className={formItemConfig.config.offset ? style.btns : ""}>
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
            </div>
          );
        default:
          throw new Error(`MyForm不支持${formItemConfig.type}组件`);
      }
    },
    [onReset]
  );
  return (
    <Form name="basic" {...formConfig} onFinish={onFinish} form={form}>
      {formItemArr.map((arr) => {
        return (
          <Row gutter={formLayout.rowGutter} key={nanoid()}>
            {arr.map((formItem) => {
              return (
                <Col
                  span={formLayout.colSpan}
                  key={nanoid()}
                  offset={formItem.config.offset}
                >
                  <Form.Item
                    name={formItem.name}
                    label={formItem.label}
                    rules={formItem.rules}
                  >
                    {component(formItem)}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Form>
  );
}
