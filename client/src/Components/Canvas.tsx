import { Application, Graphics, InteractionEvent } from "pixi.js";
import { useEffect, useState, useRef, useContext } from "react";
import { ActionType } from "../context/actions";
import { AppContext } from "../context/context";
import Loader from "./Loader";

const getRandomColor = (): string => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const Canvas = () => {
  // context
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // ref to canvas
  const ref = useRef<HTMLDivElement | null>(null);
  const graphicsRef = useRef<Graphics | null>(null);
  const appRef = useRef<Application | null>(null);

  // Drawing
  const [points, _setPoints] = useState<
    {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    }[]
  >([]);
  const pointsRef = useRef(points);
  function setPoints(value: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }) {
    _setPoints((prev) => {
      return [...prev, value];
    });
    pointsRef.current = [...pointsRef.current, value];
  }

  // isDrawing
  const [isDrawing, _setIsDrawing] = useState(false);
  const isDrawingRef = useRef(isDrawing);
  function setIsDrawing(value: boolean) {
    _setIsDrawing(value);
    isDrawingRef.current = value;
  }

  // prevX
  const [prevX, _setPrevX] = useState(0);
  const prevXRef = useRef(prevX);
  function setPrevX(value: number) {
    _setPrevX(value);
    prevXRef.current = value;
  }

  // prevY
  const [prevY, _setPrevY] = useState(0);
  const prevYRef = useRef(prevY);
  function setPrevY(value: number) {
    _setPrevY(value);
    prevYRef.current = value;
  }

  // Mouse Handlers
  // mouseDown
  const mousedownHandler = (e: InteractionEvent) => {
    setIsDrawing(true);
    setPrevX(e.data.global.x);
    setPrevY(e.data.global.y);
  };

  // mouseUp
  const mouseupHandler = async () => {
    setIsDrawing(false);
    sendData(pointsRef.current);
    pointsRef.current = [];
  };

  // nouseMove
  const mousemoveHandler = (e: InteractionEvent) => {
    if (isDrawingRef.current === true && state.user) {
      const points = {
        x1: prevXRef.current,
        y1: prevYRef.current,
        x2: e.data.global.x,
        y2: e.data.global.y,
      };
      setPoints(points);
      // sending drawn point to other users in room
      sendPoint(points);
      graphicsRef.current?.lineStyle(
        2,
        state.user
          ? parseInt("0x" + state.collaborators[state.user?.username])
          : 0xffffff,
        1
      );
      graphicsRef.current?.moveTo(prevXRef.current, prevYRef.current);
      graphicsRef.current?.lineTo(e.data.global.x, e.data.global.y);
      setPrevX(e.data.global.x);
      setPrevY(e.data.global.y);
    }
  };

  // loading the saved data of Current Sketch - state.currentSketch
  const loadSketch = async () => {
    setLoading(true);
    // Clearing the Current Points/Arc
    _setPoints([]);
    pointsRef.current = [];

    // getting the saved Sketch
    const res = await fetch(
      import.meta.env.VITE_APP_API + "/sketch/get/" + state.currentSketch,
      { credentials: "include" }
    );

    // checking if the sketch exists
    if (res.status !== 404) {
      // extracting the saved points from response data
      const data = await res.json();
      const pointsData: {
        points: {
          x1: number;
          y1: number;
          x2: number;
          y2: number;
        }[];
        sketchedBy: string;
      }[] = data.data;

      // old collaborators of the sketch
      const sketchCollaborators: string[] = data.collaboraters;
      var sketchPoints: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        sketchedBy: string;
      }[] = [];

      // Collaborators Record - collaborator -> color
      const collaborators: Record<string, string> = {};

      // setting the collaborators and their colors
      for (var i = 0; i < sketchCollaborators.length; i++) {
        collaborators[sketchCollaborators[i]] = getRandomColor();
        dispatch({
          type: ActionType.SetCollaborators,
          payload: {
            collaborater: sketchCollaborators[i],
            color: collaborators[sketchCollaborators[i]],
          },
        });
      }

      // setting the color for current user
      if (state.user && !state.collaborators[state.user?.username]) {
        collaborators[state.user?.username] = getRandomColor();
        dispatch({
          type: ActionType.SetCollaborators,
          payload: {
            collaborater: state.user.username,
            color: collaborators[state.user.username],
          },
        });
      }

      // remapping the pointsData to sketchPoints
      pointsData.map(
        (points) =>
          (sketchPoints = [
            ...sketchPoints,
            ...points.points.map((point) => {
              return { ...point, sketchedBy: points.sketchedBy };
            }),
          ])
      );

      // drawing the sketchPoints
      if (sketchPoints) {
        for (var i = 0; i < sketchPoints.length; i++) {
          graphicsRef.current?.lineStyle(
            2,
            parseInt("0x" + collaborators[sketchPoints[i].sketchedBy]),
            1
          );
          graphicsRef.current?.moveTo(sketchPoints[i].x1, sketchPoints[i].y1);
          graphicsRef.current?.lineTo(sketchPoints[i].x2, sketchPoints[i].y2);
        }
      }
    }
    setLoading(false);
  };

  // sending currently drawn points to the server
  const sendData = async (
    pointsToSend: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[]
  ) => {
    await fetch(import.meta.env.VITE_APP_API + "/sketch/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: { points: pointsToSend, sketchedBy: state.user?.username },
        name: state.currentSketch,
      }),
      credentials: "include",
    });
  };

  useEffect(() => {
    if (state.currentSketch !== "") {
      // creating the PixiJS Application
      const app = new Application({
        width: window.innerWidth - 200,
        height: window.innerHeight - 200,
        antialias: true,
        backgroundColor: 0xffffff,
      });

      // Add app to DOM
      ref.current?.appendChild(app.view);

      // Initialize  Graphics
      const graphics = new Graphics();
      graphics.interactive = true;

      // Rectangle Object on which User can Draw
      graphics.beginFill(0xffffff);
      graphics.drawRect(
        0,
        0,
        window.innerWidth - 200,
        window.innerHeight - 200
      );
      graphics.endFill();

      // Graphics Event Listeners
      graphics.on("mousedown", mousedownHandler);
      graphics.on("mouseup", mouseupHandler);
      graphics.on("mousemove", mousemoveHandler);

      // Adding graphics to App
      app.stage.addChild(graphics);

      // Start the PixiJS app
      app.start();

      // saving the ref for future use
      graphicsRef.current = graphics;
      appRef.current = app;

      // load the state.currentSketch
      loadSketch();

      // Joining Room -> state.currentSketch
      state.socketClient?.emit("join-room", {
        room: state.currentSketch,
        username: state.user?.username,
      });
      return () => {
        // On unload completely destroy the application and all of it's children
        //console.log("DESTROYED");
        state.socketClient?.emit("leave-room", {
          room: state.currentSketch,
          username: state.user?.username,
        });
        // clearing the Users of the Last Sketch
        dispatch({ type: ActionType.ClearCurrentOnline });
        app.destroy(true, true);
      };
    }
  }, [state.currentSketch]);

  // resize the PixiJS Application on window size change
  const resize = () => {
    if (window.innerWidth >= 1024) {
      appRef.current?.renderer.resize(
        window.innerWidth - 200,
        window.innerHeight - 200
      );
    } else if (window.innerWidth < 1024 && window.innerWidth > 425) {
      appRef.current?.renderer.resize(
        window.innerWidth - 100,
        window.innerHeight - 150
      );
    } else {
      appRef.current?.renderer.resize(
        window.innerWidth - 50,
        window.innerHeight - 150
      );
    }
  };

  useEffect(() => {
    if (appRef.current !== null) {
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    }
  }, [appRef.current]);

  // Socket-IO -> For Live Collaborations
  useEffect(() => {
    // get points form other collaborators
    state.socketClient?.on("get-point", ({ collaboratorsPoint, username }) => {
      if (username !== state.user?.username) {
        graphicsRef.current?.lineStyle(
          2,
          parseInt("0x" + state.collaborators[username]),
          1
        );
        graphicsRef.current?.moveTo(
          collaboratorsPoint.x1,
          collaboratorsPoint.y1
        );
        graphicsRef.current?.lineTo(
          collaboratorsPoint.x2,
          collaboratorsPoint.y2
        );
      }
    });

    // adding the user to state.currentOnline that joined the room
    state.socketClient?.on("add-user", ({ username }) => {
      dispatch({
        type: ActionType.AddCurrentOnline,
        payload: { username: username },
      });
      // sending to all other users in to room that current user is online
      state.socketClient?.emit("update-me", {
        username: state.user?.username,
        room: state.currentSketch,
      });
    });

    // removing the user to state.currentOnline
    state.socketClient?.on("remove-user", ({ username }) => {
      dispatch({
        type: ActionType.RemoveCurrentOnline,
        payload: { username: username },
      });
    });

    // adding the user to state.currentOnline
    state.socketClient?.on("update-user", ({ username }) => {
      if (state.user?.username !== username) {
        dispatch({
          type: ActionType.AddCurrentOnline,
          payload: { username: username },
        });
      }
    });

    return () => {
      //state.socketClient?.off("get-points");
      state.socketClient?.off("get-point");
      state.socketClient?.off("remove-user");
      state.socketClient?.off("add-user");
      state.socketClient?.off("update-user");
    };
  }, [state.currentSketch]);

  // sending drawn point to connected socket-clients
  const sendPoint = (pingPoint: any) => {
    state.socketClient?.emit("send-point", {
      point: pingPoint,
      room: state.currentSketch,
      username: state.user?.username,
    });
  };

  return (
    <div className="-z-10 fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
      <div className="border-4" ref={ref}></div>
      {appRef.current === null && (
        <div className="text-4xl font-semibold"> Chooose a Sketch </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Canvas;
