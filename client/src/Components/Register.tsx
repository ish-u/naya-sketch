import { useState } from "react";
import Loader from "./Loader";
const Register = ({
  setCurrent,
  showMessageHandler,
}: {
  setCurrent: (value: "login" | "register") => void;
  showMessageHandler: (value: string) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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

  const registerHandler = async () => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_APP_API + "/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      }),
    });
    const status = res.status;
    if (status === 201) {
      setCurrent("login");
      showMessageHandler("registered successfully");
    } else {
      showMessageHandler("somethng went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="w-80">
      <div className="mb-4 text-4xl font-semibold text-[#4F00C1]">Register</div>
      <div className="my-2 flex flex-col">
        <input
          onChange={(e) => setFirstName(e.target.value)}
          className="my-2 p-2 border-2 border-grey focus:outline-none rounded-sm"
          placeholder="first name"
          type="text"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          className="my-2 p-2 border-2 border-grey focus:outline-none rounded-sm"
          placeholder="last name"
          type="text"
        />{" "}
        <input
          onChange={(e) => setEmail(e.target.value)}
          onBlur={emailValidation}
          className="my-2 p-2 border-2 border-grey focus:outline-none rounded-sm"
          placeholder="email"
          type="email"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="my-2 p-2 border-2 border-grey focus:outline-none rounded-sm"
          placeholder="username"
          type="text"
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
        onClick={registerHandler}
        onMouseOver={emailValidation}
        className="w-full h-10 py-6 rounded-md bg-[#4F00C1]/90 hover:bg-[#4F00C1] flex flex-col justify-center items-center
                  text-lg font-semibold text-white hover:cursor-pointer disabled:bg-[#4F00C1]/50"
        disabled={
          email === "" ||
          lastName === "" ||
          lastName === "" ||
          password === "" ||
          username === "" ||
          !validEmail ||
          loading
        }
      >
        <div>{loading ? <Loader /> : "Register"}</div>
      </button>
      <div className="my-4 text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={() => setCurrent("login")}
          className="text-[#4F00C1] hover:underline hover:cursor-pointer"
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default Register;
