import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CustomForm } from "./CustomForm";
import { setUser, setNotificationInfo } from "../store/actions";
import "./style.css";

const config = {
  email: "",
  password: "",
};

export const Authorization = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        push("/userpage");
        localStorage.setItem("loggedInUser", user.accessToken);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          dispatch(
            setNotificationInfo({
              isVisible: true,
              type: "error",
              message: "Введен неверный пароль",
            })
          );
        } else if (error.code === "auth/user-not-found") {
          dispatch(
            setNotificationInfo({
              isVisible: true,
              type: "error",
              message: "Такого пользователя не существует",
            })
          );
        } else {
          dispatch(
            setNotificationInfo({
              isVisible: true,
              type: "error",
              message: "При авторизации произошла ошибка",
            })
          );
        }
      });
  };
  return (
    <CustomForm
      config={config}
      title="Авторизация пользователя"
      buttonTitle="Войти"
      clickHandler={handleLogin}
      isPasswortRepeated={false}
    />
  );
};
