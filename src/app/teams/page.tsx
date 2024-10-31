'use client';
import React, { useState, useContext, useMemo } from 'react';
import { Button, Input, Space, Tree, Table } from 'antd';
import 'antd/dist/reset.css';
import IntroductionInfo from '@/components/introduction-info';
import OperateModal from '@/components/operate-modal';
import teamsStyle from './index.module.less';
import { HolderOutlined } from '@ant-design/icons';
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

//接口
interface DataType {
  key: string;
  name: string;
  actions: string[];

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

  //数据

  const columns: TableColumnsType<DataType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: 'Name', dataIndex: 'name', width: 500 },
    {
      title: 'Actions', dataIndex: 'actions', width: 100, render: (arr: string[]) => <Space size="middle"> <Button color="primary" variant="text">
        {arr[0]}
      </Button> <Button color="primary" variant="text">
        {arr[1]}
      </Button> <Button color="primary" variant="text">
        {arr[2]}
      </Button></Space>
    }
  ];

  const initialData: DataType[] = [
    { key: '1', name: 'Head Office', actions: ['Add Sub-Teams', 'Rename', 'Delete'] },
    { key: '2', name: 'A Team', actions: ['Add Sub-Teams', 'Rename', 'Delete'] },
    { key: '3', name: 'B Team', actions: ['Add Sub-Teams', 'Rename', 'Delete'] },
  ];
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);

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

  return (
    <div className={`${teamsStyle.height}`} >
      <IntroductionInfo title="Teams" message="You can manage user organizations, including adding and adjusting the organizational structure." />
      <div className='w-full h-[30px] mt-[12px] mb-[12px]'><Input className='w-[150px]' placeholder="Search..." size='small' /></div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
          <Table<DataType>
            rowKey="key"
            pagination={false}
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Teams;