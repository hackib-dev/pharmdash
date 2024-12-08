import { combineReducers } from '@reduxjs/toolkit';
import userServiceReducer from './slice/userService/userService';

const rootReducer = combineReducers({
  userService: userServiceReducer
});

export default rootReducer;
