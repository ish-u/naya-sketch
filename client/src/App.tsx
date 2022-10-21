import { useContext, useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import { ActionType } from "./context/actions";
import { AppContext } from "./context/context";
import AuthPage from "./Pages/AuthPage";
import SketchPage from "./Pages/SketchPage";
const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(import.meta.env.VITE_APP_API + "/user", {
        credentials: "include",
      });
      if (res.status === 201) {
        const user = (await res.json()).user;
        dispatch({
          type: ActionType.SetUser,
          payload: user,
        });
        dispatch({
          type: ActionType.SetIsAuthenticated,
          payload: { value: true },
        });
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <>Loading</>;
  } else if (state.isAuthenticated) {
    return (
      <div className="w-screen h-screen bg-[#F5F5F5]">
        <NavBar />
        <SketchPage />
      </div>
    );
  } else {
    return (
      <>
        <AuthPage />
      </>
    );
  }
};

export default App;
