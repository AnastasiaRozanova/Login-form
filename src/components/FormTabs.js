import React from "react";
import { Nav } from "rsuite";

export const FormTabs = ({ selectedTab, onSelect }) => {
  return (
    <Nav activeKey={selectedTab} onSelect={onSelect} appearance="tabs" reversed>
      <Nav.Item eventKey="registration">Регистрация</Nav.Item>
      <Nav.Item eventKey="authorization">Авторизация</Nav.Item>
    </Nav>
  );
};
