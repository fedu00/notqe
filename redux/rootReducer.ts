import { combineReducers } from "redux";
import authReducer from "./store/authSlice"; // Example slice
import iuReducer from "./store/uiSlice";
import userDataReducer from "./store/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: iuReducer,
  userData: userDataReducer,
  // Dodaj inne reducery tutaj
});

export default rootReducer;
