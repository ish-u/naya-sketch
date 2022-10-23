import { useContext, useState } from "react";
import google from "../assets/google.svg";
import { ActionType } from "../context/actions";
import { AppContext } from "../context/context";
import Loader from "./Loader";
const Login = ({
  setCurrent,
  showMessageHandler,
}: {
  setCurrent: (value: "login" | "register") => void;
  showMessageHandler: (value: string) => void;
}) => {
  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // email validation
  const [validEmail, setValidEmail] = useState(true);
  function emailValidation() {
    if (email !== "") {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!regex.test(email)) {
        showMessageHandler("Invalid Email");
        setValidEmail(false);
      } else {
        setValidEmail(true);
      }
    }
  }

  const loginHandler = async () => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_APP_API + "/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    const status = res.status;
    if (status === 201) {
      const user = (await res.json()).user;
      dispatch({
        type: ActionType.SetUser,
        payload: user,
      });
      dispatch({
        type: ActionType.SetIsAuthenticated,
        payload: { value: true },
      });
    } else {
      showMessageHandler("Invalid Credentials");
    }
    setLoading(false);
  };

  return (
    <div className="w-80">
      <div className="mb-4 text-4xl font-semibold text-[#4F00C1]">
        Log in to continue
      </div>
      <div className="my-2 flex flex-col">
        <input
          onChange={(e) => setEmail(e.target.value)}
          onBlur={emailValidation}
          className="my-2 p-2 border-2 border-grey focus:outline-none rounded-sm"
          placeholder="email"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="my-2 p-2 border-2 border-grey focus:outline-none rounded-sm"
          placeholder="password"
          type="password"
        />
      </div>
      <div className="my-4 text-center font-semibold text-sm text-[#4F00C1] hover:underline hover:cursor-pointer">
        Forgot Password ?
      </div>
      <button
        onClick={loginHandler}
        onMouseOver={emailValidation}
        className="w-full h-10 py-6 rounded-md bg-[#4F00C1]/90 hover:bg-[#4F00C1] flex flex-col justify-center items-center 
                   text-lg font-semibold text-white hover:cursor-pointer transition duration-150 disabled:bg-[#4F00C1]/50"
        disabled={email === "" || password === "" || !validEmail || loading}
      >
        <div>{loading ? <Loader /> : "Login"}</div>
      </button>
      <div className="my-4 text-center text-sm">
        Don't have an account?{" "}
        <span
          onClick={() => setCurrent("register")}
          className="text-[#4F00C1] hover:underline hover:cursor-pointer"
        >
          Sign Up
        </span>
      </div>
      <div className="my-4 text-center font-semibold text-[#424242]">or</div>
      <div
        className="h-10 py-6 rounded-md flex justify-center items-center border-2 text-base font-semibold hover:bg-black/10 hover:cursor-pointer
                      transition duration-300"
      >
        <div className="relative flex justify-center mx-2">
          <img className="h-8" src={google} />
        </div>
        <div className="mx-2">Log in with Google</div>
      </div>
    </div>
  );
};

export default Login;
