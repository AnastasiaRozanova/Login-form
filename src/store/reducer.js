import { handleActions } from "redux-actions";
import { setUser, removeUser, setNotificationInfo } from "./actions";

const initialState = {
  user: {
    email: null,
    token: null,
    id: null,
  },
  notificationInfo: {
    isVisible: false,
    type: "error",
    message: "",
  },
};

export const rootReducer = handleActions(
  {
    [setUser]: (state, action) => ({
      ...state,
      user: {
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
      },
    }),
    [removeUser]: (state, action) => ({
      ...state,
      user: initialState.user,
    }),
    [setNotificationInfo]: (state, action) => ({
      ...state,
      notificationInfo: action.payload,
    }),
  },
  initialState
);
