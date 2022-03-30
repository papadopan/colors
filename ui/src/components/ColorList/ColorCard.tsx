import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { UPDATE_COLOR } from '../../mutations';
import { getAllColors } from '../../queries/queries';
interface Props {
  item: ColorItem;
  onOpen: (item: ColorItem) => void;
}

interface ColorItem {
  name: string;
  hex: string;
}

const ColorCard: React.FC<Props> = ({ item, onOpen }) => {
  const [updateColor, { data, error, loading }] = useMutation(UPDATE_COLOR, {
    refetchQueries: [getAllColors],
  });

  return (
    <Col xs={22} sm={18} md={12} lg={4}>
      <Card
        title={item.name}
        extra={
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onOpen(item)}
          />
        }
      >
        <Space>
          <div
            style={{
              height: '20px',
              width: '20px',
              background: item.hex,
              borderRadius: '50%',
              border: item.hex === '#fff' ? '1px solid black' : undefined,
            }}
          />

          <Typography.Text
            editable={{
              onChange: (val) =>
                updateColor({
                  variables: {
                    name: item.name,
                    hex: val,
                  },
                }),
            }}
          >
            {item.hex}
          </Typography.Text>
        </Space>
      </Card>
    </Col>
  );
};

ColorCard.propTypes = {};

export default React.memo(ColorCard);
