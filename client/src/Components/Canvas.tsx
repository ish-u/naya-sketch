import { Application, Graphics, InteractionEvent } from "pixi.js";

import { useEffect, useState, useRef, useContext } from "react";
import { ActionType } from "../context/actions";
import { AppContext } from "../context/context";

//import pointsJSON from "../assets/sample.json";

const Canvas = () => {
  // context
  const { state, dispatch } = useContext(AppContext);
  // ref to canvas
  const ref = useRef<HTMLDivElement | null>(null);
  const graphicsRef = useRef<Graphics | null>(null);
  const appRef = useRef<Application | null>(null);
  const [collaboraters, setCollaboraters] = useState<Record<string, string>>(
    {}
  );
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
    if (isDrawingRef.current === true) {
      const points = {
        x1: prevXRef.current,
        y1: prevYRef.current,
        x2: e.data.global.x,
        y2: e.data.global.y,
      };
      setPoints(points);
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
    // adding the current user as collaboraters if it's their first time drawing
    if (state.user && !collaboraters[state.user?.username]) {
      collaboraters[state.user?.username] = Math.floor(
        Math.random() * 16777215
      ).toString(16);
      dispatch({
        type: ActionType.SetCollaboraters,
        payload: {
          collaborater: state.user?.username,
          color: collaboraters[state.user?.username],
        },
      });
    }
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
    _setPoints([]);
    pointsRef.current = [];
    const res = await fetch(
      import.meta.env.VITE_APP_API + "/sketch/get/" + state.currentSketch,
      { credentials: "include" }
    );
    if (res.status !== 404) {
      const data = await res.json();
      const pointsData: {
        points: {
          x1: number;
          y1: number;
          x2: number;
          y2: number;

          sketchedBy: string;
        }[];
        sketchedBy: string;
      }[] = data.data;
      const sketchCollaboraters: string[] = data.collaboraters;
      const owner = data.owner;
      var sketchPoints: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        sketchedBy: string;
      }[] = [];

      // owner
      collaboraters[owner] = Math.floor(Math.random() * 16777215).toString(16);
      dispatch({
        type: ActionType.SetCollaboraters,
        payload: {
          collaborater: owner,
          color: collaboraters[owner],
        },
      });

      for (var i = 0; i < sketchCollaboraters.length; i++) {
        if (sketchCollaboraters[i] !== owner) {
          collaboraters[sketchCollaboraters[i]] = Math.floor(
            Math.random() * 16777215
          ).toString(16);

          dispatch({
            type: ActionType.SetCollaboraters,
            payload: {
              collaborater: sketchCollaboraters[i],
              color: collaboraters[sketchCollaboraters[i]],
            },
          });
        }
      }

      pointsData.map(
        (points) =>
          (sketchPoints = [
            ...sketchPoints,
            ...points.points.map((point) => {
              return { ...point, sketchedBy: points.sketchedBy };
            }),
          ])
      );
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
  };

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

      return () => {
        // On unload completely destroy the application and all of it's children
        console.log("DESTROYED");
        app.destroy(true, true);
      };
    }
  }, [state.currentSketch]);

  return (
    <div className="fixed top-0 left-0 -z-10 w-screen h-screen flex flex-col justify-center items-center">
      <div className="border-4" ref={ref}></div>
      {appRef.current === null && (
        <div className="text-4xl font-semibold"> Chooose a Sketch </div>
      )}
    </div>
  );
};

export default Canvas;
