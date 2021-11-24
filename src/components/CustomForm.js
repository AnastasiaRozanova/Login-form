import React from "react";
import { Form, ButtonToolbar, Button } from "rsuite";
import "./style.css";

import { Formik } from "formik";

export const CustomForm = ({
  config,
  title = "",
  emailLabel,
  buttonTitle,
  clickHandler,
  isEmail = true,
  isPassword = true,
  isPasswortRepeated = true,
}) => {
  return (
    <Formik
      initialValues={config}
      validate={(values) => {
        const errors = {};
        if (isEmail && !values.email) {
          errors.email = "Поле не заполнено";
        } else if (
          isEmail &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Email некорректный";
        }
        if (isPassword && !values.password) {
          errors.password = "Поле не заполнено";
        } else if (isPassword && values.password.length < 8) {
          errors.password = "Пароль должен содержать не менее 8 символов";
        }
        if (isPasswortRepeated && !values.repeatedPassword) {
          errors.repeatedPassword = "Поле не заполнено";
        } else if (
          isPasswortRepeated &&
          values.repeatedPassword !== values.password
        ) {
          errors.repeatedPassword = "Введенные пароли не совпадают";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
        isSubmitting,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h5 className="form-header">{title}</h5>
          {isEmail && (
            <Form.Group>
              <Form.ControlLabel>
                {emailLabel ? emailLabel : "Email"}
              </Form.ControlLabel>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={(_, e) => {
                  const { name, value } = e.target;
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="form-group-error">{errors.email}</div>
              )}
            </Form.Group>
          )}
          {isPassword && (
            <Form.Group>
              <Form.ControlLabel>Пароль</Form.ControlLabel>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={(_, e) => {
                  const { name, value } = e.target;
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.password && touched.password && (
                <div className="form-group-error">{errors.password}</div>
              )}
            </Form.Group>
          )}
          {isPasswortRepeated && (
            <Form.Group>
              <Form.ControlLabel>Подтвердите пароль</Form.ControlLabel>
              <Form.Control
                type="password"
                name="repeatedPassword"
                value={values.repeatedPassword}
                onChange={(_, e) => {
                  const { name, value } = e.target;
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.repeatedPassword && touched.repeatedPassword && (
                <div className="form-group-error">
                  {errors.repeatedPassword}
                </div>
              )}
            </Form.Group>
          )}
          <Form.Group>
            <ButtonToolbar>
              <Button
                appearance="primary"
                type="submit"
                disabled={
                  !(Object.values(values).every((item) => item) && isValid)
                }
                onClick={() =>
                  clickHandler(values.email, values.password, resetForm)
                }
              >
                {buttonTitle}
              </Button>
              <Button appearance="default" onClick={resetForm}>
                Отмена
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};
