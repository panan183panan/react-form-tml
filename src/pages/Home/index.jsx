import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import ToHeader from "../../components/ToHeader";
import axios from "../../utils/request";
import Contenter from "./Content";
import "./style.less";
import { NavLink,Outlet,useLocation } from 'react-router-dom';
import WidthUseNavigate from '../../components/withRouter'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;


const getIcon = {
  DesktopOutlined: <DesktopOutlined />,
  FileOutlined: <FileOutlined />,
  PieChartOutlined: <PieChartOutlined />,
  TeamOutlined: <TeamOutlined />,
  UserOutlined: <UserOutlined />,
};

const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [pages, setPages] = useState([]);
  const [item, setItem] = useState([]);
  const [num, setNum] = useState(1);
  const location = useLocation()

  // 邮箱：http://www.yyfandyy.xyz/sendmail2.jsp?email=3234059020@qq.com&code=123456

  useEffect(()=>{
    const username = localStorage.getItem("username")||""
    if(!username){
      props.to('/login')
    }else{
      axios.get(`/list?username=${username}`).then((res) => {
        console.log(res.data)
        setPages(res.data);
        setItem(getPage(res.data));
      });
    }
  },[])

  useEffect(()=>{
    const username = localStorage.getItem("username")||""
    if(!username){
      props.to('/login')
    }else{
      axios.get(`/list?username=${username}`).then((res) => {
        console.log(res.data)
        setPages(res.data);
        setItem(getPage(res.data));
      });
    }
    return setNum(localStorage.getItem("num"))
  },[localStorage.getItem("num")])


  function getPage(List) {
    const menuItem = [];
    List?.map((item, index) => {
      const { name, id, icon } = item;
      menuItem.push({
        label: name,
        key: id,
        icon: getIcon[icon],
        children: "",
      });
    });
    return menuItem;
  }

  return (
    <Layout
      className=""
      style={{
        minHeight: "100vh",
      }}
    >
      <ToHeader />

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />

          <Menu
            theme="dark"
            defaultSelectedKeys={[localStorage.getItem("num")]}
            mode="inline"
            items={[...item, ("icon": getIcon[icon])]}
            onClick={(e) => {
              getPage(pages);
              props.to('/home/'+e.key)
            }}
          />
        </Sider>
        <Contenter />
      </Layout>
    </Layout>
  );
};

export default WidthUseNavigate(App);
