import React from "react";
import { Table, Space, Button, Divider } from "antd";
import Context from "./Context";

const ContactList = ({ onAddNewClick }) => {
  const { contacts } = React.useContext(Context);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) => ( 
        <> { birthday.format('D MMMM YYYY') } </>
      )
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Is a relative?",
      dataIndex: "relative",
      key: "relative",
      render: (relative) => ( 
        <> 
        { relative && <> Yes </> } 
        {!relative && <> No </>}
        </>
      )
    },
  ];

  return (
    <>
      <Space>
        <Button type="primary" onClick={onAddNewClick}>
          Add new contact
        </Button>
      </Space>
      <Divider />
      <Table dataSource={contacts} columns={columns} />
    </>
  );
};

export default ContactList;
