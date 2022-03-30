import React from 'react';
import PropTypes from 'prop-types';
import AddColor from '../AddColor';
import ColorList from '../ColorList';
import { getAllColors } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import { Spin, Typography } from 'antd';
interface Color {
  id: number;
  name: string;
  hex: string;
}
interface ColorData {
  colors: Color[];
}
const Content = () => {
  const { loading, error, data } = useQuery<ColorData, ''>(getAllColors);

  if (loading) return <Spin />;

  if (error) return <Typography.Text>{error.message}</Typography.Text>;

  if (!data) return <div>no data</div>;

  let colors = data.colors;
  return (
    <div>
      <AddColor />
      <ColorList colors={colors} />
    </div>
  );
};

Content.propTypes = {};

export default Content;
