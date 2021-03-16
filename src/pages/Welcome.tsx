import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import request from '@/utils/request';

const Welcome = () => {
  const [txt, setTxt] = useState('');

  const test = async () => {
    const { data = 'default' } = await request('/api/');
    setTxt(data);
  };

  useEffect(() => {
    test();
  }, []);
  return <PageContainer>{txt}</PageContainer>;
};

export default Welcome;
