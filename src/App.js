import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import MainPage from "./Main/MainPage";
import Context from "./Main/Context";
import useContacts from "./Main/UseContacts";

function App() {
  return (
    <Context.Provider value={useContacts()}>
      <MainPage />
    </Context.Provider>
  );
}

export default App;
