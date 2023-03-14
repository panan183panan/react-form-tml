import React, { useEffect, useState } from "react";
import { Layout, Button, Input, Form, message, Popconfirm, Result } from "antd";
import { useHref } from "react-router-dom";
import axios from "../../../utils/request";
import WidthUseNavigate from "../../../components/withRouter";

import { render as renderAmis, ToastComponent, AlertComponent } from "amis";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
import copy from "copy-to-clipboard";

import { HeartTwoTone } from "@ant-design/icons";

import Generator from 'fr-generator';
const { Provider, Sidebar, Canvas, Settings } = Generator;

const { Header, Content, Sider, Footer } = Layout;

function Contenter(props) {
  const href = useHref();
  const [num, setNum] = useState("1");
  const [List, setList] = useState([]);
  useEffect(() => {
    setNum(href.split("/")[2]);
  }, [href]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios.get(`/list?username=${username}`).then((res) => {
      var List = [];
      res.data.map((item, index) => {
        if (item.id == num) {
          List = item;
        }
      });
      localStorage.setItem("num", List.id);
      setList(List);
    });
  }, [num]);


  const toEdit = () => {
    let id = localStorage.getItem("num");
    props.to(`/detail/${id}`);
  };

  const confirm = () => {
    console.log(num);
    message.success("删除成功");
  };

  const cancel = () => {
    message.error("取消删除");
  };

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background">
        <span>{List?.title}</span>
        <span>
          <Button type="primary" onClick={toEdit}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该页面吗?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </span>
      </Header>

      <Content className="content">
        {JSON.stringify(List?.body) === '{}' ? (
          <Result
            icon={<HeartTwoTone />}
            title="暂时还没有组件哦~，赶紧去编辑吧"
            // extra={<Button type="primary">Next</Button>}
          />
        ) : (
          <Provider
            onChange={data => console.log('data:change', data)}
            onSchemaChange={schema => console.log('schema:change', schema)}
            preview={true}
            defaultValue={List?.body}
            extraButtons={[false,false,false,false]}
          >
            <div className="fr-generator-container">
              <Canvas />
            </div>
          </Provider>
        )}
      </Content>

      <Footer className="footer">©2022 react-form-tml-杭州师范大学-潘安</Footer>
    </Layout>
  );
}

export default WidthUseNavigate(Contenter);
