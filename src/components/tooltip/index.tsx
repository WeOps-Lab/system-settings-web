import React, { useEffect } from'react';
import { useState } from'react';

import { Button,Form, Input, Radio,Modal} from 'antd';
interface TooltipProps {
     title:string;
     width?:string;
     height?:string;
     children:React.ReactNode;
}


function Tooltip(date:TooltipProps) {
  const width=date.width || "380px";
  const height=date.height || "630px";

  const options = [
    { label: 'administrators', value: 'administrators' },
    { label: 'normal users', value: 'normal users' }
  ];

  const {TextArea}=Input;
  //拿表单的数据
  const [form]=Form.useForm();
  function submit() { 
    console.log('获取表单元素');
     
    console.log(form.getFieldsValue());

  }
  useEffect(()=>{
    form.setFieldsValue({role: "administrators"})
    console.log('fdfd')
  },[])

  
  return (
    <div className='rounded-xl center' style={{width:width,height:height}}>
      <div className='rounded-xl them-bg'>{date.title}</div>
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
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name='role'><Radio.Group block options={options}  /></Form.Item>
        <Form.Item name='comment'><TextArea placeholder="textarea with clear icon" allowClear /></Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' onClick={submit}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Tooltip;