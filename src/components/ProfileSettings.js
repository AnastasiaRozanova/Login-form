import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { CustomForm } from "../components/CustomForm";
import { removeUser } from "../store/actions";
import { setNotificationInfo } from "../store/actions";
import "./style.css";

export const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const emailConfig = {
    email: "",
  };

  const passwordConfig = {
    password: "",
    repeatedPassword: "",
  };

  const { currentUser: user } = getAuth();

  const emailClickHandler = (email, _, callback) => {
    updateEmail(user, email)
      .then((response) => {
        dispatch(
          setNotificationInfo({
            isVisible: true,
            type: "success",
            message: "Email успешно изменен",
          })
        );
        callback();
      })
      .catch((error) => {
        dispatch(
          setNotificationInfo({
            isVisible: true,
            type: "error",
            message: "При изменении email произошла ошибка",
          })
        );
      });
  };

  const passwordClickHandler = (_, password, callback) => {
    updatePassword(user, password)
      .then((response) => {
        dispatch(
          setNotificationInfo({
            isVisible: true,
            type: "success",
            message: "Пароль успешно изменен",
          })
        );
        callback();
      })
      .catch((error) => {
        dispatch(
          setNotificationInfo({
            isVisible: true,
            type: "error",
            message: "При изменении пароля произошла ошибка",
          })
        );
      });
  };

  const exitHandler = () => {
    dispatch(removeUser());
    push("/");
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        <h6 className="settings-heading">Изменить email</h6>
        <CustomForm
          config={emailConfig}
          buttonTitle="Сохранить изменения"
          clickHandler={emailClickHandler}
          emailLabel={`Email профиля: ${user?.email}`}
          isPassword={false}
          isPasswortRepeated={false}
        />
        <h6 className="settings-heading">Изменить пароль</h6>
        <CustomForm
          config={passwordConfig}
          buttonTitle="Сохранить изменения"
          clickHandler={passwordClickHandler}
          isEmail={false}
        />
      </div>
      <h6 className="profile-exit" onClick={exitHandler}>
        Выйти из профиля
      </h6>
    </div>
  );
};
