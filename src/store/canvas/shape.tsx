import { StateCreator } from "zustand";
import { nanoid } from "nanoid";

import { CanvasStore, CanvasStoreMiddlewares } from ".";

type Setter = Parameters<typeof createShapeSlice>[0];
type Getter = Parameters<typeof createShapeSlice>[1];

interface Shape {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Rectangle extends Shape {}

interface AddShapeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ShapeSlice = {
  shapes: { [id: string]: Shape };
  addRect: (options: AddShapeOptions) => Rectangle;
};

export const createShapeSlice: StateCreator<
  CanvasStore,
  CanvasStoreMiddlewares,
  [],
  ShapeSlice
> = (set, get, store) => ({
  shapes: {},
  addRect: ({ x, y, width, height }) => {
    const rect: Rectangle = {
      id: "rect-" + nanoid(),
      x,
      y,
      width,
      height,
    };
    set((state) => {
      state.shapes[rect.id] = rect;
    });
    return rect;
  },
});
