"use client";
import React from "react";
import { Input, Form, Radio, Select } from 'antd';
import { Tree, Modal } from 'antd';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { getRandomColor } from "@/utils/common";
import IntroductionInfo from "@/components/introduction-info";
import OperateModal from "@/components/operate-modal";
import { Flex, Table, Tag, Space, message, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

interface DataType {
  key: React.Key;
  username: string;
  name: string;
  email: string;
  number: string;
  team: string;
  role: string
}

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const User = () => {
//hook函数
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //控制Modal的打开和关闭
  const [modal2Open, setModal2Open] = useState(false);
  //控制修改角色的弹窗
  const [modalVisible, setModalVisible] = useState(false);
  //主要控制选中的用户名
  const [username, setUsername] = useState('zhang');
  // 数据
  const { DirectoryTree } = Tree;
  const treeData: TreeDataNode[] = [
    {
      title: '默认目录1',
      key: '0-0',
      children: [
        {
          title: '总公司', key: '1-0-0', children: [
            {
              title: '下一级-被修改-11', key: '1-0-0-0', children: [
                {
                  title: '88-1-1', key: '1-0-0-0-0', children: [
                    { title: '112', key: '1-0-0-0-0-0' },
                    { title: '113', key: '1-0-0-0-0-1' }
                  ]
                }
              ]
            },
            { title: 'IT部门', key: '2-0-0-1' },
            {
              title: '测试部门2', key: '3-0-0-2', children: [
                { title: 'testuuu', key: '3-0-0-0-0', isLeaf: true },
                { title: 'ffadas', key: '3-0-0-0-1', isLeaf: true }
              ]
            },
            { title: 'testeeeee', key: '4-0-0-3' },
            { title: '测试重ssstt', key: '5-0-0-4', children: [{ title: '公司下1', key: '5-0-0-0-0', isLeaf: true }] },
            { title: '组织角色A', key: '6-0-0-5' }
          ]
        },
        { title: '焦煤集团', key: '2-0-1' },
        { title: '11212', key: '3-0-2' },
        { title: 'WeOps', key: '4-0-3' },
        {
          title: '测试部门1', key: '4-0-4', children: [
            { title: '测试部门2', key: '4-0-0-0', isLeaf: true }]
        }
      ],
    }
  ];

  // 表格数据
  const columns: TableColumnsType<DataType> = [
    {
      title: 'USERNAME', dataIndex: 'username', render: (text) => {
        const color = getRandomColor();

        return <div className="flex"><span className="h-5 w-5 rounded-[10px] text-center text-[12px] mr-1" style={{ color: "#ffffff", backgroundColor: color }}>{text?.substring(0, 1)}</span><span>{text}</span></div>
      }
    },
    { title: 'NAME', dataIndex: 'name' },
    { title: 'EMAIL', dataIndex: 'email' },
    { title: 'NUMBER', dataIndex: 'number' },
    { title: 'Team', dataIndex: 'team' },
    {
      title: 'Role', dataIndex: 'role', render: (text) => {
        const color = text === 'Administrator' ? 'green' : 'processing ';
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: 'Actions', dataIndex: 'key', render: (key) => {
        return <Space size="middle">
          <a onClick={()=>{editeuser()}}>{'edit'}</a>
          <a onClick={()=>{setData(data.filter((item)=>item.key!==key))}}>{'delete'}</a>
        </Space>
      }
    }];

  const dataSource = Array.from<DataType>({ length: 4 }).map<DataType>((_, index) => (
    {
      key: index.toString(),
      username: `username${index}`,
      name: '张三',
      email: `email${index}@gmail.com`,
      number: 'Administrator',
      team: 'Team A',
      role: 'Administrator',
    }
  ));

  const options = [
    { label: 'administrators', value: 'administrators' },
    { label: 'normal users', value: 'normal users' }
  ];

  const { TextArea } = Input;
  //表单的数据初始化
  const [form] = Form.useForm();


  useEffect(() => {
    setData(dataSource);
    console.log(form);

  },[])

  useEffect(() => {
    form.setFieldsValue({ role: "administrators" })
  }, [])

  useEffect(() => {
    const newarray = data.filter((item) => selectedRowKeys.includes(item.key));
    console.log(newarray);


  },[selectedRowKeys])




  //普通的方法
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //添加一条数据
  const addData = () => {
    const key = data.length + 1;
    const keystr= key.toString()
    setModal2Open(true);
    form.resetFields();
    form.setFieldsValue({ role: "administrators", team: 'Team A', key: {keystr}})
  };
  function onOk() {
    console.log(form.getFieldsValue())
    setData([...data, form.getFieldsValue()])
    setModal2Open(false); 
  }

  //编辑用户
  function editeuser(){
    const newdata = data.filter((item) => selectedRowKeys.includes(item.key));
    console.log(newdata);
    setModal2Open(true);
    form.setFieldsValue(newdata[0]);
  }


  // 确认删除
  const confirm: PopconfirmProps['onConfirm'] = () => {
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key));
    setData(newData);
    message.success('Click on Yes');
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('Click on No');
  };


  function onOkprops(value: any) {

    setData([...data, value]);
    setModal2Open(false);
    console.log(value);
  }

  //批量修改用户的角色
  const handleModalOpen = () => {
    setModalVisible(false);

  };
  const handleModalClose = () => {
    
    setModalVisible(false);
  };
  function modifyRole() {
    console.log(form.getFieldsValue())

    setModalVisible(true);
  }




  return (
    <div className="w-full">
      {/* 顶部的提示信息 */}
      <IntroductionInfo message="Display all information.You can maintain user information and assign roles." title="Users" />

      {/* 主体内容 */}
      {/* 左边 */}
      <div className="flex">
        <div className="w-[250px] h-[440px] flex flex-col justify-items-center items-center bg-white mt-4 rounded-md mr-3 overflow-scroll">
          <Input className="w-5/6 mt-2" placeholder="search..." />
          <DirectoryTree
            className="mt-2 h-full"
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
        {/* 右边 */}
        <div className="h-[420px] ml-auto mt-4 flex-1">
          <div className="w-full h-11 mb-2">
            <div className="flex justify-between">
              <div className="w-[200px] h-[40px]">
                <Input className="h-6 mt-2" placeholder="search..." />
              </div>
              <div className="flex">
                <Button className="mr-1 mt-1" type="primary" onClick={addData}>+Add</Button>
                <OperateModal
                  title="Add User" 
                  open={modal2Open}
                  onOk={() => onOk()}
                  onCancel={() => setModal2Open(false)}>
                  <Form
                    form={form}
                    style={{ maxWidth: 600 }}
                  >
                    <Form.Item name='username' label="UserName*">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name='name' label="Name">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name='email' label="Email">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name='number' label="Number">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name='team' label="Team*">
                      <Select
                        style={{ width: 120 }}
                        defaultValue="team1"
                        allowClear
                        options={[{ value: 'team1', label: 'team1' }, { value: 'team2', label: 'team2' }]}
                        placeholder="select it"
                      />
                    </Form.Item>
                    <Form.Item name='role'><Radio.Group block options={options} /></Form.Item>
                    <Form.Item name='comment'><TextArea placeholder="textarea with clear icon" allowClear /></Form.Item>
                  </Form>
                </OperateModal>

                {/* 批量修改角色 */}
                <Button className="mr-1 mt-1" onClick={modifyRole}>Modify Role</Button>
                <OperateModal
                  onOk={handleModalOpen} 
                  onCancel={handleModalClose}
                  open={modalVisible}>
                  <Form
                    form={form}
                    style={{ maxWidth: 600 }}
                  > 
                    <Form.Item><p>Selected users:</p><span className="text-[#1890ff]">{username}</span></Form.Item>
                    <Form.Item name='role'><Radio.Group block options={options} /></Form.Item>
                    <Form.Item name='comment'><TextArea placeholder="textarea with clear icon" allowClear /></Form.Item>
                  </Form> 

                </OperateModal>
                <Popconfirm
                  className="mt-1"
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={confirm}
                  onCancel={cancel}
                >
                  <Button>Modify Delete</Button>
                </Popconfirm>
              </div>
            </div>
          </div>
          <div className="w-full h-fit">
            <Flex gap="middle" vertical>
              <Table<DataType> size={'middle'} pagination={{ pageSize: 5 }} rowSelection={rowSelection} columns={columns} dataSource={data} />
            </Flex>


          </div>
        </div>

      </div>
    </div>
  );
};
export default User;


