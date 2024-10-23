"use client";
import React from "react";
import { Input, Form, Radio, Select } from 'antd';
import { Tree, Modal } from 'antd';
import type { PopconfirmProps } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { Flex, Table, Tag, Space, message, Popconfirm } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { getRandomColor } from "@/utils/common";
import IntroductionInfo from "@/components/introduction-info";
import Modalcontent from "@/components/modal-content";
import OperateModal from "@/components/operate-modal";



const User = () => {
  // 树形结构数据
  type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

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

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  // 表格数据
  type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
  interface DataType {
    key: React.Key;
    username: string;
    name: string;
    email: string;
    numbre: string;
    team: string;
    role: string
  }
  const columns: TableColumnsType<DataType> = [
    {
      title: 'USERNAME', dataIndex: 'username', render: (text) => {
        const color = getRandomColor();

        return <div className="flex"><span className="h-8 w-8 rounded-2xl text-center text-[20px]" style={{ color: "#ffffff", backgroundColor: color }}>{text?.substring(0, 1)}</span><span>{text}</span></div>
      }
    },
    { title: 'NAME', dataIndex: 'name' },
    { title: 'EMAIL', dataIndex: 'email' },
    { title: 'NUMBER', dataIndex: 'numbre' },
    { title: 'Team', dataIndex: 'team' },
    {
      title: 'Role', dataIndex: 'role', render: (text) => {
        let color = 'green';
        if (text === 'Administrator') {
          color = 'green'
        } else {
          color = 'processing'
        }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: 'Actions', dataIndex: 'actions', render: () => {
        return <Space size="middle">
          <a onClick={()=>{console.log('fff')}}>{'edit'}</a>
          <a>{'delete'}</a>
        </Space>
      }
    }];

  //数据源
  const dataSource = Array.from<DataType>({ length: 4 }).map<DataType>((_, index) => (
    {
      key: index.toString(),
      username: `username${index}`,
      name: '张三',
      email: `email${index}@gmail.com`,
      numbre: 'Administrator',
      team: 'Team A',
      role: 'Administrator',

    }
  ));
  const [data, setData] = useState(dataSource);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
    setModal2Open(true);
    form.resetFields();
    form.setFieldsValue({ role: "administrators" })
  };
  function onOk() {
    console.log(form.getFieldsValue())
    setData([...data, form.getFieldsValue()])
    setModal2Open(false); 
  }

  //编辑用户
  // const edituser = (e:any) => {
  //   setModal2Open(true);
  //   form.resetFields();
  //   form.setFieldsValue({ role: "administrators" })
  //   console.log(e.target);
  // };









  // 确认删除
  const confirm: PopconfirmProps['onConfirm'] = () => {
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key));
    setData(newData)
    message.success('Click on Yes');
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('Click on No');
  };

  //控制Modal的打开和关闭
  const [modal2Open, setModal2Open] = useState(false);

  function onOkprops(value: any) {

    setData([...data, value]);
    setModal2Open(false);
    console.log(value);
  }

  const options = [
    { label: 'administrators', value: 'administrators' },
    { label: 'normal users', value: 'normal users' }
  ];

  const { TextArea } = Input;
  //表单的数据初始化
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ role: "administrators" })
  }, [])







  return (
    <div className="w-full">
      {/* 顶部的提示信息 */}
      <IntroductionInfo message="Display all information.You can maintain user information and assign roles." title="Users" />

      {/* 主体内容 */}
      {/* 左边 */}
      <div className="flex">
        <div className="w-[250px]  flex flex-col justify-items-center items-center bg-white mt-4 rounded-md mr-3">
          <Input className="w-5/6 mt-2" placeholder="search..." />
          <DirectoryTree
            className="w-5/6 mt-2 h-full"
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
        {/* 右边 */}
        <div className="h-full ml-auto mt-4 flex-1">
          <div className="w-full h-11 mb-2">
            <div className="flex justify-between">
              <div className="w-[200px] h-[40px]">
                <Input className="h-6 mt-2" placeholder="search..." />
              </div>
              <div className="flex">
                <Button className="mr-1 mt-1" type="primary" onClick={addData}>+Add</Button>
                <OperateModal title="Add User" open={modal2Open}
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
                        defaultValue="team1"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: 'team1', label: 'team1' }, { value: 'team2', label: 'team2' }]}
                        placeholder="select it"
                      />
                    </Form.Item>
                    <Form.Item name='role'><Radio.Group block options={options} /></Form.Item>
                    <Form.Item name='comment'><TextArea placeholder="textarea with clear icon" allowClear /></Form.Item>
                  </Form>
                </OperateModal>
                <Button className="mr-1 mt-1">Modify Role</Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  className="mt-1"
                >
                  <Button>Modify Delete</Button>
                </Popconfirm>
              </div>
            </div>
          </div>
          <div className="w-full h-fit">
            <Flex gap="middle" vertical>
              <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            </Flex>


          </div>
        </div>

      </div>
    </div>
  );
};
export default User;


