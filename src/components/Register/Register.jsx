import React from "react";
import FormTemplate from "../FormTemplate/FormTemplate";

const Register = ({onRegistration}) => {

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(evt) {
    setData({
      ...data
    });
  }

  function handleSubmit(data) {
    onRegistration(data);
  }

  return (
    <section className="register">
      <FormTemplate
        formTitle="Добро пожаловать!"
        titleButton="Зарегистрироваться"
        onSubmit={handleSubmit}
        bottomText="Уже зарегистрированы?"
        redirectRoute="/signin"
        redirectLinkTitle="Войти"
        nameForm="signup"
      >
        <input
          type="name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </FormTemplate>
    </section>
  )
}

export default Register;
