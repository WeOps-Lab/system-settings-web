'use client';
import React from 'react';
import { Input, Form, Radio, Select } from 'antd';
import { Tree } from 'antd';
import { Button, ConfigProvider } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { getRandomColor } from '@/utils/common';
import IntroductionInfo from '@/components/introduction-info';
import OperateModal from '@/components/operate-modal';
import { Flex, Table, Tag, Space } from 'antd';
import type { PopconfirmProps } from 'antd';
import type { TreeDataNode } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import userInfoStyle from './index.module.less'

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
  const [tabledata, settableData] = useState<DataType[]>([]);
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
  const [edituseName, setedituseName] = useState<string>('');
  //表单的数据初始化
  const [form] = Form.useForm();
  const [onlykeytable, setonlykeytable] = useState<number>(tabledata.length);
  const modifydeleteuseref = useRef<HTMLButtonElement>(null);
  const modifyroleuseref = useRef<HTMLButtonElement>(null);




  // 数据
  const { DirectoryTree } = Tree;
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
        const color = text === 'Administrator' ? 'green' : 'processing';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: (key) => {
        return (
          <Space size="middle">
            <Button onClick={() => { editeuser(key) }} color="primary" variant="link">
              edit
            </Button>
            <Button onClick={() => { deleteuse(key) }} color="primary" variant="link">
              delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const dataSource = Array.from<DataType>({ length: 4 }).map<DataType>(
    (_, index) => ({
      key: index,
      username: `username${index}`,
      name: `张三${index}`,
      email: `email${index}@gmail.com`,
      number: 'Administrator',
      team: 'Team A',
      role: 'Administrator',
    })
  );

  const options = [
    { label: 'Administrator', value: 'Administrator' },
    { label: 'Normal users', value: 'Normal users' },
  ];

  //useEffect函数

  useEffect(() => {
    init()
  }, []);

  useEffect(() => {
    form.setFieldsValue({ role: `Administrator` });
  }, []);

  useEffect(() => {
    selectedRowKeys.length === 0 ? modifydeleteuseref.current?.setAttribute('disabled', 'true') : modifydeleteuseref.current?.removeAttribute('disabled');
    selectedRowKeys.length === 0 ? modifyroleuseref.current?.setAttribute('disabled', 'true') : modifyroleuseref.current?.removeAttribute('disabled');
  }, [selectedRowKeys.length]);


  const init = () => {
    settableData(dataSource);
    setonlykeytable(dataSource.length);
  }
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
    form.setFieldsValue({ role: 'Administrator', team: 'Team A' });

  };

  function onOk() {
    //点击确定按钮，将数据添加到表格中
    settableData([...tabledata, { ...form.getFieldsValue(), key: onlykeytable }]);
    setonlykeytable(onlykeytable + 1);
    setaddModalOpen(false);
    setSelectedRowKeys([]);
  }

  //批量修改用户的权限
  function modifyRole() {
    //初始化数据
    setModalVisible(true);
    form.resetFields();
    form.setFieldsValue({ role: 'Administrator' });
    const arr = [...selectedRowKeys];
    //获取名字
    const newarr: string[] = [];
    arr.forEach((item) => {
      tabledata.find((itemname) => {
        if (itemname.key === item) {
          newarr.push(itemname.username);
        }
      });
    });
    setUsername(newarr);
  }
  // 点击确定按钮，将修改数据添加到表格中
  const handleModalOpen = () => {
    const newRole = form.getFieldsValue().role;
    const newData = tabledata.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        return { ...item, role: newRole };

      }
      return item;
    });
    settableData(newData);
    setModalVisible(false);
    setSelectedRowKeys([]);
  };
  // 关闭弹窗
  const handleModalClose = () => {
    setModalVisible(false);
  };
  //批量删除用户
  const confirm: PopconfirmProps['onConfirm'] = () => {
    const newData = tabledata.filter((item) => !selectedRowKeys.includes(item.key));
    settableData(newData);
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
    const [editfinishdata] = tabledata.filter((item) => item.key === key);
    form.setFieldsValue({ ...editfinishdata });
    setedituseName(editfinishdata.username);
  }
  //点击确定按钮，将修改数据添加到表格中
  function oneditOk() {
    const newarr: DataType[] = tabledata.map(item => {
      //添加key值
      return item.key === editkey ? { ...form.getFieldsValue(), key: editkey } : item;
    });
    settableData(newarr);
    seteditmodalOpen(false);
    setSelectedRowKeys([]);
  }

  function oneditCancel() {
    seteditmodalOpen(false);
  }
  //删除用户
  function deleteuse(key: number) {
    const newData = tabledata.filter((item) => item.key !== key);
    settableData(newData);
  }


  return (
    <div className={`w-full ${userInfoStyle.userInfo}`}>
      <IntroductionInfo
        message="Display all information.You can maintain user information and assign roles."
        title="Users"
      />
      {/* 左边 */}
      <div className="flex w-full">
        <div className="w-[250px] h-[440px] flex-shrink-0 flex flex-col justify-items-center items-center r-bg-color mt-4 rounded-md mr-3">
          <Input className="w-5/6 mt-2" placeholder="search..." />

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#E6F4FF',
              },
            }}
          >
            <DirectoryTree
              className="w-[230px] h-[380px] mt-2 overflow-auto"
              multiple
              showIcon={false}
              defaultExpandAll
              treeData={treeData}

            />
          </ConfigProvider>
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
                  closable={false}
                  open={addmodalOpen}
                  onOk={() => onOk()}
                  onCancel={() => setaddModalOpen(false)}
                >
                  <Form style={{ maxWidth: 600 }} form={form} >
                    <Form.Item name="username" label="UserName*" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[30px]' name="name" label="Name" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[30px]' name="email" label="Email" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[12px]' name="number" label="Number" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[27px]' name="team" label="Team*" colon={false}>
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
                    <Form.Item name="role" colon={false}>
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment" colon={false}>
                      <Tag className='ml-[50px]'>
                        The administrator supports organization and member management in the<br />
                        background, or configuration in the backend management of other     <br />
                        modules, to ensure regular user operation.
                      </Tag>
                    </Form.Item>
                  </Form>
                </OperateModal>
                <OperateModal
                  closable={false}
                  title={`Edite-${edituseName}`}
                  open={editmodelOpen}
                  onOk={() => oneditOk()}
                  onCancel={() => oneditCancel()}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item name="username" label="UserName*" colon={false}>
                      <Tag className='w-[400px] h-[34px] pt-1'>{edituseName}</Tag>
                    </Form.Item>
                    <Form.Item className='ml-[30px]' name="name" label="Name" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[30px]' name="email" label="Email" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[15px]' name="number" label="Number" colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item className='ml-[25px]' name="team" label="Team*" colon={false}>
                      <Select
                        style={{ width: 120 }}
                        defaultValue="team A"
                        allowClear
                        options={[
                          { value: 'team A', label: 'team A' },
                          { value: 'team B', label: 'team B' },
                        ]}
                        placeholder="select it"
                      />
                    </Form.Item>
                    <Form.Item name="role" colon={false}>
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment" colon={false}>
                      <Tag className='ml-[50px]'>
                        The administrator supports organization and member management in the <br />
                        background, or configuration in the backend management of other <br />
                        modules, to ensure regular user operation.</Tag>
                    </Form.Item>
                  </Form>
                </OperateModal>
                {/* 批量修改角色 */}
                <Button ref={modifyroleuseref} className='mr-1 mt-1 op-8' onClick={modifyRole}>
                  Modify Role
                </Button>
                <OperateModal
                  title='Batch Modify Roles'
                  closable={false}
                  open={modalVisible}
                  onOk={handleModalOpen}
                  onCancel={handleModalClose}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item className='ml-[50px]' colon={false}>
                      <span>Selected users:</span>
                      <span className="text-[#1890ff]">{username.toString()}</span>
                    </Form.Item>
                    <Form.Item name="role" colon={false}>
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment" colon={false}>
                      <Tag className='ml-[50px]'>
                        The administrator role supports organization and member management in<br />
                        the background, or configuration in the backend management of other<br />
                        modules, to ensure normal user operation.</Tag>
                    </Form.Item>
                  </Form>
                </OperateModal>
                {/* 批量删除 */}
                <Button
                  ref={modifydeleteuseref}
                  className="mr-1 mt-1 red"
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
          <div className="w-[960px] h-[350px]">
            <Flex gap="middle" vertical>
              <Table<DataType>
                size={'middle'}
                scroll={{ y: 'calc(100vh - 140px)' }}
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={tabledata}
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
