import React from 'react';
import FormTemplate from "../FormTemplate/FormTemplate";

const Login = ({onAuthorization, error, setError}) => {

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
        error={error}
        setError={setError}
      >
      </FormTemplate>
    </main>
  )
}

export default Login;
