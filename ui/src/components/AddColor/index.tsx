import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal, notification, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { ADD_NEW_COLOR } from '../../mutations';
import { getAllColors } from '../../queries/queries';

const AddColor = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const counter = useRef(0);
  const [addColor, { loading, data, error, reset }] = useMutation(
    ADD_NEW_COLOR,
    {
      refetchQueries: [getAllColors],
    }
  );

  useEffect(() => {
    if (data && data.addNewColor) {
      notification.success({
        message: 'Color Addition',
        description: 'color added successfully',
      });
      form.resetFields();
      setVisible(false);
      reset();
    }

    if (error) {
      notification.error({
        message: 'Error while saving to db',
        description: error.message,
      });
    }
  }, [data, error, form, reset]);

  return (
    <Row justify="end" style={{ padding: '10px' }}>
      <Button
        onClick={() => setVisible(true)}
        icon={<PlusOutlined />}
        loading={loading}
      >
        Add Color {counter.current++}
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
          onFinish={(val) =>
            addColor({ variables: { name: val.name, hex: val.hex } })
          }
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

          <Form.Item label="Color Hex Code" name="hex">
            <Input type="color" />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

AddColor.propTypes = {};

export default React.memo(AddColor);
