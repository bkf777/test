import { Layout, Space, DatePicker } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Tabs, { TabsProps } from 'antd/lib/tabs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { PromotionContext } from '../..';
import { useUpdate } from 'ahooks';
import ChooseAdsAccount from './component/chooseAdsGroup';
import { use } from 'echarts/types/src/extension.js';
import { set } from 'lodash';
const { RangePicker } = DatePicker;

export default function WithTab({
  tabs= ()=> [],
  date
}: {
  tabs: (value:number)=>any[];
  date?: string;
}) {
  const [activeTab, setActiveTab] = useState('FEED');
  const [adsAccount, setAdsAccount] = useState<number>();
  const context = React.useContext(PromotionContext);
  const update = useUpdate();

  useEffect(() => {
    if (adsAccount) {
      console.log(adsAccount, 'adsAccount');
      context.qc_adv_id = adsAccount;
    
    }
  }, [adsAccount]);

  useEffect(() => {

    context.marketing_scene = activeTab;


  }, [activeTab]);

  useEffect(() => {
    console.log(context, 'context date');
 
  }, [context]);

  return (
    <Layout
      style={{
        background: '#fff'
      }}
    >
      <Header>
        <div
          style={{
            position: 'relative'
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
            }}
            items={tabs(adsAccount)}
          />
          <Space
            style={{
              position: 'absolute',
              top: 0,
              right: 0
            }}
          >
            <span>数据跟新于{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>
            <RangePicker format='YYYY-MM-DD HH:mm:ss' />
            <ChooseAdsAccount
              firstRecordBeValue
              onChange={(value) => {
                console.log(value, 'value');
                setAdsAccount(value);
              }}
            />
          </Space>
        </div>
      </Header>
    </Layout>
  );
}
