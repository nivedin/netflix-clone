import { createSlice } from '@reduxjs/toolkit';

export const planSlice = createSlice({
  name: 'plan',
  initialState: {
    plan: null,
  },
  reducers: {
    plan:(state,action) => {
      state.plan  =action.payload;
    },
  },
});

export const { plan } = planSlice.actions;

export const selectPlan = state => state.plan.plan;

export default planSlice.reducer;
