import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";

const Register = () => {

  return (
    <section className="register">
      <FormTemplate
        formTitle="Добро пожаловать!"
        titleButton="Зарегистрироваться"
        bottomText="Уже зарегистрированы?"
        redirectRoute="/signin"
        redirectLinkTitle="Войти"
        nameForm="signup"
      >
      </FormTemplate>
    </section>
  )
}

export default Register;
