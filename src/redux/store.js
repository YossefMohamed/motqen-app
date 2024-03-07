import { configureStore } from "@reduxjs/toolkit";
import { actionsTypes } from "../helpers/constants";
import apiSlice from "./features/api/apiSlice";
import userSlice from "./features/api/userSlice";

export const store = configureStore({
  reducer: {
    checker: apiSlice,
    user: userSlice,
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
