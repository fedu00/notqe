import { combineReducers } from "redux";
import authReducer from "./slices/authSlice/authSlice";
import userDataReducer from "./slices/userSlice/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
});

export default rootReducer;
