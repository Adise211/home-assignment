import { createSlice } from "@reduxjs/toolkit";

export interface FeatureFlagsState {
  isTableConfigPageEnabled: boolean;
  isTableConfigSliderEnabled: boolean;
}

const initialState: FeatureFlagsState = {
  isTableConfigPageEnabled: true,
  isTableConfigSliderEnabled: true,
};

export const featureFlagsSlice = createSlice({
  name: "featureFlags",
  initialState,
  reducers: {
    toggleTableConfigPage: (state) => {
      state.isTableConfigPageEnabled = !state.isTableConfigPageEnabled;
    },
    toggleTableConfigSlider: (state) => {
      state.isTableConfigSliderEnabled = !state.isTableConfigSliderEnabled;
    },
  },
});

export const { toggleTableConfigPage, toggleTableConfigSlider } =
  featureFlagsSlice.actions;

export default featureFlagsSlice.reducer;
