import React from'react';
import { Button,Form, Input, Radio} from 'antd';
interface TooltipProps {
     title:string;
     width?:string;
     height?:string;
     children:React.ReactNode;
}

function Tooltip(date:TooltipProps) {
  const width=date.width || "380px";
  const height=date.height || "630px";
  const [form1] = Form.useForm();

  const options = [
    { label: 'administrators', value: 'administrators' },
    { label: 'normal users', value: 'normal users' }
  ];

  const {TextArea}=Input;
  //拿表单的数据
  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };
  const [form]=Form.useForm();
  function submit() { 
    console.log('获取表单元素');

    console.log(form1.getFieldsValue());

  }



  return (
    <div className='rounded-xl center' style={{width:width,height:height}}>
      <div className='rounded-xl them-bg'>{date.title}</div>
      <Form
        form={form1}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}   
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
        <Form.Item name='role'><Radio.Group block options={options} defaultValue="administrators" /></Form.Item>
        <Form.Item name='comment'><TextArea placeholder="textarea with clear icon" allowClear /></Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' onClick={submit}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Tooltip;