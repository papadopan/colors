import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Space, Typography } from 'antd';
interface Props {
  visible: boolean;
  itemToDelete: deleteItem;
  onClose: () => void;
}

interface deleteItem {
  name: string;
  hex: string;
}
const DeleteModal = ({ visible, itemToDelete, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="Delete Colors"
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <Space>
        <Typography.Text>
          You are about to delete
          <Typography.Text code>{itemToDelete.name}</Typography.Text>
          color
        </Typography.Text>
      </Space>
    </Modal>
  );
};

DeleteModal.propTypes = {};

export default DeleteModal;
