"use client";
import React from "react";
import { Input } from 'antd';
import { Tree } from 'antd';
import type { PopconfirmProps } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import { Button} from 'antd';
import  { useState,useEffect } from 'react';
import {Flex, Table ,Tag,Space,message, Popconfirm} from 'antd';
import type { TableColumnsType, TableProps} from 'antd';
import {getRandomColor} from "@/utils/common";
import IntroductionInfo from "@/components/introduction-info";
import Tooltip from "@/components/tooltip";
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
        { title: '总公司', key: '1-0-0',children:[
          {title: '下一级-被修改-11', key: '1-0-0-0',children:[
            {title:'88-1-1', key: '1-0-0-0-0', children:[
              {title:'112', key: '1-0-0-0-0-0'},
              {title:'113', key: '1-0-0-0-0-1'}
            ]}
          ]},
          {title:'IT部门',key:'2-0-0-1'},
          {title:'测试部门2', key: '3-0-0-2',children:[
            {title:'testuuu', key: '3-0-0-0-0',isLeaf: true},
            {title:'ffadas', key: '3-0-0-0-1',isLeaf: true}
          ]},
          {title:'testeeeee', key: '4-0-0-3'},
          {title:'测试重ssstt', key: '5-0-0-4',children:[{title:'公司下1', key: '5-0-0-0-0',isLeaf: true}]},
          {title:'组织角色A', key: '6-0-0-5'}
        ]  },
        { title: '焦煤集团', key: '2-0-1' },
        { title: '11212', key: '3-0-2' },
        { title: 'WeOps', key: '4-0-3' },
        { title: '测试部门1', key: '4-0-4',children:[
          {title: '测试部门2', key: '4-0-0-0', isLeaf: true}] }
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
    role: string;
    actions: string[];
  }
  const columns: TableColumnsType<DataType> = [
    { title: 'USERNAME', dataIndex: 'username',render:(text)=>{ 
      const color=getRandomColor();

      return <div className="flex"><span className="h-8 w-8 rounded-2xl text-center text-[20px]" style={{color:"#ffffff",backgroundColor:color}}>{text.substring(1,2)}</span><span>{text}</span></div>}
    },
    { title: 'NAME', dataIndex: 'name' },
    { title: 'EMAIL', dataIndex: 'email' },
    { title: 'NUMBER', dataIndex: 'numbre' },
    { title: 'Team', dataIndex: 'team' },
    { title: 'Role', dataIndex: 'role',render:(text)=>{
      let color='green';
      if(text==='Administrator'){
        color='green'
      }else{
        color='processing'
      }
      return <Tag color={color}>{text}</Tag> }},
    { title: 'Actions', dataIndex: 'actions',render:(arr:string[])=>{
      return <Space size="middle">
        <a>{arr[0]}</a>
        <a>{arr[1]}</a>
      </Space>}}];

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
      actions: ['Edit', 'Delete'],

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
    const newData = [...data, {
      key: data.length.toString(),
      username: `username${data.length}`,
      name: 'chenlin',
      email: `email${data.length}@gmail.com`,
      numbre: 'Administrator',
      team: 'Team A',
      role: 'Administrator',
      actions: ['Edit', 'Delete'],}];
    setData(newData);
  };

  // 确认删除
  const confirm: PopconfirmProps['onConfirm'] = () => {
    const newData = data.filter((item) =>!selectedRowKeys.includes(item.key));
    setData(newData)
    message.success('Click on Yes');
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('Click on No');
  };
  return (
    <div className="w-full">
      {/* 顶部的提示信息 */}
      <IntroductionInfo message="Display all information.You can maintain user information and assign roles." title="Users" />

      {/* 主体内容 */}
      {/* 左边 */}
      <div className="flex">
        <div className="w-4/12 h-auto flex flex-col justify-items-center items-center bg-white mt-4 rounded-md mr-3">
          <Input className="w-5/6 mt-2" placeholder="search..." />
          <DirectoryTree
            className="w-5/6 mt-2 h-96 "
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
        {/* 右边 */}
        <div className="w-8/12 h-full ml-auto mt-4">
          <div className="w-full h-11 mb-2">
            <div className="flex justify-between">
              <div className="w-[200px] h-[40px]">
                <Input className="h-6 mt-2" placeholder="search..." />
              </div>
              <div className="flex">
                <Button className="mr-1 mt-1" type="primary" onClick={addData}>+Add</Button>
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
              <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{pageSize:5}} />
            </Flex>
            <Tooltip title="name" >dfdffd</Tooltip>
            <OperateModal>ffef</OperateModal>
          </div>
        </div>

      </div>
    </div>
  );
};
export default User;


