import { useState } from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";

const AuthPage = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const [current, setCurrent] = useState<"login" | "register">("login");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {current === "login" && (
        <Login
          setIsAuthenticated={setIsAuthenticated}
          setCurrent={setCurrent}
        />
      )}
      {current === "register" && <Register setCurrent={setCurrent} />}
    </div>
  );
};

export default AuthPage;
