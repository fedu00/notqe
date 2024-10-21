import { RootState } from "@/redux/store";

export const getUserData = (state: RootState) => state.userData;
export const getUserName = (state: RootState) => state.userData.username;
export const getUserId = (state: RootState) => state.userData.userId;
export const getUserEmail = (state: RootState) => state.userData.email;
export const getUserDoneTasks = (state: RootState) => state.userData.doneTasks;
