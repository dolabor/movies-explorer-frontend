import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";

const Register = ({onRegistration, error, setError}) => {

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
        error={error}
        setError={setError}
      >
      </FormTemplate>
    </main>
  )
}

export default Register;
