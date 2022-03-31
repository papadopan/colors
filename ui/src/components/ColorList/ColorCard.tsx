import React, { useEffect } from 'react';
import { Button, Card, Col, Space, Typography, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { UPDATE_COLOR } from '../../mutations';
import { getAllColors } from '../../queries/queries';
import { Color } from '../../types';
interface Props {
  item: Color;
  onOpen: (item: Color) => void;
}

const ColorCard: React.FC<Props> = ({ item, onOpen }) => {
  const [updateColor, { data, error, reset }] = useMutation<Color, Color>(
    UPDATE_COLOR,
    {
      refetchQueries: [getAllColors],
    }
  );

  useEffect(() => {
    if (data) {
      notification.success({
        message: 'Color Updated',
      });
    }

    if (error) {
      notification.error({
        message: 'There was an issue please try again',
      });

      reset();
    }
  }, [data, error, reset]);

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
              onChange: (val: string) =>
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

export default React.memo(ColorCard);
