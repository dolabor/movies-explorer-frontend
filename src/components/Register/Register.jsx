import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";

const Register = ({onRegistration, error}) => {

  return (
    <main className="register">
      <FormTemplate
        formTitle="Добро пожаловать!"
        titleButton="Зарегистрироваться"
        bottomText="Уже зарегистрированы?"
        redirectRoute="/signin"
        redirectLinkTitle="Войти"
        nameForm="signup"
        onSubmit={onRegistration}
      >
      </FormTemplate>
      {error && <p className="error-message">{error}</p>}
    </main>
  )
}

export default Register;
