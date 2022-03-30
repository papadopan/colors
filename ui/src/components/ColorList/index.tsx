import React, { useCallback, useState } from 'react';

import { Row, Grid, Spin, Typography, Empty } from 'antd';

import DeleteModal from './DeleteModal';
import ColorCard from './ColorCard';
import { useQuery } from '@apollo/client';
import { getAllColors } from '../../queries/queries';
const { useBreakpoint } = Grid;

interface ColorBase {
  name: string;
  hex: string;
}
interface Color extends ColorBase {
  id: number;
}
interface ColorData {
  colors: Color[];
}
const ColorList = () => {
  const screens = useBreakpoint();

  const [visible, setVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ColorBase | null>(null);
  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onOpen = useCallback(
    (item: ColorBase) => {
      setVisible(true);
      setItemToDelete(item);
    },
    [setVisible]
  );
  const { loading, error, data } = useQuery<ColorData, ''>(getAllColors);

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
          <Empty description="Let's add some" />
        </Row>
      ) : (
        colors?.map((item) => (
          <ColorCard item={item} key={item.name} onOpen={onOpen} />
        ))
      )}
    </Row>
  );
};

export default ColorList;
