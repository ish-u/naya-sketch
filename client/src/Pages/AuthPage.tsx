import { useState } from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import SnackBar from "../Components/SnackBar";

const AuthPage = () => {
  const [current, setCurrent] = useState<"login" | "register">("login");

  // Error Handling during Login
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // message change listener
  const showMessageHandler = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {current === "login" && (
        <Login
          setCurrent={setCurrent}
          showMessageHandler={showMessageHandler}
        />
      )}
      {current === "register" && (
        <Register
          setCurrent={setCurrent}
          showMessageHandler={showMessageHandler}
        />
      )}
      {showMessage && (
        <SnackBar message={message} setShowMessage={setShowMessage} />
      )}
    </div>
  );
};

export default AuthPage;
