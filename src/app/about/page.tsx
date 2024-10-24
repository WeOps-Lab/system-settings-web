'use client';
import React from 'react';
import { Input, Form, Radio, Select } from 'antd';
import { Tree } from 'antd';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { getRandomColor } from '@/utils/common';
import IntroductionInfo from '@/components/introduction-info';
import OperateModal from '@/components/operate-modal';
import { Flex, Table, Tag, Space } from 'antd';
import type { PopconfirmProps } from 'antd';
import type { TreeDataNode } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

// 定义接口
interface DataType {
  key: React.Key;
  username: string;
  name: string;
  email: string;
  number: string;
  team: string;
  role: string;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const User = () => {
  //hook函数
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //控制Modal的打开和关闭
  const [addmodalOpen, setaddModalOpen] = useState(false);
  //编辑的Modal的打开和关闭
  const [editmodelOpen, seteditmodalOpen] = useState(false);
  //控制修改角色的弹窗
  const [modalVisible, setModalVisible] = useState(false);
  //主要控制选中的用户名
  const [username, setUsername] = useState(['zhangsan']);
  const [modifyRoleOpen, setModifyRoleOpen] = useState<boolean>(false);
  const [editkey, seteditkey] = useState(1);
  //表单的数据初始化
  const [form] = Form.useForm();

  // 数据
  const { DirectoryTree } = Tree;
  const { TextArea } = Input;
  const treeData: TreeDataNode[] = [
    {
      title: '默认目录1',
      key: '0-0',
      children: [
        {
          title: '总公司',
          key: '1-0-0',
          children: [
            {
              title: '下一级-被修改-11',
              key: '1-0-0-0',
              children: [
                {
                  title: '88-1-1',
                  key: '1-0-0-0-0',
                  children: [
                    { title: '112', key: '1-0-0-0-0-0' },
                    { title: '113', key: '1-0-0-0-0-1' },
                  ],
                },
              ],
            },
            { title: 'IT部门', key: '2-0-0-1' },
            {
              title: '测试部门2',
              key: '3-0-0-2',
              children: [
                { title: 'testuuu', key: '3-0-0-0-0', isLeaf: true },
                { title: 'ffadas', key: '3-0-0-0-1', isLeaf: true },
              ],
            },
            { title: 'testeeeee', key: '4-0-0-3' },
            {
              title: '测试重ssstt',
              key: '5-0-0-4',
              children: [{ title: '公司下1', key: '5-0-0-0-0', isLeaf: true }],
            },
            { title: '组织角色A', key: '6-0-0-5' },
          ],
        },
        { title: '焦煤集团', key: '2-0-1' },
        { title: '11212', key: '3-0-2' },
        { title: 'WeOps', key: '4-0-3' },
        {
          title: '测试部门1',
          key: '4-0-4',
          children: [{ title: '测试部门2', key: '4-0-0-0', isLeaf: true }],
        },
      ],
    },
  ];

  // 表格数据
  const columns: TableColumnsType<DataType> = [
    {
      title: 'USERNAME',
      dataIndex: 'username',
      render: (text) => {
        const color = getRandomColor();
        return (
          <div className="flex">
            <span
              className="h-5 w-5 rounded-[10px] text-center text-[12px] mr-1"
              style={{ color: '#ffffff', backgroundColor: color }}
            >
              {text?.substring(0, 1)}
            </span>
            <span>{text}</span>
          </div>
        );
      },
    },
    { title: 'NAME', dataIndex: 'name' },
    { title: 'EMAIL', dataIndex: 'email' },
    { title: 'NUMBER', dataIndex: 'number' },
    { title: 'Team', dataIndex: 'team' },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (text) => {
        const color = text === 'administrators' ? 'green' : 'blue ';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: (key) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                editeuser(key);
              }}
            >
              {'edit'}
            </a>
            <a
              onClick={() => {
                deleteuse(key);
              }}
            >
              {'delete'}
            </a>
          </Space>
        );
      },
    },
  ];

  const dataSource = Array.from<DataType>({ length: 4 }).map<DataType>(
    (_, index) => ({
      key: index,
      username: `username${index}`,
      name: '张三',
      email: `email${index}@gmail.com`,
      number: 'administrator',
      team: 'Team A',
      role: 'administrators',
    })
  );

  const options = [
    { label: 'administrators', value: 'administrators' },
    { label: 'normal users', value: 'normal users' },
  ];

  //useEffect函数

  useEffect(() => {
    setData(dataSource);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ role: 'administrators' });
  }, []);

  //普通的方法
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //添加添加数据的功能
  const addData = () => {
    //初始化数据
    setaddModalOpen(true);
    form.resetFields();
    form.setFieldsValue({ role: 'administrators', team: 'Team A' });
    console.log(form.getFieldsValue);
  };

  function onOk() {
    //点击确定按钮，将数据添加到表格中
    const key = data.length + 1;
    setData([...data, { ...form.getFieldsValue(), key: key }]);
    setaddModalOpen(false);
    setSelectedRowKeys([]);
  }

  //批量修改用户的权限
  function modifyRole() {
    //初始化数据
    setModalVisible(true);
    form.setFieldsValue({ role: 'administrators' });
    const arr = [...selectedRowKeys];
    //获取名字
    console.log(selectedRowKeys);
    const newarr: string[] = [];
    arr.forEach((item) => {
      data.forEach((itemname) => {
        if (itemname.key === item) {
          newarr.push(itemname.username);
        }
      });
    });
    setUsername(newarr);
  }
  // 点击确定按钮，将修改数据添加到表格中
  const handleModalOpen = () => {
    const arr = [...selectedRowKeys];
    const editeusedata: DataType[] = [];
    data.forEach((item) => {
      arr.forEach((itemarr) => {
        if (itemarr === item.key) {
          editeusedata.push({ ...item, role: form.getFieldsValue().role });
        }
      });
    });
    const nodata = [...data].filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setData([...nodata, ...editeusedata]);
    setModalVisible(false);
    setSelectedRowKeys([]);
  };
  // 关闭弹窗
  const handleModalClose = () => {
    setModalVisible(false);
  };
  //批量删除用户
  const confirm: PopconfirmProps['onConfirm'] = () => {
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key));
    setData(newData);
    setModifyRoleOpen(false);
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    setModifyRoleOpen(false);
  };
  //编辑用户
  function editeuser(key: number) {
    seteditkey(key);
    seteditmodalOpen(true);
    form.resetFields();
    const [editfinishdata] = data.filter((item) => item.key === key);
    form.setFieldsValue({ ...editfinishdata });
  }
  //点击确定按钮，将修改数据添加到表格中
  function oneditOk(key: number) {
    const newarr: DataType[] = [];
    data.forEach((item) => {
      if (item.key === key) {
        newarr.push(form.getFieldsValue());
        console.log(form.getFieldsValue().name);
      } else {
        newarr.push(item);
      }
    });
    setData(newarr);
    seteditmodalOpen(false);
    setSelectedRowKeys([]);
  }

  function oneditCancel() {
    seteditmodalOpen(false);
  }
  //删除用户
  function deleteuse(key: number) {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  }

  return (
    <div className="w-full">
      <IntroductionInfo
        message="Display all information.You can maintain user information and assign roles."
        title="Users"
      />
      {/* 左边 */}
      <div className="flex">
        <div className="w-[250px] h-[440px] flex flex-col justify-items-center items-center bg-white mt-4 rounded-md mr-3 overflow-scroll">
          <Input className="w-5/6 mt-2" placeholder="search..." />
          <DirectoryTree
            className="mt-2 h-full"
            multiple
            defaultExpandAll
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
                <Button className="mr-1 mt-1" type="primary" onClick={addData}>
                  +Add
                </Button>
                <OperateModal
                  title="Add User"
                  open={addmodalOpen}
                  onOk={() => onOk()}
                  onCancel={() => setaddModalOpen(false)}
                >
                  <Form style={{ maxWidth: 600 }} form={form} >
                    <Form.Item name="username" label="UserName*">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="name" label="Name">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="number" label="Number">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="team" label="Team*">
                      <Select
                        style={{ width: 120 }}
                        defaultValue="team1"
                        allowClear
                        options={[
                          { value: 'team1', label: 'team1' },
                          { value: 'team2', label: 'team2' },
                        ]}
                        placeholder="select it"
                      />
                    </Form.Item>
                    <Form.Item name="role">
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment">
                      <TextArea
                        placeholder="textarea with clear icon"
                        allowClear
                      />
                    </Form.Item>
                  </Form>
                </OperateModal>
                <OperateModal
                  title="edite"
                  open={editmodelOpen}
                  onOk={() => oneditOk(editkey)}
                  onCancel={() => oneditCancel()}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item name="username" label="UserName*">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="name" label="Name">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="number" label="Number">
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="team" label="Team*">
                      <Select
                        style={{ width: 120 }}
                        defaultValue="team1"
                        allowClear
                        options={[
                          { value: 'team1', label: 'team1' },
                          { value: 'team2', label: 'team2' },
                        ]}
                        placeholder="select it"
                      />
                    </Form.Item>
                    <Form.Item name="role">
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment">
                      <TextArea
                        placeholder="textarea with clear icon"
                        allowClear
                      />
                    </Form.Item>
                  </Form>
                </OperateModal>
                {/* 批量修改角色 */}
                <Button className="mr-1 mt-1" onClick={modifyRole}>
                  Modify Role
                </Button>
                <OperateModal
                  open={modalVisible}
                  onOk={handleModalOpen}
                  onCancel={handleModalClose}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item>
                      <p>Selected users:</p>
                      <span className="text-[#1890ff]">{username}</span>
                    </Form.Item>
                    <Form.Item name="role">
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment">
                      <TextArea
                        placeholder="textarea with clear icon"
                        allowClear
                      />
                    </Form.Item>
                  </Form>
                </OperateModal>
                {/* 批量删除 */}
                <Button
                  className="mr-1 mt-1"
                  onClick={() => {
                    setModifyRoleOpen(true);
                  }}
                >
                  Modify Delete
                </Button>
                <OperateModal
                  open={modifyRoleOpen}
                  title={
                    <>
                      <p className="font-[20px] mt-[16px] ml-[50px] text-center">
                        Confirm deletion of the selected users?
                      </p>
                    </>
                  }
                  footer={null}
                  closeIcon={null}
                >
                  <Button
                    className="mt-[20px] ml-[150px]"
                    type="default"
                    onClick={cancel}
                  >
                    Cancle
                  </Button>
                  <Button className="ml-4" type="primary" onClick={confirm}>
                    Confirm
                  </Button>
                </OperateModal>
              </div>
            </div>
          </div>
          <div className="w-full h-fit">
            <Flex gap="middle" vertical>
              <Table<DataType>
                size={'middle'}
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
              />
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
