import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchFiveDayTemp, fetchOneDayTemp} from "./tempAPI";
import {UnitScale} from "../../enum/unit-scale";
import {LoadingState} from "../../enum/loading-state";

export interface tempState {
  value: string;
  status: string;
  oneDay: DayTemp;
  fiveDaysTemp: DayTemp[];
}

type DayTemp = {
  Date: string;
  Day: any;
  Temperature: any;
}
const initialState: tempState = {
  value: UnitScale.Celsius,
  status: LoadingState.Idle,
  oneDay: {Date: '', Day: {}, Temperature: {}},
  fiveDaysTemp: []
};

export const getTempOneDaySync = createAsyncThunk(
  'temp/fetchOneDay',
  async (cityId: string) => {
    return await fetchOneDayTemp(cityId);
  }
);
export const getTempFiveDaySync = createAsyncThunk(
  'temp/fetchFiveDaysTemp',
  async (cityId: string) => {
    return await fetchFiveDayTemp(cityId);
  }
);

export const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    changeTemp: (state, {payload}) => {
      state.value = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTempOneDaySync.pending, (state) => {
        state.status = LoadingState.Loading;
      })
      .addCase(getTempOneDaySync.fulfilled, (state, action) => {
        state.status = LoadingState.Idle;
        state.oneDay = action.payload;
      })
      .addCase(getTempFiveDaySync.pending, (state) => {
        state.status = LoadingState.Loading;
      })
      .addCase(getTempFiveDaySync.fulfilled, (state, action) => {
        state.status = LoadingState.Idle;
        state.fiveDaysTemp = action.payload;
      })
      .addDefaultCase((state, action) => {
      })
  },

});


export const {changeTemp} = tempSlice.actions;


export default tempSlice.reducer;
