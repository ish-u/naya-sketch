import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import AuthPage from "./Pages/AuthPage";
import SketchPage from "./Pages/SketchPage";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(import.meta.env.VITE_APP_API + "/check", {
        credentials: "include",
      });
      if (res.status === 201) {
        const username = (await res.json()).username;
        setCurrentUser(username);
        setIsAuthenticated(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <>Loading</>;
  } else if (isAuthenticated) {
    return (
      <>
        <NavBar />
        <SketchPage username={currentUser} />
      </>
    );
  } else {
    return (
      <>
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      </>
    );
  }
};

export default App;
