import { useState } from "react";
import Canvas from "../Components/Canvas";
import SketchesList from "../Components/SketchList";
import UserList from "../Components/UserList";

const SketchPage = () => {
  const [currentSketch, setCurrentSketch] = useState("Sketch 1");

  return (
    <>
      <Canvas currentSketch={currentSketch} />
      <div className="fixed top-20 right-4">
        <SketchesList
          currentSketch={currentSketch}
          setCurrentSketch={setCurrentSketch}
        />
        <UserList />
      </div>
    </>
  );
};

export default SketchPage;
