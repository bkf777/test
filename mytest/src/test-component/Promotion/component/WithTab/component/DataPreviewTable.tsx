import { Button, Divider, Input, Select, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo } from 'react';
import Styles from '../../../index.less';

import { CloseOutlined } from '@ant-design/icons';
// import { useHistory } from 'umi';
import { useSetState, useRequest, useWhyDidYouUpdate, useUpdate } from 'ahooks';
import { map } from 'lodash';
import { PromotionContext } from '../../..';
import _ from 'lodash';

interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string;
  phone: number;
  address: string;
}

type DataPreviewTableProps = {
  cols: Array<{
    title: string;
    dataIndex: string;
  }>;
};

const sharedOnCell = (_: DataType, index?: number) => {
  if (index === 0) {
    return { colSpan: 0 };
  }

  return {};
};

const App: React.FC<DataPreviewTableProps> = ({ cols,value }) => {
  //保持全部选中且排除手动插入的total数据
  //在操作全选时应该排除第一行，使用selectedRowIds selectedRowKeys
  //TODO: 要处理选中的样式
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const selectedRowIds = useMemo(() => selectedRowKeys.filter((key) => !!key), [selectedRowKeys]);
  const context = React.useContext(PromotionContext);
  const { marketing_goal, marketing_scene } = _.cloneDeep(context);
  const [task_id, setTaskID] = React.useState<string>('');

 
  const [state, setState] = useSetState({
    page: 1,
    pageSize: 50
  });
  const { data } = useRequest(
    () => {
      return Promise.resolve({
        d: map(new Array(100), (_, index) => ({
          id: index,
          ad_name: `计划${index}`,
          openPromotion: index % 2 === 0,
          age: 32,
          status: '已启动',
          config: '直播间信息'
        }))
      });
    },
    {
      refreshDeps: [marketing_goal, marketing_scene, state.page, state.pageSize, value],
      ready: !!marketing_goal && !!marketing_scene && !!value
    }
  );
  const columns: ColumnsType<DataType> = useMemo(() => {
    const columns: ColumnsType<DataType> = [
      {
        title: '创意名称',
        dataIndex: 'ad_name',
        render: (text, _, index) => {
          if (index === 0) return `共${(data?.d ?? []).length - 1}条计划`;
          return <a>{text}</a>;
        },
        onCell: (_, index) => ({
          colSpan: (index as number) === 0 ? 6 : 1
        })
      },
      {
        title: ' ',
        dataIndex: 'openPromotion',
        onCell: sharedOnCell,
        render: (text, record) => <Switch />
      },
      {
        title: '操作',
        dataIndex: 'age',
        onCell: sharedOnCell
      },
      {
        title: '计划状态',
        dataIndex: 'status',
        onCell: sharedOnCell
      },
      {
        title: marketing_goal === '1' ? '直播间信息' : '商品信息',
        dataIndex: 'config',
        onCell: sharedOnCell,
        render: (text) => {
          return <></>;
        }
      }
    ];
    columns.push(...cols);

    return columns;
  }, [cols, data]);
  
  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { marketing_goal, marketing_scene, qc_adv_id:value });

  useEffect(() => {
    console.log(value, 'qc');
  }, [value]);

  const TableFilter = () => {
    return (
      <Space className={Styles['data-preview-table-filter']}>
        <Space>
          <Button
            type='primary'
            onClick={() => {
              history.push('/batchCreate');
            }}
          >
            新建计划
          </Button>
          <Input.Search
            placeholder='输入计划名称/ID后回车搜索'
            onSearch={(value) => {
              setTaskID(value);
            }}
          />
          <Select options={[]} placeholder='请筛选计划状态' />
          <Button>更多筛选</Button>
        </Space>
        <Button>自定义列</Button>
      </Space>
    );
  };

  const TableAction: React.FC = () => {
    return (
      <div className={Styles['data-preview-table-action']}>
        <Space split={<Divider type='vertical' />}>
          <span>已选{selectedRowKeys.length}个计划</span>
          <Space>
            <a>暂停</a>
            <a>启动</a>
            <a>删除</a>
          </Space>
          <Space>
            <a>修改行为兴趣</a>
            <a>修改达人定向</a>
            <a>修改创意标签</a>
          </Space>
        </Space>
        <CloseOutlined
          onClick={() => {
            setSelectedRowKeys([]);
          }}
        />
      </div>
    );
  };

  data?.d.unshift({});

  return (
    <div className={Styles['data-preview-table']}>
      {selectedRowKeys.length ? <TableAction /> : <TableFilter />}
      <Table
        columns={columns}
        dataSource={data?.d}
        bordered
        rowKey={(record) => record.id}
        pagination={{
          current: state.page,
          pageSize: state.pageSize,
          onChange: (page, pageSize) => {
            setState({
              page,
              pageSize
            });
          }
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          renderCell: (value, record, index, originNode) => {
            if (index === 0) return null;
            return originNode;
          }
        }}
      />
    </div>
  );
};

export default App;
