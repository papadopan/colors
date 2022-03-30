import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Spin, Typography, Grid, Space, Button } from 'antd';
import { useQuery } from '@apollo/client';
import { getAllColors } from '../../queries/queries';
import { DeleteOutlined } from '@ant-design/icons';
import DeleteModal from './DeleteModal';
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
  const [visible, setVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ name: '', hex: '' });

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  if (loading) return <Spin />;

  if (error) return <Typography.Text>{error.message}</Typography.Text>;

  let colors = data?.colors;

  return (
    <Row gutter={[16, 16]} justify={!screens.md ? 'center' : undefined}>
      <DeleteModal
        visible={visible}
        itemToDelete={itemToDelete}
        onClose={onClose}
      />

      {colors?.map((item) => (
        <Col xs={22} sm={18} md={12} lg={4}>
          <Card
            title={item.name}
            extra={
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                  setVisible(true);
                  setItemToDelete(item);
                }}
              />
            }
          >
            <Space>
              <div
                style={{
                  height: '10px',
                  width: '10px',
                  background: item.hex,
                  borderRadius: '50%',
                  border: item.hex === '#fff' ? '1px solid black' : undefined,
                }}
              />
              {item.name}
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

ColorList.propTypes = {};

export default ColorList;
