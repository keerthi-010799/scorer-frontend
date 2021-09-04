import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../context/auth-context";
import { login } from "../services/loginservices";
import Loader from "../Components/Common/Loader";

const Login = (props) => {
  const context = useContext(Auth);
  const [Login, setLogin] = useState({});
  const history = useHistory();
  const redirectTo = (route) => {
    history.push(route);
  };
  const handleForm = (value, key) => {
    setLogin({ ...Login, [key]: value });
    console.log(Login);
  };
  const [isLoading,setLoading] = useState(false);
  const loginHandler = () => {
    const email = Login.email;
    const password = Login.password;
    setLoading(true);
    login(email, password)
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
        context.login(
          res.data.data.login.token,
          res.data.data.login.userId,
          res.data.data.login.tokenExpiration
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="m-4">
      <div
        className="p-3 h5 d-flex col-md-2 mx-auto"
        style={{ alignItems: "center" }}
      >
        Login
      </div>
      <form className="text-secondary">
        <div class="form-group">
          <label>E-mail</label>
          <input
            class="form-control"
            type="email"
            name="email"
            value={Login.email}
            onChange={(e) => handleForm(e.target.value, e.target.name)}
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            class="form-control"
            type="password"
            name="password"
            value={Login.password}
            onChange={(e) => handleForm(e.target.value, e.target.name)}
          />
        </div>
        <div className="form-actions mb-5 mt-2">
          <button
            class="btn btn-md btn-primary w-100"
            type="button"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        Create an account?
        <a
          href=""
          class=" w-30 ml-3"
          type="button"
          onClick={() => {
            redirectTo("/signup");
          }}
        >
          signup
        </a>
      </form>
      {isLoading && <Loader status={true}/>}
    </div>
  );
};

export default Login;
