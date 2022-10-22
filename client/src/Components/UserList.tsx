import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";

const UserList = () => {
  const { state } = useContext(AppContext);
  const [showList, setShowList] = useState(true);

  useEffect(() => {}, [state.collaborators, state.currentOnline]);

  return (
    <div className="w-72 max-h-76 border rounded-md bg-white p-2 my-2">
      <div className="h-12 mx-2 flex items-center justify-between font-medium">
        <div>USERS</div>
        <div
          onClick={() => setShowList(!showList)}
          className="hover:bg-black/10 hover:cursor-pointer transition duration-150  rounded-full p-1"
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
              d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      {showList && (
        <>
          <hr />
          <div className="my-2 max-h-44 overflow-x-hidden overflow-y-scroll">
            {Object.keys(state.collaborators).map((key) => (
              <div
                key={key}
                className={`h-7 m-2 flex items-center ${
                  key === state.user?.username ? "font-semibold" : ""
                }`}
              >
                <svg height="20" width="20">
                  <circle
                    cx="5"
                    cy="10"
                    r="5"
                    fill={"#" + state.collaborators[key]}
                  />
                </svg>
                {key}{" "}
                {key !== state.user?.username && (
                  <span className="font-thin text-black/75">
                    {state.currentOnline.includes(key)
                      ? " (online)"
                      : " (offline)"}
                  </span>
                )}
                {key === state.user?.username && (
                  <span className="font-thin text-black/75"> (you) </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
