import { useState } from "react";

const SketchesList = () => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="w-72 border rounded-md bg-white p-2 my-2">
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
          <div className="my-2">
            <div className="h-8 m-2 flex items-center">Sketch 1</div>
            <div className="h-8 m-2 flex items-center">Sketch 2</div>
            <div className="h-8 m-2 flex items-center">Sketch 3</div>
          </div>
          <div className="my-4 flex items-center">
            <div className="mx-2 borde">
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
