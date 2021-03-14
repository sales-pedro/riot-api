import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";

function Login(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const routeOnLogin = async (user) => {
    props.history.push("/");
  };
  const onSubmit = async (data) => {
    let user;
    setLoading(true);
    try {
      user = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }
    if (user) {
      routeOnLogin(user);
    } else {
      setLoading(false);
    }
  };

  const formClassname = `ui form ${isLoading ? "loading" : ""}`;

  return (
    <div className="w-72 h-auto m-auto ">
      <h2>Login: contateste@teste.com </h2>
      <br />
      <h2>Senha: teste123</h2>

      <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
        <div className="field w-72 py-5">
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2"
              ref={register}
            />
          </label>
        </div>
        <div className="field pb-5">
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2"
              ref={register}
            />
          </label>
        </div>
        <div>
          <button
            className="bg-black text-white border border-gray-500 p-2 rounded-lg hover:bg-gray-700"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
