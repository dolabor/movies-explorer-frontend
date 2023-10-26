import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";

const Register = () => {

  return (
    <main className="register">
      <FormTemplate
        formTitle="Добро пожаловать!"
        titleButton="Зарегистрироваться"
        bottomText="Уже зарегистрированы?"
        redirectRoute="/signin"
        redirectLinkTitle="Войти"
        nameForm="signup"
      >
      </FormTemplate>
    </main>
  )
}

export default Register;
