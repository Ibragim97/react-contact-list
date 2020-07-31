import React from "react";
import { Form, Input, Button, Space, DatePicker, Select, Switch, message 
} from "antd";
import Context from "./Context";

const { Option } = Select;

const info = () => {
  message.info('Contact was successfully added');
};

const CreateContact = ({ onCancelClick }) => {
  const [form] = Form.useForm();
  const { addNewContact } = React.useContext(Context);

  const onFormFinish = (values) => {
    console.log(values)
    console.log(values.relative)
    console.log(values.birthday)
    addNewContact(values);
    onCancelClick();
    info();
  };

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input contact name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input phone number",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: "Please input birthday",
          },
        ]}
      >
      <DatePicker />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please input gender",
          },
        ]}
      >
      <Select
        placeholder="Select a option and change input text above"
        allowClear
      >
        <Option value="male">male</Option>
        <Option value="female">female</Option>
        <Option value="other">other</Option>
      </Select>
      </Form.Item>
      <Form.Item
        name="relative"
        label="Is relative?"
      >
      <Switch  />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Add Contact
          </Button>
          <Button type="primary" danger onClick={onCancelClick}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateContact;
