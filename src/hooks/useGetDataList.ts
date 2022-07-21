import { useMemo, useRef } from "react";
import { IMyRef } from "../base-ui/BasePage";
import { IFormItemConfig } from "../base-ui/MyForm";
export type IBasePageConfig = {
  url: string;
  formItems: IFormItemConfig<any>[];
  myRef: React.RefObject<IMyRef>;
};
export type IFunc = () => void;
//  返回的对象和getDataList类型未定，使用的时候需要as断言
export function useGetDataList(
  formItemConfig: IFormItemConfig[],
  myUrl: string
) {
  const url = useRef<string>(myUrl);
  const formItemsConfig = useRef<IFormItemConfig[]>(formItemConfig);
  const myRef = useRef<IMyRef>(null);
  const getDataList = useMemo(() => myRef.current?.getDataList, []);
  return [
    { url: url.current, formItems: formItemsConfig.current, myRef },
    getDataList
  ];
}
