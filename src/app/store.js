import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import planReducer from '../features/planSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    plan:planReducer,
  },
});
