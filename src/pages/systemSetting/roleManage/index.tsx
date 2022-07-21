import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRef } from "react";
import { BasePage } from "../../../base-ui/BasePage";
import { IFormItemConfig } from "../../../base-ui/MyForm";
import {
  columns as columnsConfig,
  formItemConfig,
  IQueryForm,
  IRoleList
} from "./config";
export default function RoleManage() {
  const formItemsConfig = useRef<IFormItemConfig[]>(formItemConfig);
  const url = useRef<string>("/sys/role/getRoleList");
  const columns = useRef<ColumnsType<IRoleList>>(columnsConfig);
  const myRef = useRef<any>();
  return (
    <div>
      <BasePage<IQueryForm, IRoleList>
        myRef={myRef}
        url={url.current}
        formItems={formItemsConfig.current}
        columns={columns.current}
      ></BasePage>
      <Button
        onClick={() => {
          if (myRef.current) {
            myRef.current.getDataList();
          }
        }}
      >
        {" "}
        测试
      </Button>
    </div>
  );
}
