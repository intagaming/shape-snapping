import { useElementSize } from "usehooks-ts";

const Canvas = () => {
  const [measuingDivRef, { width, height }] = useElementSize();

  // TODO: rerender canvas on size change

  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col">
      <div className="h-8 bg-green-400">Toolbar</div>

      {/* Measuring div. Size will be used for canvas. */}
      <div ref={measuingDivRef} className="flex-1">
        <canvas width={width} height={height} className="bg-orange-200">
          Canvas
        </canvas>
      </div>
    </div>
  );
};

export default Canvas;
