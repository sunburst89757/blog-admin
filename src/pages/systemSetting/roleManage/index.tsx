import { useRef } from "react";
import MyForm, { IFormItemConfig } from "../../../base-ui/MyForm";
import { TableLayout } from "../../../components/TableLayout";
import { formItemConfig } from "./config";
type IQueryForm = {
  name: string;
  nickName: string;
  date: string;
};
export default function RoleManage() {
  const formItemsConfig = useRef<IFormItemConfig[]>(formItemConfig);
  return (
    <div>
      <TableLayout>
        <MyForm<IQueryForm> formItems={formItemsConfig.current}></MyForm>
      </TableLayout>
    </div>
  );
}
