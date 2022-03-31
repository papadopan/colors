import React, { useEffect } from 'react';
import { Modal, Space, Typography, notification } from 'antd';
import { DELETE_COLOR } from '../../mutations';
import { useMutation } from '@apollo/client';
import { getAllColors } from '../../queries/queries';
import { Color } from '../../types';
interface Props {
  visible: boolean;
  itemToDelete: Color;
  onClose: () => void;
}

const DeleteModal: React.FC<Props> = ({ visible, itemToDelete, onClose }) => {
  const [deleteColor, { loading, data, error, reset }] = useMutation(
    DELETE_COLOR,
    {
      refetchQueries: [getAllColors],
    }
  );

  useEffect(() => {
    if (data && data.deleteColor) {
      reset();
      onClose();
      const { name } = data.deleteColor;
      notification.success({
        message: 'Color Removal',
        description: `${name} color deleted`,
      });
    }
  }, [data, reset, onClose]);

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="Delete Colors"
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading: loading,
        onClick: () => deleteColor({ variables: { name: itemToDelete.name } }),
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text>
          You are about to delete
          <Typography.Text code>{itemToDelete.name}</Typography.Text>
          color
        </Typography.Text>

        {error && (
          <Typography.Text type="warning">{error.message}</Typography.Text>
        )}
      </Space>
    </Modal>
  );
};

export default DeleteModal;
