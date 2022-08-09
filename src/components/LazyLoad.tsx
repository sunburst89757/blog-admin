import { Spin } from "antd";
import { Suspense } from "react";
import { splitFilePath } from "../utils/lazyload";
// path是文件夹的路径
export function LazyLoad({ path }: { path: string }) {
  const Component = splitFilePath(path);
  return (
    <Suspense
      fallback={<Spin style={{ height: "100vh", width: "100vw" }}></Spin>}
    >
      <Component></Component>
    </Suspense>
  );
}
