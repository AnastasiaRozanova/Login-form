import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CustomForm } from "./CustomForm";
import { setUser, setNotificationInfo } from "../store/actions";
import "./style.css";

const config = {
  email: "",
  password: "",
  repeatedPassword: "",
};

export const Registration = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
        if (error.code === "auth/email-already-in-use") {
          dispatch(
            setNotificationInfo({
              isVisible: true,
              type: "error",
              message: "Пользователь с таким email уже существует",
            })
          );
        } else {
          dispatch(
            setNotificationInfo({
              isVisible: true,
              type: "error",
              message: "При регистрации произошла ошибка",
            })
          );
        }
      });
  };

  return (
    <CustomForm
      config={config}
      title="Регистрация пользователя"
      buttonTitle="Зарегистрировать"
      clickHandler={handleRegister}
    />
  );
};
