import React from 'react';
import WithTab from '../component/WithTab';
import { Col, Row, Space, Tabs } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Styles from '../index.less';
import DataPreviewTable from '../component/WithTab/component/DataPreviewTable';
const DataPreview: React.FC<any> = ( {value}) => {
  const data = [
    {
      title: '账户余额（元）',
      dataIndex: 'accountBalance',
      value: '0.00'
    },
    {
      title: '消耗（元）',
      dataIndex: 'consumption',
      value: '0.00'
    },
    {
      title: '展示次数',
      dataIndex: 'showCount',
      value: 0
    },
    {
      title: '点击次数',
      dataIndex: 'clickCount',
      value: 0
    },
    {
      title: '点击率',
      dataIndex: 'clickRate ',
      value: 0
    },
    {
      title: '平均千次展现费用',
      dataIndex: 'advSpend',
      value: 0
    },
    {
      title: '7日总支付ROI',
      dataIndex: 'clickCount',
      value: 0
    },
    {
      title: '7日成交订单',
      dataIndex: 'clickCount',
      value: 0
    },
    {
      title: '7日成交进而',
      dataIndex: 'clickCount',
      value: 0
    }
  ];

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/*轮播图*/}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div>
          <LeftOutlined />
        </div>

        <Row
          style={{
            overflow: 'hidden',
            flexWrap: 'nowrap',
            width: '100%',
            marginLeft: 0,
            marginRight: 0,
            gap: 10
          }}
        >
          {data.map(({ title, value }) => {
            return (
              <Col span={3} key={title} style={{ height: 50, border: '1px solid black', flex: 1 }}>
                <div>{title}</div>
                <div>{value}</div>
              </Col>
            );
          })}
        </Row>
        <div>
          <RightOutlined />
        </div>
      </div>
      {/*数据概览*/}
      <div>
        <Tabs
          className={Styles['data-preview-tabs']}
          items={[
            {
              key: '1',
              label: '计划'
            }
          ].map((item) => ({
            ...item,
            children: <DataPreviewTable cols={data} value={value} />
          }))}
        />
      </div>
    </Space>
  );
};

const Preview = () => {
  return (
    <WithTab
      tabs={(value)=>[
        {
          key: 'FEED',
          label: '通投广告'
        },
        {
          key: 'SEARCH',
          label: '搜索广告'
        },
        {
          key: 'SHOPPING_MALL',
          label: '商城广告'
        }
      ].map((item) => ({
        ...item,
        children: <DataPreview value={value} />
      }))}
    />
  );
};
export default Preview;
