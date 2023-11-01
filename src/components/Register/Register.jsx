import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";

const Register = ({onRegistration}) => {

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
    </main>
  )
}

export default Register;
