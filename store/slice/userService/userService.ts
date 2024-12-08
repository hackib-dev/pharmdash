/* eslint-disable no-param-reassign */

"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sessionStorageName } from "@/app/config";
import { User } from "@/types.ts";

let sessionStorageState;
if (typeof window !== "undefined") {
  sessionStorageState = sessionStorage.getItem(sessionStorageName);
}

interface UserState {
  user: Partial<User>;
}

const initialState: UserState = sessionStorageState
  ? {
      user: { ...JSON.parse(sessionStorageState) },
    }
  : {
      user: {
        isAuthenticated: false,
      },
    };

const userServiceSlice = createSlice({
  name: "userService",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...action.payload,
      };
      sessionStorage.setItem(
        sessionStorageName,
        JSON.stringify(action.payload)
      );
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state?.user) {
        state.user = { ...state.user, ...action.payload };
        sessionStorage.setItem(sessionStorageName, JSON.stringify(state.user));
      }
    },
    logoutUser: (state) => {
      state.user = {
        ...{
          email: state.user.email,
          isAuthenticated: false,
        },
      };
      sessionStorage.setItem(sessionStorageName, JSON.stringify(state.user));
    },
  },
});

export const { setUser, updateUser, logoutUser } = userServiceSlice.actions;

export default userServiceSlice.reducer;
