import React, { useEffect, useState } from "react";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { Form, FormItem, Input, Password, Submit } from "@formily/antd";
import { Tabs, Card } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { VerifyCode } from "./VerifyCode";
import "./app.css";
import axios from "../../utils/request";
import { v4 as uuidv4 } from "uuid";
import { Button, notification, Space, message, Modal } from "antd";
import { decrypt, encrypt } from "../../utils/crypto-js";
import WidthUseNavigate from "../../components/withRouter";

const normalForm = createForm({
  validateFirst: true,
});

const phoneForm = createForm({
  validateFirst: true,
});

function Login(props) {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (localStorage.getItem("username")) {
      props.to("/home");
    }
  }, []);

  const getCode = () => {
    let code = "";
    for (var i = 0; i < 6; i++) {
      code += parseInt(Math.random() * 10);
    }
    setCode(code);
    return code;
  }

  // 账户登录
  const accountLogin = (e: any) => {
    let { username, password } = e;
    console.log(username, password);
    axios
      .get(`/users?username=${encrypt(username)}&password=${encrypt(password)}`)
      .then((res) => {
        if (res.data.length == 0) {
          notification["error"]({
            message: "用户名或密码错误",
            description: "请重新输入",
            duration: 1,
          });
        } else {
          notification["success"]({
            message: "登录成功",
            duration: 1,
          });
          localStorage.setItem("username", encrypt(username));
          props.to(`/home`);
        }
      });
  };

  // 验证码登录
  const codeLogin = (e: any) => {
    let { email, verifyCode } = e;
    console.log(email, verifyCode, code);
  };
  return (
    <div className="container1">
      <Card className="card">
        <Tabs className="tab">
          <Tabs.TabPane key="1" tab="账号密码">
            <Form
              form={normalForm}
              layout="vertical"
              size="large"
              onAutoSubmit={accountLogin}
            >
              <Field
                name="username"
                title="用户名"
                required
                decorator={[FormItem]}
                component={[
                  Input,
                  {
                    prefix: <UserOutlined />,
                  },
                ]}
              />
              <Field
                name="password"
                title="密码"
                required
                decorator={[FormItem]}
                component={[
                  Password,
                  {
                    prefix: <LockOutlined />,
                  },
                ]}
              />
              <Submit block size="large">
                Login
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="验证码登录">
            <Form
              form={phoneForm}
              layout="vertical"
              size="large"
              onAutoSubmit={codeLogin}
            >
              <Field
                name="email"
                title="邮箱地址"
                required
                validator="email"
                decorator={[FormItem]}
                component={[
                  Input,
                  {
                    prefix: <PhoneOutlined />,
                  },
                ]}
              />
              <Field
                name="verifyCode"
                title="验证码"
                required
                reactions={(field) => {
                  const email = field.query(".email");
                  field.setComponentProps({
                    readyPost: email.get("valid") && email.get("value"),
                    email: email.get("value"),
                    code: getCode(),
                  });
                }}
                decorator={[FormItem]}
                component={[
                  VerifyCode,
                  {
                    prefix: <LockOutlined />,
                  },
                ]}
              />
              <Submit block size="large">
                Login
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <a href="/#/regester">注册</a>
          <a href="#Forgot password">忘记密码?</a>
        </div>
      </Card>
    </div>
  );
}

export default WidthUseNavigate(Login);
