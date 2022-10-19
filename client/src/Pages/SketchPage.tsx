import Canvas from "../Components/Canvas";
import SketchesList from "../Components/SketchList";
import UserList from "../Components/UserList";

const SketchPage = () => {
  return (
    <>
      <Canvas />
      <div className="fixed top-20 right-4">
        <SketchesList />
        <UserList />
      </div>
    </>
  );
};

export default SketchPage;
