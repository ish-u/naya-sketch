import { useContext, useEffect, useState } from "react";
import { ActionType } from "../context/actions";
import { AppContext } from "../context/context";

const SketchesList = () => {
  // context
  const { state, dispatch } = useContext(AppContext);

  const [showList, setShowList] = useState(true);
  const [list, setList] = useState<string[] | null>(null);

  // Socket-IO
  useEffect(() => {
    state.socketClient?.on("add-sketch", ({ newSketch, username }) => {
      //console.log(newSketch, username);
      if (username !== state.user?.username) {
        setList((prev) => (prev !== null ? [...prev, newSketch] : [newSketch]));
      }
    });

    return () => {
      state.socketClient?.off("add-sketch");
    };
  }, [state.socketClient]);

  const getSketchListHandler = async () => {
    const res = await fetch(import.meta.env.VITE_APP_API + "/sketch/list", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    setList(data.sketches);
  };

  const createNewSketchHandler = async () => {
    const number =
      list?.length && list !== null
        ? parseInt(list[list.length - 1].split(" ")[1]) + 1
        : 1;
    const res = await fetch(
      import.meta.env.VITE_APP_API + "/sketch/create/Sketch " + number,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    setList((prev) => (prev !== null ? [...prev, data.name] : [data.name]));
    state.socketClient?.emit("new-sketch", {
      sketchName: data.name,
      username: state.user?.username,
    });
  };

  useEffect(() => {
    if (list === null) {
      getSketchListHandler();
    }
  }, []);

  return (
    <div className="w-72 h-76 border rounded-md bg-white p-2 my-2">
      <div className="h-12 mx-2 flex items-center justify-between font-medium">
        <div>SKETCHES</div>
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
            {list !== null &&
              list.map((sketch) => (
                <div
                  onClick={() =>
                    dispatch({
                      type: ActionType.ChangeCureentSketch,
                      payload: { currentSketch: sketch },
                    })
                  }
                  key={sketch}
                  className={`h-8 m-2 flex items-center ${
                    sketch === state.currentSketch ? "text-[#4F00C1]" : ""
                  }`}
                >
                  {sketch}
                </div>
              ))}
          </div>
          <div
            onClick={createNewSketchHandler}
            className="my-4 flex items-center"
          >
            <div className="mx-2">
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
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>
            <div>Add new Sketch</div>
          </div>
        </>
      )}
    </div>
  );
};

export default SketchesList;
