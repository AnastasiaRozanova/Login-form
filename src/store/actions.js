import { createActions } from "redux-actions";

export const { setUser, removeUser, setNotificationInfo } = createActions(
  "SET_USER",
  "REMOVE_USER",
  "SET_NOTIFICATION_INFO"
);
