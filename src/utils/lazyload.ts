import { lazy } from "react";
// vite动态引入有问题
/* 
原理：不能像之前的动态导入的原因
https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#how-it-works
解决办法
https://github.com/vitejs/vite/issues/4945
*/
export const splitFilePath = (filePath: string) => {
  const splitFilePath = filePath.split("/");
  const tempFilePath = splitFilePath.reduce((pre, cur) => {
    return pre + cur + "/";
  }, "../pages/");
  console.log(tempFilePath, "路径");
  const Component = lazy(
    () => import(tempFilePath + "index.tsx" /* @vite-ignore */)
  );
  return Component;
};
