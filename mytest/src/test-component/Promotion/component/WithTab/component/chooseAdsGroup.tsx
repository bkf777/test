import { DownOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Input, Radio, Select, Space, Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { use } from 'echarts/types/src/extension.js';



type propsType = {
  value?: any;
  onChange?: (params: any) => void;
  onClick?: () => void;
  moreParams?: any;
  firstRecordBeValue?: boolean;
};

const ChooseAdsAccount = ({
  value,
  onChange,
  onClick,
  moreParams = {},
  firstRecordBeValue
}: propsType) => {
  const [adsAccountListVis, setAdsAccountListVis] = useState<boolean>(false);
  const [showValue, setShowValue] = useState<any>({});
  const [options, setOptions] = useState<any>([]);
  const [checkedAccountId, setCheckedAccountId] = useState<any>();
  const adsAccountRef = useRef(null);
  const [selectValue, setSelectValue] = useState<any>();

  const getList = (params = {}) => {
    Promise.resolve({
      f: 0,
      d: [
        {
          advertiser_id: 1,
          advertiser_name: '广告主1'
        },
        {
          advertiser_id: 2,
          advertiser_name: '广告主2'
        },
        {
          advertiser_id: 3,
          advertiser_name: '广告主3'
        }
      ]
    }).then((res: any) => {
      if (res?.f === 0) {
        setOptions(res?.d || []);
        
        const firstRecord = res?.d[0];
        if (firstRecordBeValue && firstRecord) {
          setSelectValue(firstRecord.advertiser_id);
        }
      }
    });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    
     onChange && onChange(selectValue);
    
  }, [selectValue]);


  return (
    <>
      <Select
        value={selectValue}
        onChange={(value) => {
          console.log(value, 'value in select');
          setSelectValue(value);
        }}
        style={{ width: '200px' }}
        options={options.map((item) => {
          return {
            label: item.advertiser_name,
            value: item.advertiser_id
          };
        })}
      />
    </>
  );
};

export default ChooseAdsAccount;
