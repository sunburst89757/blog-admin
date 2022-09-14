import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/userManage/roleManage");
  };
  useEffect(() => {
    document.title = "首页";
  }, []);
  return (
    <div>
      <Button onClick={handleNavigate}>测试路由权限</Button>
    </div>
  );
}
