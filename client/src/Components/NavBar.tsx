import logo from "../../public/naya.svg";
const NavBar = () => {
  return (
    <div className="w-screen h-14 bg-slate-300 flex justify-between">
      <div className="h-full flex flex-col justify-center mx-4">
        <img src={logo}></img>
      </div>
      <div className="flex mx-4 items-center">
        <div className="mx-2 font-semibold">John Doe</div>
        <div className="mx-2 border-2 border-black p-1 rounded-full">
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
