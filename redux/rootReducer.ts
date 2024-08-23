import { combineReducers } from "redux";
import authReducer from "./authSlice"; // Example slice

const rootReducer = combineReducers({
  auth: authReducer,
  // Dodaj inne reducery tutaj
});

export default rootReducer;
