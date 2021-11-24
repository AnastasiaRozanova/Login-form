import { createSelector } from "reselect";

export const getUserInfo = createSelector(
  (state) => state.user,
  (user) => user
);
export const getNotificationInfo = createSelector(
  (state) => state.notificationInfo,
  (info) => info
);
