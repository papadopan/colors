import React from 'react'
import PropTypes from 'prop-types'
import { Row, Space, Typography } from 'antd'
import { BgColorsOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <Row>
      <Space style={{verticalAlign:"middle"}}>
       <BgColorsOutlined style={{color:"#fff", fontSize:"20px"}}/>
       <Typography.Title level={5} style={{color:"#fff"}}>Color App</Typography.Title>
      </Space>
      </Row>
  )
}

Header.propTypes = {}

export default Header