import { Application, Graphics, InteractionEvent } from "pixi.js";

import { useEffect, useState, useRef } from "react";

import pointsJSON from "../assets/sample.json";

const Canvas = () => {
  // ref to canvas
  const ref = useRef<HTMLDivElement | null>(null);
  const graphicsRef = useRef<Graphics>();
  const appRef = useRef<Application>();

  // Drawing
  const [points, setPoints] = useState<
    {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    }[]
  >(pointsJSON.points);

  // isDrawing
  const [isDrawing, _setIsDrawing] = useState(false);
  const isDrawingRef = useRef(isDrawing);
  function setIsDrawing(value: boolean) {
    _setIsDrawing(value);
    console.log(value);
    isDrawingRef.current = value;
  }

  // prevX
  const [prevX, _setPrevX] = useState(0);
  const prevXRef = useRef(prevX);
  function setPrevX(value: number) {
    _setPrevX(value);
    console.log(value);
    prevXRef.current = value;
  }

  // prevY
  const [prevY, _setPrevY] = useState(0);
  const prevYRef = useRef(prevY);
  function setPrevY(value: number) {
    _setPrevY(value);
    console.log(value);
    prevYRef.current = value;
  }

  // Handlers
  const movemouseHandler = (e: InteractionEvent, graphics: Graphics) => {
    // console.log(isDrawingRef.current);
    if (isDrawingRef.current === true) {
      if (
        prevXRef.current === e.data.global.x &&
        prevYRef.current === e.data.global.y
      ) {
        setIsDrawing(false);
        return;
      }
      const points = {
        x1: prevXRef.current,
        y1: prevYRef.current,
        x2: e.data.global.x,
        y2: e.data.global.y,
      };
      setPoints((prev) => {
        return [...prev, points];
      });
      graphics.moveTo(prevXRef.current, prevYRef.current);
      graphics.lineTo(e.data.global.x, e.data.global.y);
      setPrevX(e.data.global.x);
      setPrevY(e.data.global.y);
    }
  };

  const mousedownHandler = (e: InteractionEvent) => {
    setIsDrawing(true);
    setPrevX(e.data.global.x);
    setPrevY(e.data.global.y);
    // console.log("UP", isDrawingRef.current);
  };

  const mouseupHandler = () => {
    setIsDrawing(false);
    // console.log("DOWN", isDrawingRef.current);
  };

  const loadSketch = () => {
    if (points) {
      for (var i = 0; i < points.length; i++) {
        graphicsRef.current?.lineStyle(2, 0x000000, 1);
        graphicsRef.current?.moveTo(points[i].x1, points[i].y1);
        graphicsRef.current?.lineTo(points[i].x2, points[i].y2);
      }
    }
  };

  useEffect(() => {
    console.log("EFFECT", appRef.current !== null);
    if (appRef.current !== null) {
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
      graphics.lineStyle(2, 0x000000, 1);
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
      graphics.on("mousemove", (e: InteractionEvent) => {
        movemouseHandler(e, graphics);
      });

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
  }, []);

  return (
    <div className="fixed top-0 left-0 -z-10 w-screen h-screen flex flex-col justify-center items-center">
      <div ref={ref}></div>
    </div>
  );
};

export default Canvas;
  