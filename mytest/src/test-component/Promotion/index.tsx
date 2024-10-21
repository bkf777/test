import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Select, Tabs, TabsProps } from 'antd';
import React, { Suspense, useMemo, useState } from 'react';
import { useUpdate } from 'ahooks';
import styles from './index.less';

const { Sider, Content } = Layout;
export const PromotionContext = React.createContext<{
  activeMenu: string;
  marketing_goal?: string;
  marketing_scene?: string;
  qc_adv_id?: number;
  update?: () => void;
}>({
  activeMenu: '1',
  marketing_goal: '1',
  marketing_scene: 'FEED'
});
const PromotionLayout: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('1');
  const [value, setValue] = useState('LIVE_PROM_GOODS');
  const update = useUpdate();

  const Component = useMemo(() => {
    const DataPreview = React.lazy(() => import('./DataPreview'));
    switch (activeMenu) {
      case '1':
        return DataPreview;
      case '2':
        return DataPreview;
      case '3':
        return DataPreview;
      case '4':
        return DataPreview;
      default:
        return () => <></>;
    }
  }, [activeMenu]);

  return (
    <Layout className={styles['promotion-layout']}>
      <Sider trigger={null} collapsible theme='light'>
        <Select
          defaultValue='1'
          style={{ width: '90%', margin: '20px 5%' }}
          options={[
            {
              label: '推直播间',
              value: 'LIVE_PROM_GOODS'
            },
            {
              label: '推商品',
              value: 'VIDEO_PROM_GOODS'
            }
          ]}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
        />
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '数据概览'
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '日常销售'
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '新客转化'
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: '新品起量'
            }
          ]}
          onClick={(item) => {
            setActiveMenu(item.key);
          }}
        />
      </Sider>
      <Layout className='site-layout'>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <PromotionContext.Provider
            value={{ activeMenu, marketing_goal: value }}
          >
            <Suspense fallback={<div>Loading...</div>}>{React.createElement(Component)}</Suspense>
          </PromotionContext.Provider>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PromotionLayout;
