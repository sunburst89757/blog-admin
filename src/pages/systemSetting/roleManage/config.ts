import { IFormItemConfig } from "../../../base-ui/MyForm";

export const formItemConfig: IFormItemConfig[] = [
  {
    type: "Input",
    label: "用户名",
    name: "name",
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
  }
];
