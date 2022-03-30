import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Grid, Spin, Typography } from 'antd';

import DeleteModal from './DeleteModal';
import ColorCard from './ColorCard';
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

  const [visible, setVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ name: '', hex: '' });
  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onOpen = useCallback(
    (item) => {
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
      <DeleteModal
        visible={visible}
        itemToDelete={itemToDelete}
        onClose={onClose}
      />

      {colors?.map((item) => (
        <ColorCard item={item} key={item.name} onOpen={onOpen} />
      ))}
    </Row>
  );
};

ColorList.propTypes = {};

export default ColorList;
