import React from 'react';
import { Row, Space, Typography } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  return (
    <Row>
      <Space style={{ verticalAlign: 'middle' }}>
        <BgColorsOutlined style={{ color: '#fff', fontSize: '20px' }} />
        <Typography.Title level={5} style={{ color: '#fff' }}>
          Color App
        </Typography.Title>
      </Space>
    </Row>
  );
};

export default Header;
