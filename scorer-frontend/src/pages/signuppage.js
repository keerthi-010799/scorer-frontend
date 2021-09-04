import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../context/auth-context";
import { signup } from "../services/loginservices";
import Loader from "../Components/Common/Loader";

const Signuppage = (props) => {
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
  const signupHandler = () => {
    const email = Login.email;
    const password = Login.password;
    setLoading(true);
    signup(email, password)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    redirectTo("/");
  };

  return (
    <div class="m-4">
      <div
        className="p-3 h5 d-flex col-md-2 mx-auto"
        style={{ alignItems: "center" }}
      >
        Create user
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
        <div className="form-actions mt-2">
          <button
            class="btn btn-md btn-primary w-100"
            type="button"
            onClick={signupHandler}
          >
            Create
          </button>
        </div>
      </form>
      {isLoading && <Loader status={true}/>}
    </div>
  );
};

export default Signuppage;
