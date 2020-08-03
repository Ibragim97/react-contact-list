import React from "react";
import { Table, Space, Button, Divider, Form, InputNumber, Input } from "antd";
import Context from "./Context";
import * as moment from 'moment';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ContactList = ({ onAddNewClick }) => {
  const { contacts, updateContact, deleteContact } = React.useContext(Context);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = React.useState('');

  const isEditing = index => {
    return index === editingIndex;
  }
  
  const edit = index => {
    form.setFieldsValue({
      name: '',
      phone: '',
      birthday: '',
      ...contacts[index],
    });
    setEditingIndex(index);
  };

  const cancel = () => {
    setEditingIndex('');
  };

  const save = async index => {
    try {
      const row = await form.validateFields();
      row.birthday = moment(row.birthday, 'D MMMM YYY')
      updateContact(index, row)
      setEditingIndex('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      width: 150,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      editable: true,
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      editable: true,
      render: (birthday) => ( 
        <> { birthday.format('D MMMM YYYY') } </>
      )
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      editable: true,
    },
    {
      title: "Is a relative?",
      dataIndex: "relative",
      key: "relative",
      editable: true,
      render: (relative) => ( 
        <> 
        { relative && <> Yes </> } 
        {!relative && <> No </>}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => {
        const editable = isEditing(index);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(index)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <a onClick={() => cancel()}>Cancel</a>
          </span>
        ) : (
          <>
            <a disabled={editingIndex !== ''} onClick={() => edit(index)}>
              Edit
            </a>
            <a disabled={editingIndex !== ''} onClick={(e) => { deleteContact(index); }} > Delete </a>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record, index) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(index),
      }),
    };
  });
  

  return (
    <>
      <Space>
        <Button type="primary" onClick={onAddNewClick}>
          Add new contact
        </Button>
      </Space>
      <Divider />
      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={contacts}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  );
};

export default ContactList;
