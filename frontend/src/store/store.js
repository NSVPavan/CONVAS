import { configureStore } from "@reduxjs/toolkit";
import whiteboardSliceReducer from "./../components/Whiteboard/whiteboardSlice";
import cursorSliceReducer from "./../components/CursorOverlay/cursorSlice";

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer,
    cursor: cursorSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["whiteboard/setElements"],
        ignoredPaths: ["whiteboard.elements"],
      },
    }),
});
