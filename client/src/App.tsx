import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import AuthPage from "./Pages/AuthPage";
import SketchPage from "./Pages/SketchPage";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const check = await fetch(import.meta.env.VITE_APP_API + "/check", {
        credentials: "include",
      });
      if (check.status === 201) {
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
        <SketchPage />
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
