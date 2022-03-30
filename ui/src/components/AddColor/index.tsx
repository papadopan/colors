import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddColor = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  return (
    <Row justify="end" style={{ padding: '10px' }}>
      <Button onClick={() => setVisible(true)} icon={<PlusOutlined />}>
        Add Color
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Add a new Color"
        okText="add"
        okButtonProps={{
          onClick: () => form.submit(),
        }}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={(val) => console.log(val)}
        >
          <Form.Item
            label="Name"
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
            label="Hex Code"
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
