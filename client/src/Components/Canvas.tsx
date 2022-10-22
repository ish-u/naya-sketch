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

  // Handlers
  const mousemoveHandler = (e: InteractionEvent) => {
    if (isDrawingRef.current === true && state.user) {
      const points = {
        x1: prevXRef.current,
        y1: prevYRef.current,
        x2: e.data.global.x,
        y2: e.data.global.y,
      };
      setPoints(points);
      console.log(parseInt("0x" + state.collaboraters[state.user?.username]));
      graphicsRef.current?.lineStyle(
        2,
        state.user
          ? parseInt("0x" + state.collaboraters[state.user?.username])
          : 0xffffff,
        1
      );
      graphicsRef.current?.moveTo(prevXRef.current, prevYRef.current);
      graphicsRef.current?.lineTo(e.data.global.x, e.data.global.y);
      setPrevX(e.data.global.x);
      setPrevY(e.data.global.y);
    }
  };

  const mousedownHandler = (e: InteractionEvent) => {
    setIsDrawing(true);
    setPrevX(e.data.global.x);
    setPrevY(e.data.global.y);
  };

  const mouseupHandler = async () => {
    setIsDrawing(false);
    sendData(pointsRef.current);
    pointsRef.current = [];
  };

  // loading the saved Sketch
  const loadSketch = async () => {
    setLoading(true);
    _setPoints([]);
    pointsRef.current = [];
    // getting the saved Sketch
    const res = await fetch(
      import.meta.env.VITE_APP_API + "/sketch/get/" + state.currentSketch,
      { credentials: "include" }
    );
    // checking if the sketch exists
    if (res.status !== 404) {
      // data returned from request
      const data = await res.json();
      // extracting the saved points from response
      const pointsData: {
        points: {
          x1: number;
          y1: number;
          x2: number;
          y2: number;
        }[];
        sketchedBy: string;
      }[] = data.data;
      // old collaboraters of the sketch
      const sketchCollaboraters: string[] = data.collaboraters;
      var sketchPoints: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        sketchedBy: string;
      }[] = [];

      const collaboraters: Record<string, string> = {};

      // setting the collaboraters and their colors
      for (var i = 0; i < sketchCollaboraters.length; i++) {
        collaboraters[sketchCollaboraters[i]] = getRandomColor();
        dispatch({
          type: ActionType.SetCollaboraters,
          payload: {
            collaborater: sketchCollaboraters[i],
            color: collaboraters[sketchCollaboraters[i]],
          },
        });
      }

      // setting the color for current user
      if (state.user && !state.collaboraters[state.user?.username]) {
        collaboraters[state.user?.username] = getRandomColor();
        dispatch({
          type: ActionType.SetCollaboraters,
          payload: {
            collaborater: state.user.username,
            color: collaboraters[state.user.username],
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

      // draw the sketchPoints
      if (sketchPoints) {
        for (var i = 0; i < sketchPoints.length; i++) {
          graphicsRef.current?.lineStyle(
            2,
            parseInt("0x" + collaboraters[sketchPoints[i].sketchedBy]),
            1
          );
          graphicsRef.current?.moveTo(sketchPoints[i].x1, sketchPoints[i].y1);
          graphicsRef.current?.lineTo(sketchPoints[i].x2, sketchPoints[i].y2);
        }
      }
    }
    setLoading(false);
  };

  // send data
  const sendData = async (
    pointsToSend: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[]
  ) => {
    const res = await fetch(import.meta.env.VITE_APP_API + "/sketch/update", {
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
    console.log(res.status);
    sendPoints(pointsToSend);
  };

  useEffect(() => {
    if (state.currentSketch !== "") {
      // On first render create our application
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

      graphicsRef.current = graphics;
      appRef.current = app;

      loadSketch();

      state.socketClient?.emit("join-room", {
        room: state.currentSketch,
        username: state.user?.username,
      });
      return () => {
        // On unload completely destroy the application and all of it's children
        console.log("DESTROYED");
        state.socketClient?.emit("leave-room", {
          room: state.currentSketch,
          username: state.user?.username,
        });
        dispatch({ type: ActionType.ClearCurrentOnline });
        app.destroy(true, true);
      };
    }
  }, [state.currentSketch]);

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

  // Socket
  useEffect(() => {
    // get points form other collaboraters
    state.socketClient?.on(
      "get-points",
      ({ collaboratersPoints, username }) => {
        if (username !== state.user?.username) {
          /*var code = state.collaboraters[username]
            ? state.collaboraters[username]
            : null;
          if (code === null) {
            code = getRandomColor();
            state.collaboraters[username] = code;
            dispatch({
              type: ActionType.SetCollaboraters,
              payload: {
                collaborater: username,
                color: code,
              },
            });
          }*/
          for (var i = 0; i < collaboratersPoints.length; i++) {
            graphicsRef.current?.lineStyle(
              2,
              parseInt("0x" + state.collaboraters[username]),
              1
            );
            graphicsRef.current?.moveTo(
              collaboratersPoints[i].x1,
              collaboratersPoints[i].y1
            );
            graphicsRef.current?.lineTo(
              collaboratersPoints[i].x2,
              collaboratersPoints[i].y2
            );
          }
        }
      }
    );

    state.socketClient?.on("add-user", ({ username }) => {
      console.log("Added", username);
      dispatch({
        type: ActionType.AddCurrentOnline,
        payload: { username: username },
      });
      state.socketClient?.emit("update-me", {
        username: state.user?.username,
        room: state.currentSketch,
      });
    });

    state.socketClient?.on("remove-user", ({ username }) => {
      console.log("Remove", username);
      dispatch({
        type: ActionType.RemoveCurrentOnline,
        payload: { username: username },
      });
    });

    state.socketClient?.on("update-user", ({ username }) => {
      console.log("Update", username);
      if (state.user?.username !== username) {
        dispatch({
          type: ActionType.AddCurrentOnline,
          payload: { username: username },
        });
      }
    });

    return () => {
      state.socketClient?.off("get-points");
      state.socketClient?.off("remove-user");
      state.socketClient?.off("add-user");
      state.socketClient?.off("update-user");
    };
  }, [state.currentSketch]);

  // sending drawn arc to connected socket-clients
  const sendPoints = (pingPoints: any) => {
    state.socketClient?.emit("send-points", {
      points: pingPoints,
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
      {loading && <Loader />}
    </div>
  );
};

export default Canvas;
