import React from 'react';
import FormTemplate from "../FormTemplate/FormTemplate";

const Login = ({onAuthorization, error}) => {

  function handleSubmit(data) {
    onAuthorization(data);
  }

  return (
    <main className="login">
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
      {error && <p className="error-message">{error}</p>}
    </main>
  )
}

export default Login;
