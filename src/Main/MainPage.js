import React from "react";
import { Layout, PageHeader } from "antd";
import styled from "styled-components";
import ContactList from "./ContactList";
import CreateContact from "./CreateContact";

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const InsideLayout = styled(Layout)`
  width: 800px;
`;

function MainPage() {
  const [display, setDisplay] = React.useState("default"); //default, create

  const onAddNewClick = () => {
    setDisplay("create");
  };

  const onCancelClick = () => {
    setDisplay("default");
  };

  return (
    <MainLayout>
      <InsideLayout>
        <PageHeader title="My Contacts" subTitle="React application" />
        {display === "default" && <ContactList onAddNewClick={onAddNewClick} />}
        {display === "create" && (
          <CreateContact onCancelClick={onCancelClick} />
        )}
      </InsideLayout>
    </MainLayout>
  );
}

export default MainPage;
