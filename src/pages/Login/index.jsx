import React,{ useEffect,useState } from 'react'
import './style.less'
import WidthUseNavigate from "../../components/withRouter"
import { decrypt, encrypt } from '../../utils/crypto-js'
import axios from '../../utils/request'
import { Button, notification, Space,message,Modal } from 'antd';
import { v4 as uuidv4 } from "uuid";


function LoginRegister(props) {
  let [username,setUsername]=useState("");
  let [password,setPassword]=useState("");
  let [r_username,setR_username]=useState("");
  let [r_email,setR_email]=useState("");
  let [r_code,setR_code]=useState("");
  let [code,setCode]=useState("");
  let [r_password,setR_password]=useState("");
  let [text,setText]=useState("获取验证码");
  let [grade,setGrade]=useState(0);

  const initData=()=>{
    setUsername("")
    setPassword("")
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (num) => {
    setIsModalOpen(true);
    setGrade(num)
  };

  // 确认注册
  const handleOk = () => {
    setIsModalOpen(false);
    const uuid = uuidv4()
    // 注册逻辑
    axios.post("/users",{
      id:uuid,
      username:encrypt(r_username),
      password:encrypt(r_password),
      email:encrypt(r_email)
    }).then((res)=>{
      showopenNotification("success","注册成功")
      const container = document.querySelector(".container");
      container.classList.remove("sign-up-mode")
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 弹窗提示
  const openNotificationWithIcon = (text) => {
    notification["warning"]({
      message: text,
      duration:1
    });
  };

  const showopenNotification = (message,text) => {
    notification[message]({
      message: text,
      duration:1
    });
  };
  // 验证邮箱地址是否合法
  const checkEmail = (email)=>{
    let t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let b = email.search(t)
    return b
  }

  // 验证密码是否包含数字，字母，特殊字符
  const checkpassword=(str)=>{
    var a = /[0-9]/;
    var b = a.test(str)
    var c = /[a-z]/i;
    var d = c.test(str)

    // console.log(b & d)
    return b & d
  }

  // 提示密码强度，是否更换密码
  const cryptographic = (str)=>{
    var lvl=0;//默认是0级
   //密码中是否有数字,或者是字母,或者是特殊符号
   if(/[0-9]/.test(str) && !/[a-zA-Z]/.test(str)){
     lvl=1;
   }else if(/[a-zA-Z]/.test(str) && !/[0-9]/.test(str) ){
    lvl=2;
   }else if(/[a-zA-Z]/.test(str) && /[0-9]/.test(str)){
     lvl=3;
   }
   //判断密码中有没有特殊符号
   if(/[^0-9a-zA-Z_]/.test(str)){
     lvl++;
   }
   console.log(lvl)
   return lvl
  }

  // 前往注册
  const signup=()=>{
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode")
  }
  // 前往登录
  const signin=()=>{
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode")
  }

  // 登录
  const btnlogin=()=>{
    if(username.length==0){
      openNotificationWithIcon('请输入用户名')
      initData()
    }else if(username.length>10){
      openNotificationWithIcon("用户名长度过长")
      initData()
    }else if(password.length==0){
      openNotificationWithIcon("请输入密码")
      initData()
    }else if(password.length<6){
      openNotificationWithIcon("密码长度过短")
      initData()
    }else if(password.length>20){
      openNotificationWithIcon("密码长度过长")
      initData()
    }else{
      axios.get(`/users?username=${encrypt(username)}&password=${encrypt(password)}`).then((res)=>{
        if(res.data.length==0){
          notification["error"]({
            message: "用户名或密码错误",
            description:"请重新输入",
            duration:1
          });
        }else{
          notification["success"]({
            message: "登录成功",
            duration:1

          });
          localStorage.setItem("username",encrypt(username))
          props.to(`/home`)
        }
      })
    }
  }

  // 注册
  const btnregister=()=>{
    // console.log(r_username,r_email,r_code,r_password);
    if(r_username.length==0){
      openNotificationWithIcon('请输入用户名')
    }else if(checkEmail(r_email)!=0){
      openNotificationWithIcon('请输入有效邮箱')
    }else if(r_code!=code){
      openNotificationWithIcon('请输入有效邮箱验证码')
    }else if(r_password.length<6){
      openNotificationWithIcon('密码长度不能小于6位')
    }else if(r_password.length>32){
      openNotificationWithIcon('密码长度不能大于32位')
    }else{
      // console.log("ok")
      // 计算密码强度
      let grade = cryptographic(r_password)
      showModal(grade)
    }
  }

  // 发送验证码
  const senCode = ()=>{
    let permissions = false
    let time = 5
    if(text=="获取验证码"){
      permissions = true
    }
    if(permissions){
      // 发送邮件逻辑
      let code = '';
      for(var i=0;i<6;i++){
          code += parseInt(Math.random()*10);
      }
      setCode(code);
      openNotificationWithIcon(`邮箱验证码为：${code}`)
      // url = "http://www.yyfandyy.xyz/sendmail2.jsp?email=3234059020@qq.com&code=123456"
      axios.get(`http://www.yyfandyy.xyz/sendmail2.jsp?email=${r_email}@qq.com&code=${code}`)

      let t = setInterval(()=>{
        if(time===0){
          setText("获取验证码")
          clearInterval(t);
        }else{
          setText(time+"s")
        }
        time--;
      }, 1000);
    }
  }

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {/* 登录 */}
          <form action="" className="sign-in-form">
            <h2 className="title">登录</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="用户名" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="密码"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="登 录" className="btn solid" onClick={btnlogin}/>
            <p className="social-text">或者通过以下平台登录</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-weixin"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-qq"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-alipay"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </form>

          {/* 注册 */}
          <form action="" className="sign-up-form">
            <h2 className="title">注册</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="用户名" value={r_username} onChange={(e)=>setR_username(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="邮箱" value={r_email} onChange={(e)=>setR_email(e.target.value)}/>
              <div className='codediv'><button className='sendcode' onClick={senCode}>{text}</button></div>
            </div>
            <div className="input-field">
              <i className="fas fa-code"></i>
              <input type="number" placeholder="验证码" value={r_code} onChange={(e)=>setR_code(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="密码" value={r_password} onChange={(e)=>setR_password(e.target.value)}/>
            </div>
            <input type="submit" className="btn" value="注 册" onClick={btnregister}/>
            <p className="social-text">或者通过以下平台注册</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-weixin"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-qq"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-alipay"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </form>

          <Modal title="密码强度校验" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
            <p>{r_username}:</p>
            <p>您的邮箱账号为：{r_email}</p>
            <p>您所设置的密码强度等级为：<strong>{grade}</strong></p>
            <p>一级：危险；二级：一般；三级：可靠；四级：安全</p>
            <p>是否以--{r_password}--作为您的登录密码</p>
          </Modal>

        </div>
      </div>

      <div className="panels-container">

        <div className="panel left-panel">
          <div className="content">
            <h3>新用户?</h3>
            <p>
              好兄弟,你来了,我们的网站就差你了,点击下方注册按钮加入我们吧!!

            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={signup}>
              注册
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>已经是我们自己人了吗?</h3>
            <p>
              那好兄弟,你直接点击登录按钮,登录到我们的系统里!!
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={signin}>
              登 录
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  )
}


export default WidthUseNavigate(LoginRegister)