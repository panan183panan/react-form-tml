import React,{useEffect,useState} from 'react'
import { Button,Input,Form } from "antd";

const {TextArea} = Input

export default function JSONToform(props) {
    const [components,setComponents] = useState([])
    const [itemList,setItemList] = useState({})
    const [aaa,setAaaa] = useState(null)
    useEffect(()=>{
        // console.log(props.json)
        setComponents(props.json)
    },[props.json])

    useEffect(()=>{
        console.log(props.page);
        components.map((item,index)=>{
            const component1 = item.type.split("-")[0]
            setAaaa(component1)
            const component2 = item.type.split("-")[1]
            const pro = {
              ...item,
              type:component2||null,
            }
            setItemList(pro)
        })
    },[components])


    const rendercomponent=(component,props)=>{
        if(component=="input"){
            return(
                <Form.Item 
                label={props.label} 
                name={props.name}
                {...props}
              >
                <Input {...props}/>
              </Form.Item>
            )
        }
        else if(component=="textarea"){
            return(
                <Form.Item 
                label={props.label} 
                name={props.name}
                {...props}
              >
                <TextArea {...props}/>
              </Form.Item>
            )
        }
    }
  return (
    <div>
        {
            props.json.length==0?<div>暂时没有组件</div> :rendercomponent(aaa,itemList)
        }
    </div>
  )
}

