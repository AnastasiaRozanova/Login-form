import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Notification } from "rsuite";
import { Registration } from "../components/Registration";
import { Authorization } from "../components/Authorization";
import { FormTabs } from "../components/FormTabs";
import { setNotificationInfo } from "../store/actions";
import { getNotificationInfo } from "../store/selectors";
import "./style.css";

export const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState("registration");
  const { isVisible, type, message } = useSelector(getNotificationInfo);
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      push("/userpage");
    }
  }, []);

  return (
    <div className="login-page-container">
      {isVisible && (
        <Notification
          type={type}
          placement="topLeft"
          header={message}
          duration={2500}
          onClose={() =>
            dispatch(
              setNotificationInfo({
                isVisible: false,
                type: "error",
                message: "",
              })
            )
          }
        />
      )}
      <div className="login-page-wrapper">
        {selectedTab === "registration" && <Registration />}
        {selectedTab === "authorization" && <Authorization />}
        <FormTabs
          selectedTab={selectedTab}
          onSelect={(tabName) => setSelectedTab(tabName)}
        />
      </div>
    </div>
  );
};
