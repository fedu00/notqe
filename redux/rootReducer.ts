import { combineReducers } from "redux";
import authReducer from "./store/authSlice";
import userDataReducer from "./store/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
});

export default rootReducer;
