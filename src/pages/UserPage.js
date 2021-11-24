import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Notification } from "rsuite";
import user from "../icons/user.png";
import { ProfileSettings } from "../components/ProfileSettings";
import { setNotificationInfo } from "../store/actions";
import { getNotificationInfo } from "../store/selectors";

import "./style.css";

export const UserPage = () => {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const { isVisible, type, message } = useSelector(getNotificationInfo);
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      push("/");
    }
  }, []);

  return (
    <div className="user-page-container">
      <div className="user-page-wrapper">
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
        <section
          className="settings-section"
          style={{
            width: `${isSettingsVisible ? "35%" : "5%"}`,
          }}
        >
          <div className="avatar-wrapper">
            <img
              src={user}
              alt="Пользователь"
              className="avatar-image"
              onClick={() => setSettingsVisible((prev) => !prev)}
              title="Настройки профиля"
            />
            {isSettingsVisible && (
              <h6 className="avatar-title">Настройки профиля</h6>
            )}
          </div>
          {isSettingsVisible && <ProfileSettings />}
        </section>
        <section className="about-user-section">
          <h5>Профиль пользователя</h5>
        </section>
      </div>
    </div>
  );
};
