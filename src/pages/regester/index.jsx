import React, { useEffect, useState } from "react";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import {
  Form,
  FormItem,
  Input,
  Password,
  Submit,
  FormButtonGroup,
} from "@formily/antd";
import { Button, notification, Space, message, Modal, Card } from "antd";
import "./app.css";
import { decrypt, encrypt } from "../../utils/crypto-js";
import WidthUseNavigate from "../../components/withRouter";
import { v4 as uuidv4 } from "uuid";
import axios from "../../utils/request";

const form = createForm({
  validateFirst: true,
});

function Regester(props) {
  useEffect(() => {
    if (localStorage.getItem("username")) {
      props.to("/home");
    }
  }, []);

  // 弹窗提示
  const openNotificationWithIcon = (text) => {
    notification["warning"]({
      message: text,
      duration: 1,
    });
  };

  const showopenNotification = (message,text) => {
    notification[message]({
      message: text,
      duration:1
    });
  };

  // 注册逻辑
  const getForm = (e: any) => {
    let { username, email, password } = e;
    const uuid = uuidv4();
    console.log(username, email, password);
    axios
      .post("/users", {
        id: uuid,
        username: encrypt(username),
        password: encrypt(password),
        email: encrypt(email),
      })
      .then((res) => {
        showopenNotification("success", "注册成功");
        setTimeout(()=>{
          props.to("/login")
        },2000)
      });
  };

  return (
    <div className="container1">
      <Card className="card">
      <div
          style={{
            width:"100%",
          }}
        >
          <a href="/#/login">返回登录</a>
        </div>
        <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={getForm}>
          <Field
            name="username"
            title=" 用户名"
            required
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="email"
            title="邮箱"
            required
            validator="email"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="password"
            title="新密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field: any) => {
              const confirm = field.query(".confirm_password");
              field.selfErrors =
                confirm.get("value") &&
                field.value &&
                field.value !== confirm.get("value")
                  ? "两次密码不一致哦~"
                  : "";
            }}
          />
          <Field
            name="confirm_password"
            title="确认密码"
            required
            decorator={[FormItem]}
            component={[
              Password,
              {
                checkStrength: true,
              },
            ]}
            reactions={(field: any) => {
              const confirm = field.query(".password");
              field.selfErrors =
                confirm.get("value") &&
                field.value &&
                field.value !== confirm.get("value")
                  ? "两次密码不一致哦~"
                  : "";
            }}
          />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              Register
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Card>
    </div>
  );
}
export default WidthUseNavigate(Regester);
