import React, { useState,useEffect } from "react";
import "./style.less";
import {
  Button,
  Drawer,
  Form,
  Radio,
  Input,
  Dropdown,
  Space,
  Divider,
  Menu,
  Avatar,
} from "antd";
import axios from "../../utils/request";
import { decrypt, encrypt } from '../../utils/crypto-js'
import { v4 as uuidv4 } from "uuid";
import WidthUseNavigate from "../withRouter";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

function ToHeader(props) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("用户名");
  const [formLayout, setFormLayout] = useState("horizontal");
  const [value, setValue] = useState(1);

  useEffect(()=>{
    const name = localStorage.getItem("username");
    setUsername(decrypt(name))
  },[username])

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value.render.name);
  };

  const onFinish = (values) => {
    const List = {
      name: values.name,
      title: values.title,
      icon: value,
    };
    console.log(List);
    const uuid = uuidv4()
      .split("-")
      .reduce((a, b) => a + b, "");
    const username = localStorage.getItem("username")
    axios.post(`/list`, {
        username:username,
        id: uuid,
        body: {},
        ...List,
      })
      .then((res) => {
        console.log(res);
        props.to(`/home/id=${uuid}`);
      });

    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const handlechange=(e)=>{
    if(e.key==0){
      console.log("0")
    }
    else if(e.key==1){
      console.log("1")
    }
    else if(e.key==2){
      localStorage.removeItem("username")
      localStorage.removeItem("num")
      props.to('/login')
    }
  }

  const getItem =(name)=>{
    return(
      [
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" style={{"color":"blue"}}>
              {name}
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <span>
              退出登录
            </span>
          ),
          key: "2",
        },
        {
          type: "divider",
        },
      ]
    )
  } 


  return (
    <div className="header">
      <div>
        <Dropdown
          menu={{
            items:getItem(username),
            onClick:handlechange
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{username.charAt(0).toLocaleUpperCase()}</Avatar>
          </a>
        </Dropdown>
      </div>

      <Button type="primary" onClick={showDrawer}>
          新增页面
        </Button> 

      <Drawer title="新增页面" placement="right" onClose={onClose} open={open}>
        <Form
          layout={formLayout}
          initialValues={{
            layout: formLayout,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="名字"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="导航名称" />
          </Form.Item>

          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input placeholder="页面标题" />
          </Form.Item>

          <Form.Item
            label="icon"
            name="icon"
            rules={[
              {
                required: true,
                message: "Please select your icon!",
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={DesktopOutlined}>
                <DesktopOutlined />
              </Radio>
              <Radio value={FileOutlined}>
                <FileOutlined />
              </Radio>
              <Radio value={PieChartOutlined}>
                <PieChartOutlined />
              </Radio>
              <Radio value={TeamOutlined}>
                <TeamOutlined />
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default WidthUseNavigate(ToHeader);
