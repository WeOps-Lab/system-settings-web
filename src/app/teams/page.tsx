'use client';
import React, { useState, useContext, useMemo } from 'react';
import { Button, Input, Form } from 'antd';
import 'antd/dist/reset.css';
import IntroductionInfo from '@/components/introduction-info';
import OperateModal from '@/components/operate-modal';
import teamsStyle from './index.module.less';
import { CaretDownOutlined, CaretRightOutlined, HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CustomTable from '@/components/custom-table';
import { useTranslation } from '@/utils/i18n';
//接口
interface DataType {
  key: string;
  name: string;
  children?: DataType[];

}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}


const Teams = () => {
  //hook函数
  const RowContext = React.createContext<RowContextProps>({});
  const Row: React.FC<RowProps> = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: props['data-row-key'] });

    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    const contextValue = useMemo<RowContextProps>(
      () => ({ setActivatorNodeRef, listeners }),
      [setActivatorNodeRef, listeners],
    );

    return (
      <RowContext.Provider value={contextValue}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} />
      </RowContext.Provider>
    );
  };

  const [addSubteammodalOpen, setAddSubteammodalOpen] = useState(false);
  const [renameteammodalOpen, setRenameteammodalOpen] = useState(false);
  const [renamekey, setRenamekey] = useState('1');
  const [form] = Form.useForm();
  const [addsubteamkey, setAddsubteamkey] = useState('1');

  const { t } = useTranslation();
  const commonItems = {
    search: t('common.search'),
    cancel: t('common.cancel'),
    confirm: t('common.confirm')
  }

  const tableItem = {
    name: t('tableItem.name'),
    actions: t('tableItem.actions')
  }


  const teamItem = {
    addsubteams: t('teamItem.addsubteams'),
    rename: t('teamItem.rename'),
    delete: t('teamItem.delete'),
    teams: t('teamItem.teams'),
    teaminfo: t('teamItem.teaminfo'),

  }

  //数据
  const columns: any = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: tableItem.name, dataIndex: 'name', width: 500 },
    {
      title: tableItem.actions, dataIndex: 'actions', width: 250, render: (arr: string[], key: any) => <><Button className='mr-[8px]' type='link' onClick={() => { addsunteams(key) }}>
        {teamItem.addsubteams}
      </Button> <Button className='mr-[8px]' type='link' onClick={() => { renameteams(key) }}>
        {teamItem.rename}
      </Button> <Button className='mr-[8px]' type='link' onClick={() => { deleteteams(key) }}>
        {teamItem.delete}
      </Button>
      </>
    }
  ];

  const initialData: DataType[] = [
    {
      key: '1', name: 'Head Office',
      children: [{
        key: '2', name: 'A Team',
        children: [{ key: '3', name: 'A-A Team' }]
      },
      { key: '4', name: 'B Team', }]
    },
    { key: '5', name: 'Head' }
  ];
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);
  const [onlykeytable, setonlykeytable] = useState<string>('5');
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };
  // const allKeys = collectKeysRecursive(dataSource);

  //useEffect函数


  //普通函数
  const DragHandle: React.FC = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
      <Button
        type="text"
        size="small"
        icon={<HolderOutlined />}
        style={{ cursor: 'move' }}
        ref={setActivatorNodeRef}
        {...listeners}
      />
    );
  };




  const addNode = (treeData: DataType[], targetKey: string, newNode: DataType): DataType [] => {
    return treeData.map(node => {
      if (node.key === targetKey) {
        return {
          ...node,
          children: [...(node.children || []), newNode]
        };
      } else if (node.children) {
        return {
          ...node,
          children: addNode(node.children, targetKey, newNode)
        };
      }
      return node;
    });
  };

  function onOkaddSubteam() {
    const newData = addNode(dataSource, addsubteamkey, { key: onlykeytable, name: form.getFieldValue('teamname')})
    setDataSource(newData);
    const newkey = Number(onlykeytable) + 1;
    setonlykeytable(newkey.toString())
    setAddSubteammodalOpen(false);
  }

  function addsunteams(key: { key: string }) {
    setAddSubteammodalOpen(true);
    setAddsubteamkey(key.key);
    form.resetFields();
  }


  const renameNode = (treeData: DataType[], targetKey: string, renameTeam: string): DataType [] => {
    return treeData.map(node => {
      if (node.key === targetKey) {
        return {
          ...node,
          name: renameTeam
        };
      } else if (node.children) {
        return {
          ...node,
          children: renameNode(node.children, targetKey, renameTeam)
        };
      }
      return node;
    });
  };

  const findNode = (treeData: DataType[], targetKey: string): DataType [] => {
    return treeData.map(node => {
      if (node.key === targetKey) {
        form.setFieldsValue({ renameteam: node.name })
      } else if (node.children) {
        return {
          ...node,
          children: findNode(node.children, targetKey)
        };
      }
      return node;
    });
  };

  function renameteams(key: { key: string }) {
    setRenameteammodalOpen(true);
    setRenamekey(key.key);
    form.resetFields();
    findNode(dataSource, key.key)
  }



  function onOkrenameteam() {
    const newData = renameNode(dataSource, renamekey, form.getFieldValue('renameteam'))
    setDataSource(newData)
    setRenameteammodalOpen(false);
  }

  const deleteNode = (treeData: DataType[], targetKey: string): DataType [] => {
    return treeData.filter(node => node.key !== targetKey).map(node => {
      if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, targetKey)
        };
      }
      return node;
    });
  };
  function deleteteams(key: { key: string }) {
    const newData = deleteNode(dataSource, key.key);
    setDataSource(newData)
  }

  // function collectKeysRecursive(tree: DataType[]) {
  //   const keys: [] = [];

  //   function traverse(node: DataType) {
  //     if (!node) return;
  //     keys.push(node.key); // 收集当前节点的key
  //     if (node.children && node.children.length > 0) {
  //       node.children.forEach((child: DataType) => traverse(child)); // 递归遍历子节点
  //     }
  //   }

  //   tree.forEach(rootNode => traverse(rootNode)); // 假设tree是一个包含根节点的数组
  //   return keys;
  // }


  return (
    <div className={`${teamsStyle.height}`} >
      <IntroductionInfo title={teamItem.teams} message={teamItem.teaminfo} />
      <div className='w-full h-[24px] mt-[19px] mb-[19px]'><Input className={`${teamsStyle.inputwidth}`} placeholder={`${commonItems.search}...`} size='small' /></div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={['1','2','3','4','5']} strategy={verticalListSortingStrategy}>
          <CustomTable
            rowKey="key"
            pagination={false}
            size="small"
            scroll={{ y: 'calc(100vh - 300px)', x: 'calc(100vw-100px)' }}
            components={{ body: { row: Row } }}
            columns={columns}
            expandable={{
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <CaretDownOutlined onClick={e => onExpand(record, e)} />
                ) : (
                  <CaretRightOutlined onClick={e => onExpand(record, e)} />
                ),
              indentSize: 22,
            }}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
      <OperateModal
        title={'Add Sub-team'}
        closable={false}
        okText={commonItems.confirm}
        cancelText={commonItems.cancel}
        open={addSubteammodalOpen}
        onOk={() => onOkaddSubteam()}
        onCancel={() => setAddSubteammodalOpen(false)}
      >
        <Form style={{ maxWidth: 600 }} form={form}>
          <Form.Item name="teamname" label={`${'Name'}*`} colon={false}>
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </OperateModal>
      <OperateModal
        title={'Rename'}
        closable={false}
        okText={commonItems.confirm}
        cancelText={commonItems.cancel}
        open={renameteammodalOpen}
        onOk={() => onOkrenameteam()}
        onCancel={() => setRenameteammodalOpen(false)}
      >
        <Form style={{ maxWidth: 600 }} form={form}>
          <Form.Item name="renameteam" label={`${'Name'}*`} colon={false}>
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </OperateModal>
    </div>
  );
};

export default Teams;