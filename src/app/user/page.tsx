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
import userInfoStyle from './index.module.less';
import { useTranslation } from '@/utils/i18n';



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
  const [tabledata, setTableData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //控制Modal的打开和关闭
  const [addmodalOpen, setAddModalOpen] = useState(false);
  //编辑的Modal的打开和关闭
  const [editmodelOpen, setEditmodalOpen] = useState(false);
  //控制修改角色的弹窗
  const [modalVisible, setModalVisible] = useState(false);
  //主要控制选中的用户名
  const [username, setUsername] = useState(['zhangsan']);
  const [modifyRoleOpen, setModifyRoleOpen] = useState<boolean>(false);
  const [editkey, setEditkey] = useState(1);
  const [edituseName, setEdituseName] = useState<string>('');
  //表单的数据初始化
  const [form] = Form.useForm();
  const [onlykeytable, setOnlykeytable] = useState<number>(tabledata.length);
  const modifydeleteuseref = useRef<HTMLButtonElement>(null);
  const modifyroleuseref = useRef<HTMLButtonElement>(null);


  const { t } = useTranslation();
  const tableItems =
  {
    username: t('tableItem.username'),
    name: t('tableItem.name'),
    email: t('tableItem.email'),
    number: t('tableItem.number'),
    team: t('tableItem.team'),
    role: t('tableItem.role'),
    actions: t('tableItem.actions'),
    administrator: t('tableItem.administrator'),
    normalusers: t('tableItem.normalusers'),

  }



  const commonItems = {
    delete: t('common.delete'),
    search: t('common.search'),
    add: t('common.add'),
    cancel: t('common.cancel'),
    confirm: t('common.confirm'),
    edit: t('common.edit'),
    modifyrole: t('common.modifyrole'),
    modifydelete: t('common.modifydelete'),
    addNew: t('common.addNew')

  }

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
      title: tableItems.username,
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
    { title: tableItems.name, dataIndex: 'name' },
    { title: tableItems.email, dataIndex: 'email' },
    { title: tableItems.number, dataIndex: 'number' },
    { title: tableItems.team, dataIndex: 'team' },
    {
      title: tableItems.role,
      dataIndex: 'role',
      render: (text) => {
        const color = text === 'Administrator' ? 'green' : 'processing';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: tableItems.actions,

      dataIndex: 'key',
      render: (key) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                editeuser(key);
              }}
              color="primary"
              variant="link"
            >
              {commonItems.edit}
            </Button>
            <Button
              onClick={() => {
                deleteuse(key);
              }}
              color="primary"
              variant="link"
            >
              {commonItems.delete}

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
    { label: tableItems.administrator, value: 'Administrator' },
    { label: tableItems.normalusers, value: 'Normal users' },
  ];

  //useEffect函数

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ role: `Administrator` });
  }, []);

  useEffect(() => {
    selectedRowKeys.length === 0
      ? modifydeleteuseref.current?.setAttribute('disabled', 'true')
      : modifydeleteuseref.current?.removeAttribute('disabled');
    selectedRowKeys.length === 0
      ? modifyroleuseref.current?.setAttribute('disabled', 'true')
      : modifyroleuseref.current?.removeAttribute('disabled');
  }, [selectedRowKeys.length]);

  const init = () => {
    setTableData(dataSource);
    setOnlykeytable(dataSource.length);
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
    setAddModalOpen(true);
    form.resetFields();
    form.setFieldsValue({ role: 'Administrator', team: 'Team A' });
  };

  function onOk() {
    //点击确定按钮，将数据添加到表格中
    setTableData([...tabledata, { ...form.getFieldsValue(), key: onlykeytable }]);
    setOnlykeytable(onlykeytable + 1);
    setAddModalOpen(false);
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
    setTableData(newData);
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
    setTableData(newData);
    setModifyRoleOpen(false);
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
    setModifyRoleOpen(false);
  };
  //编辑用户
  function editeuser(key: number) {
    setEditkey(key);
    setEditmodalOpen(true);
    form.resetFields();
    const [editfinishdata] = tabledata.filter((item) => item.key === key);
    form.setFieldsValue({ ...editfinishdata });
    setEdituseName(editfinishdata.username);
  }
  //点击确定按钮，将修改数据添加到表格中
  function oneditOk() {
    const newarr: DataType[] = tabledata.map((item) => {
      //添加key值
      return item.key === editkey
        ? { ...form.getFieldsValue(), key: editkey }
        : item;
    });
    setTableData(newarr);
    setEditmodalOpen(false);
    setSelectedRowKeys([]);
  }

  function oneditCancel() {
    setEditmodalOpen(false);
  }
  //删除用户
  function deleteuse(key: number) {
    const newData = tabledata.filter((item) => item.key !== key);
    setTableData(newData);
  }

  return (
    <div className={`${userInfoStyle.userInfo} ${userInfoStyle.bgHeight}`}>
      <IntroductionInfo
        message="Display all information.You can maintain user information and assign roles."
        title="Users"
      />
      {/* 左边 */}
      <div className={`flex overflow-hidden`} style={{ height: 'calc(100vh-141px)' }}>
        <div className="w-[250px] flex-shrink-0 flex flex-col justify-items-center items-center r-bg-color mt-4 rounded-md mr-3">
          <Input className="w-5/6 mt-2" placeholder={`${commonItems.search}...`} />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#E6F4FF',
              },
            }}
          >
            <DirectoryTree
              className="w-[230px] h-[320px] mt-2 overflow-auto"
              multiple
              showIcon={false}
              defaultExpandAll
              treeData={treeData}
            />
          </ConfigProvider>
        </div>
        {/* 右边 */}
        <div className="ml-auto mt-4 flex-1" style={{ height: 'calc(100vh-181px)', width: 'calc(100vw-278px)' }}>
          <div className="w-full h-11 mb-2">
            <div className="flex justify-between">
              <div className="w-[200px] h-[40px]">
                <Input className="h-6 mt-2" placeholder={`${commonItems.search}...`} />
              </div>
              <div className="flex">
                <Button className="mr-1 mt-1" type="primary" onClick={addData}>
                  +{commonItems.add}
                </Button>
                <OperateModal
                  title={commonItems.addNew}
                  closable={false}
                  open={addmodalOpen}
                  okText={commonItems.confirm}
                  cancelText={commonItems.cancel}
                  onOk={() => onOk()}
                  onCancel={() => setAddModalOpen(false)}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item name="username" label={`${tableItems.username}*`} colon={false}>
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[30px]"
                      name="name"
                      label={`${tableItems.name}`}
                      colon={false}
                    >
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[30px]"
                      name="email"
                      label={`${tableItems.email}`}
                      colon={false}
                    >
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[12px]"
                      name="number"
                      label={`${tableItems.number}`}
                      colon={false}
                    >
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[27px]"
                      name="team"
                      label={`${tableItems.team}*`}
                      colon={false}
                    >
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
                      <Tag className="ml-[50px]">
                        The administrator supports organization and member
                        management in the
                        <br />
                        background, or configuration in the backend management
                        of other <br />
                        modules, to ensure regular user operation.
                      </Tag>
                    </Form.Item>
                  </Form>
                </OperateModal>
                <OperateModal
                  closable={false}
                  title={`Edite-${edituseName}`}
                  open={editmodelOpen}
                  okText={commonItems.confirm}
                  cancelText={commonItems.cancel}
                  onOk={() => oneditOk()}
                  onCancel={() => oneditCancel()}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item name="username" label={`${tableItems.username}*`} colon={false}>
                      <Tag className="w-[400px] h-[34px] pt-1">
                        {edituseName}
                      </Tag>
                    </Form.Item>
                    <Form.Item
                      className="ml-[30px]"
                      name="name"
                      label={`${tableItems.name}`}
                      colon={false}
                    >
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[30px]"
                      name="email"
                      label={`${tableItems.email}`}
                      colon={false}
                    >
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[15px]"
                      name="number"
                      label={`${tableItems.number}`}
                      colon={false}
                    >
                      <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                      className="ml-[25px]"
                      name="team"
                      label={`${tableItems.team}*`}
                      colon={false}
                    >
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
                      <Tag className="ml-[50px]">
                        The administrator supports organization and member
                        management in the <br />
                        background, or configuration in the backend management
                        of other <br />
                        modules, to ensure regular user operation.
                      </Tag>
                    </Form.Item>
                  </Form>
                </OperateModal>
                {/* 批量修改角色 */}
                <Button
                  ref={modifyroleuseref}
                  className="mr-1 mt-1 op-8"
                  onClick={modifyRole}
                >
                  {commonItems.modifyrole}
                </Button>
                <OperateModal
                  title="Batch Modify Roles"
                  closable={false}
                  open={modalVisible}
                  okText={commonItems.confirm}
                  cancelText={commonItems.cancel}
                  onOk={handleModalOpen}
                  onCancel={handleModalClose}
                >
                  <Form style={{ maxWidth: 600 }} form={form}>
                    <Form.Item className="ml-[50px]" colon={false}>
                      <span>Selected users:</span>
                      <span className="text-[#1890ff]">
                        {username.toString()}
                      </span>
                    </Form.Item>
                    <Form.Item name="role" colon={false}>
                      <Radio.Group block options={options} />
                    </Form.Item>
                    <Form.Item name="comment" colon={false}>
                      <Tag className="ml-[50px]">
                        The administrator role supports organization and member
                        management in
                        <br />
                        the background, or configuration in the backend
                        management of other
                        <br />
                        modules, to ensure normal user operation.
                      </Tag>
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
                  {commonItems.modifydelete}

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
                  okText={commonItems.confirm}
                  cancelText={commonItems.cancel}
                >
                  <Button
                    className="mt-[20px] ml-[150px]"
                    type="default"
                    onClick={cancel}
                  >
                    {commonItems.cancel}
                  </Button>
                  <Button className="ml-4" type="primary" onClick={confirm}>
                    {commonItems.confirm}
                  </Button>
                </OperateModal>
              </div>
            </div>
          </div>
          <div>
            <Flex gap="middle" vertical>
              <Table<DataType>
                size={'middle'}
                scroll={{ y: 'calc(100vh - 300px)', x: 'calc(100vw-250px)' }}
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