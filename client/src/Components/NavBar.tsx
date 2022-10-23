import { useContext } from "react";
import logo from "../assets/naya.svg";
import { AppContext } from "../context/context";
const NavBar = () => {
  const { state } = useContext(AppContext);

  const logoutHandler = async () => {
    console.log("LOGOUT");
    await fetch(import.meta.env.VITE_APP_API + "/logout", {
      credentials: "include",
    });
    state.socketClient?.emit("leave-room", {
      room: state.currentSketch,
      username: state.user?.username,
    });
    location.reload();
  };
  return (
    <div className="w-screen border-b-2 h-14 flex justify-between">
      <div className="h-full flex flex-col justify-center mx-4">
        <img src={logo}></img>
      </div>
      <div className="flex mx-4 items-center">
        <div className="mx-2">
          <span className="font-semibold">@{state.user?.username}</span>
          {"/"}
          {state.user?.firstName} {""} {state.user?.lastName}
        </div>
        <img
          className="mx-2 border-black rounded-full"
          height={36}
          width={36}
          src={`https://www.gravatar.com/avatar/${state.user?.username}?s=64&d=identicon&r=PG`}
        />
        <div
          onClick={logoutHandler}
          className="mx-2 p-1 border-2 border-black rounded-full hover:cursor-pointer hover:bg-white hover:text-black duration-150 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
