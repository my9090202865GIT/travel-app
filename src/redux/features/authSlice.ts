import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../../models/AuthSlice";

interface LoginProps {
  username: string;
  password: string;
}

const initialState: AuthSlice = {
  isLoggedIn:
    localStorage.getItem("username") !== null &&
    localStorage.getItem("username") !== undefined &&
    localStorage.getItem("username") !== "",
  modalOpen: true,
  username: localStorage.getItem("username") ?? "",
  users: []
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, modalOpen: action.payload };
    },
    doLogin: (state, action: PayloadAction<LoginProps>) => {
      if (
        state.users.filter((user) => user.username === action.payload.username && user.password == action.payload.password).length !== 0
      ) {
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("password", action.payload.password);
        localStorage.setItem("email", state.users.filter((user) => user.username === action.payload.username)[0].email)
        return {
          ...state,
          username: action.payload.username,
          modalOpen: false,
          isLoggedIn: true,
        };
      } else {
        return state;
      }
    },
    doSignUp: (state, action) => {
      return { ...state, users: [...state.users, action.payload] };
    },
    doLogout: (state) => {
      localStorage.clear()
      return { ...state, username: "", isLoggedIn: false };
    },
  }
});

export const { updateModal, doLogin, doLogout, doSignUp } = authSlice.actions;
export default authSlice.reducer;
