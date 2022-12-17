import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { useElementSize } from "usehooks-ts";
import { CanvasProvider, useCanvasStore } from "../store/canvas";

const CanvasContent = () => {
  const shapes = useCanvasStore()((state) => state.shapes);
  const addRect = useCanvasStore()((state) => state.addRect);

  const [measuingDivRef, { width, height }] = useElementSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // TODO: rerender canvas on size change

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    Object.values(shapes).forEach((shape) => {
      ctx.fillStyle = "red";
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    });
  }, [height, shapes, width]);

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col">
      <div className="h-8 bg-green-400">
        <button
          onClick={() => {
            addRect({ height: 100, width: 100, x: 100, y: 100 });
          }}
        >
          Add Rectangle
        </button>
      </div>

      {/* Measuring div. Size will be used for canvas. */}
      <div ref={measuingDivRef} className="flex-1">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="bg-orange-200"
        >
          Canvas
        </canvas>
      </div>
    </div>
  );
};

const Canvas = () => {
  return (
    <CanvasProvider id={nanoid()}>
      <CanvasContent />
    </CanvasProvider>
  );
};

export default Canvas;
