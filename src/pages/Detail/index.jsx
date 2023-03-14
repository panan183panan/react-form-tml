import React, { useEffect, useState, useRef } from 'react'
import { useHref } from 'react-router-dom';
import axios from '../../utils/request'
import { message } from "antd";
import WidthUseNavigate from "../../components/withRouter";
// import {Editor} from 'amis-editor';
// import '@fortawesome/fontawesome-free/css/all.css';
// import '@fortawesome/fontawesome-free/css/v4-shims.css';

// import {render as renderAmis, ToastComponent, AlertComponent} from 'amis';
// import 'amis/lib/themes/cxd.css';
// import 'amis/lib/helper.css';
// import 'amis/sdk/iconfont.css';
// import copy from 'copy-to-clipboard';

import Generator from 'fr-generator';
const { Provider, Sidebar, Canvas, Settings } = Generator;

function Detail(props) {
  const href = useHref()
  const [List, setList] = useState([])
  const number = localStorage.getItem("num") || ""
  const username = localStorage.getItem("username") || ""
  const genRef = useRef()

  useEffect(() => {
    axios.get(`/list?username=${username}`).then((res) => {
      var List = []
      res.data?.map((item, index) => {
        if (item.id == number) {
          List = item
        }
      })
      setList(List)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown); // 添加全局事件
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 销毁
    };
  }, []);

  // 按下ctrl+s或command+s时调用保存
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      // 这里是用户按下了 Ctrl + S 后的处理函数
      // ('Ctrl + S 被按下');
      const value = genRef.current && genRef.current.getValue();
      axios.patch(`/list/${number}`,{
        ...List,
        body:JSON.parse(JSON.stringify(value))
      }).then((res) => {
        // 保存数据的函数
        message.success("保存成功");
      }).catch((err)=>{
        message.error("保存失败");
      })
    }
    if(event.key === 'Escape'){
      props.to(`/home/${number}`)
    }
  };

  const saveForm = ()=>{
    console.log("e")
  }

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <Generator
          defaultValue={List?.body}
          ref={genRef}
          // settings={[]}
          // preview={true}
        />
      </div>
    </div>
  )
}


export default WidthUseNavigate(Detail);
