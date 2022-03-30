import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Spin, Typography, Grid } from 'antd';
import { useQuery } from '@apollo/client';
import { getAllColors } from '../../queries/queries';
const { useBreakpoint } = Grid;
interface Color {
  id: number;
  name: string;
  hex: string;
}
interface ColorData {
  colors: Color[];
}
const ColorList = () => {
  const screens = useBreakpoint();
  const { loading, error, data } = useQuery<ColorData, ''>(getAllColors);

  if (loading) return <Spin />;

  if (error) return <Typography.Text>{error.message}</Typography.Text>;

  let colors = data?.colors;
  return (
    <Row gutter={[16, 16]} justify={!screens.md ? 'center' : undefined}>
      {colors?.map((item) => (
        <Col xs={22} sm={18} md={12} lg={4}>
          <Card>{item.name}</Card>
        </Col>
      ))}
    </Row>
  );
};

ColorList.propTypes = {};

export default ColorList;
