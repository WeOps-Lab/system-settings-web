import React, { useEffect } from'react';
import { useState } from'react';

import { Button,Form, Input, Radio, Select} from 'antd';


interface TooltipProps {
     width?:string;
     height?:string;
     children?:React.ReactNode;
     onOk:(value:any)=>void;
     transferData:boolean;
}


function  Modalcontent(date:TooltipProps) {
  const width=date.width || "380px";
  const height=date.height || "630px";

  const options = [
    { label: 'administrators', value: 'administrators' },
    { label: 'normal users', value: 'normal users' }
  ];

  const {TextArea}=Input;
  //拿表单的数据
  const [form]=Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({role: "administrators"})
  },[])

  //将表单的数据传给父组件
  useEffect(()=>{
    if(date.transferData){
      date.onOk(form.getFieldsValue());
    }
  },[date.transferData])

  return (
    <div className='rounded-xl center' style={{width:width,height:height}}>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name='username' label="UserName*">
          <Input  placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name='name' label="Name">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name='email' label="Email">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item  name='number' label="Number">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item  name='team' label="Team*">
          <Select
            defaultValue="team1"
            style={{ width: 120 }}
            allowClear
            options={[{ value: 'team1', label: 'team1' },{ value: 'team2', label: 'team2' }]}
            placeholder="select it"
          />
        </Form.Item>
        <Form.Item name='role'><Radio.Group block options={options}  /></Form.Item>
        <Form.Item name='comment'><TextArea placeholder="textarea with clear icon" allowClear /></Form.Item>
      </Form>
    </div>
  );
}
export default Modalcontent;