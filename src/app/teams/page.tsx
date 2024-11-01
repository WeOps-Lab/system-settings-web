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
import type { TableColumnsType } from 'antd';
import CustomTable from '@/components/custom-table';

//接口
interface DataType {
  key: string;
  name: string;
  actions: string[];
  children?: DataType[];
  description?: DataType[];

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
  const [renamekey, setrenamekey] = useState<{ key: string }>()
  const [form] = Form.useForm();

  //数据

  const columns: any = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: 'Name', dataIndex: 'name', width: 500 },
    {
      title: 'Actions', dataIndex: 'actions', width: 250, render: (arr: string[], key:any) => <><Button type='link' onClick={() => { addsunteams() }}>
        {arr[0]}
      </Button> <Button type='link' onClick={() => { renameteams(key) }}>
        {arr[1]}
      </Button> <Button type='link' onClick={() => { deleteteams(key) }}>
        {arr[2]}
      </Button></>
    }
  ];

  const initialData: DataType[] = [
    { key: '1', name: 'Head Office', actions: ['Add Sub-Teams', 'Rename', 'Delete'], description: [{ key: '1-1', name: 'Head Office', actions: ['Add Sub-Teams', 'Rename', 'Delete'], description: [{ key: '1-1-1', name: 'Head Office', actions: ['Add Sub-Teams', 'Rename', 'Delete'] }] }] },
    { key: '2', name: 'A Team', actions: ['Add Sub-Teams', 'Rename', 'Delete'], description: [{ key: '2-1', name: 'Head Office', actions: ['Add Sub-Teams', 'Rename', 'Delete'], description: [{ key: '2-1', name: 'name1', actions: ['Add Sub-Teams', 'Rename', 'Delete'] }, { key: '2-2', name: 'name2', actions: ['Add Sub-Teams', 'Rename', 'Delete'] }] }] },
    { key: '3', name: 'B Team', actions: ['Add Sub-Teams', 'Rename', 'Delete'] },
  ];
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);
  const [onlykeytable, setonlykeytable] = useState<string>((dataSource.length + 1).toString())
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

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

  function onOkaddSubteam() {
    alert(onlykeytable)
    setDataSource([...dataSource, { key: onlykeytable.toString(), name: form.getFieldValue('teamname'), actions: ['Add Sub-Teams', 'Rename', 'Delete'] }])
    setonlykeytable(onlykeytable + 1)
    setAddSubteammodalOpen(false);
  }

  function addsunteams() {
    setAddSubteammodalOpen(true);
    form.resetFields();
  }


  function renameteams(key: { key: string }) {
    setRenameteammodalOpen(true);
    setrenamekey(key);

    form.resetFields();
    dataSource.map((item) => {
      if (item.key === key?.key) {
        form.setFieldsValue({ renameteam: item.name })
      }
    })
  }

  function onOkrenameteam() {
    const newData = dataSource.map((item) => {
      if (item.key === renamekey?.key) {
        item.name = form.getFieldValue('renameteam');
      }
      return item
    })
    setDataSource(newData)
    setRenameteammodalOpen(false);
  }


  function deleteteams(key: { key: string }) {
    const newData = dataSource.filter((item) => item.key !== key.key);
    setDataSource(newData)
  }

  return (
    <div className={`${teamsStyle.height}`} >
      <IntroductionInfo title="Teams" message="You can manage user organizations, including adding and adjusting the organizational structure." />
      <div className='w-full h-[24px] mt-[12px] mb-[12px]'><Input className={`${teamsStyle.inputwidth}`} placeholder="Search..." size='small' /></div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
          <CustomTable
            rowKey="key"
            pagination={false}
            size="small"
            components={{ body: { row: Row } }}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => <>
                {record.description && record.description.length > 0 && (
                  <CustomTable
                    rowKey="key"
                    showHeader={false}
                    pagination={false}
                    components={{ body: { row: Row } }}
                    columns={columns}
                    dataSource={record.description}
                  />
                )}
              </>,
              rowExpandable: () => { return true },
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <CaretDownOutlined onClick={e => onExpand(record, e)} />
                ) : (
                  <CaretRightOutlined onClick={e => onExpand(record, e)} />
                ),
              indentSize: 16,
            }}

            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
      <OperateModal
        title={'Add Sub-team'}
        closable={false}
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