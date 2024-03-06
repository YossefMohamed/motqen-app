import { configureStore } from "@reduxjs/toolkit";
import { actionsTypes } from "../helpers/constants";
import apiSlice from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    checker: apiSlice,
    isOpenHistoryPanel: (state = false, action) => {
      if (action.type === actionsTypes.TOGGLE_HISTORY_PANEL) {
        return !state;
      }
      if (action.type === actionsTypes.TOGGLE_HISTORY_PANEL_FALSE) {
        return false;
      }
      return state;
    },
  },
  devTools: process.env !== "production",

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});
