import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import create from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createVanilla, { StateCreator } from "zustand/vanilla";
import { createShapeSlice, ShapeSlice } from "./shape";

type CanvasMainSlice = {};

export type CanvasStore = ShapeSlice & CanvasMainSlice;
export type CanvasStoreMiddlewares = [
  ["zustand/devtools", never],
  ["zustand/subscribeWithSelector", never],
  ["zustand/immer", never]
];

const createMainSlice: StateCreator<
  CanvasStore,
  CanvasStoreMiddlewares,
  [],
  CanvasMainSlice
> = () => ({});

const createCanvasStore = () =>
  createVanilla<CanvasStore>()(
    devtools(
      subscribeWithSelector(
        immer((...a) => ({
          ...createMainSlice(...a),
          ...createShapeSlice(...a),
        }))
      )
    )
  );
const CanvasContext = createContext<
  ReturnType<typeof createCanvasStore> | undefined
>(undefined);

const stores: { [id: string]: ReturnType<typeof createCanvasStore> } = {};

export const CanvasProvider = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const [store, setStore] = useState(stores[id]);

  if (!stores[id]) {
    stores[id] = createCanvasStore();
    setStore(stores[id]);
  }

  useEffect(() => {
    return () => {
      delete stores[id];
    };
  }, [id]);

  return (
    <CanvasContext.Provider value={store}>{children}</CanvasContext.Provider>
  );
};
export const useCanvasStore = () => {
  const canvasStore = useContext(CanvasContext);
  if (!canvasStore)
    throw new Error("useCanvasStore must be used within a CanvasProvider");
  return create(canvasStore);
};
