import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal, notification, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { ADD_NEW_COLOR } from '../../mutations';

const AddColor = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [addColor, { loading, data, error }] = useMutation(ADD_NEW_COLOR);

  useEffect(() => {
    if (data && data.addNewColor) {
      notification.success({
        message: 'Color Addition',
        description: 'color added successfully',
      });
      form.resetFields();
      setVisible(false);
    }
  }, [data, error]);

  return (
    <Row justify="end" style={{ padding: '10px' }}>
      <Button
        onClick={() => setVisible(true)}
        icon={<PlusOutlined />}
        loading={loading}
      >
        Add Color
      </Button>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        title="Add a new Color"
        okText="add"
        okButtonProps={{
          onClick: () => form.submit(),
        }}
        destroyOnClose
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={(val) => addColor({ variables: val })}
        >
          <Form.Item
            label="Color Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your color name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Color Hex Code"
            name="hex"
            rules={[
              {
                required: true,
                message: 'Please input color  hex code',
              },
              {
                pattern: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
                message: 'Please input a valid hex code',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

AddColor.propTypes = {};

export default AddColor;
