import React from 'react';
import FormTemplate from "../FormTemplate/FormTemplate";

const Login = ({onAuthorization}) => {

  function handleSubmit(data) {
    onAuthorization(data);
  }

  return (
    <section className="login">
      <FormTemplate
        formTitle="Рады видеть!"
        titleButton="Войти"
        onSubmit={handleSubmit}
        bottomText="Ещё не зарегистрированы?"
        redirectRoute="/signup"
        redirectLinkTitle="Регистрация"
        nameForm="signin"
      >
      </FormTemplate>
    </section>
  )
}

export default Login;
