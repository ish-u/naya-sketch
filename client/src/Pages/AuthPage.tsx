import { useState } from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";

const AuthPage = () => {
  const [current, setCurrent] = useState<"login" | "register">("login");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {current === "login" && <Login setCurrent={setCurrent} />}
      {current === "register" && <Register setCurrent={setCurrent} />}
    </div>
  );
};

export default AuthPage;
