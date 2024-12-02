import { combineReducers } from "redux";
import userDataReducer from "./slices/userSlice/userSlice";

const rootReducer = combineReducers({
  userData: userDataReducer,
});

export default rootReducer;
