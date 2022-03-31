import React, { useCallback, useState } from 'react';

import { Row, Grid, Spin, Typography, Empty } from 'antd';
import { Color, ColorData } from '../../types';
import DeleteModal from './DeleteModal';
import ColorCard from './ColorCard';
import { useQuery } from '@apollo/client';
import { getAllColors } from '../../queries/queries';
const { useBreakpoint } = Grid;

interface ColorDataResponse {
  colors: ColorData[];
}
const ColorList = () => {
  const screens = useBreakpoint();

  const [visible, setVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Color | null>(null);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onOpen = useCallback((item: Color) => {
    setVisible(true);
    setItemToDelete(item);
  }, []);
  const { loading, error, data } = useQuery<ColorDataResponse, void>(
    getAllColors
  );

  if (loading) return <Spin />;

  if (error) return <Typography.Text>{error.message}</Typography.Text>;

  if (!data) return <div>no data</div>;

  let colors = data.colors;

  return (
    <Row gutter={[16, 16]} justify={!screens.md ? 'center' : undefined}>
      {itemToDelete && (
        <DeleteModal
          visible={visible}
          itemToDelete={itemToDelete}
          onClose={onClose}
        />
      )}
      {colors.length === 0 ? (
        <Row style={{ width: '100%' }} justify="center">
          <Empty description="Let's add some colors" />
        </Row>
      ) : (
        colors.map((item) => (
          <ColorCard item={item} key={item.name} onOpen={onOpen} />
        ))
      )}
    </Row>
  );
};

export default ColorList;
