import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

function saveStateToLocalStorage(state) {
  try {
    const jsonUserState = JSON.stringify(state);
    localStorage.setItem("userState", jsonUserState);
  } catch (error) {
    console.log("Could not save state", error);
  }
}

function loadStateFromLocalStorage() {
  try {
    const jsonUserState = localStorage.getItem("userState");
    if (jsonUserState === null) return undefined;
    return JSON.parse(jsonUserState);
  } catch (error) {
    console.log("Could not load state", error);
  }
}

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => saveStateToLocalStorage(store.getState()));

export default store;

export type RootState = ReturnType<typeof store.getState>;
