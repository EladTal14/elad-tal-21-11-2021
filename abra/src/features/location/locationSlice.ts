import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchLocation} from './locationAPI';

export interface LocationState {
  value: any;
  status: 'idle' | 'loading' | 'failed';
  city: { name: string, key: string }
}

const initialState: LocationState = {
  value: [],
  status: 'idle',
  city: {name: 'Tel Aviv', key: '215854'}
};


export const getLocationAsync = createAsyncThunk(
  'location/fetchLocation',
  async (userInput: string) => {
    return await fetchLocation(userInput);
  }
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{ name: string, key: string }>) => {
      state.city = {...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLocationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addDefaultCase((state, action) => {
      })
  },
});

export const {changeCity} = locationSlice.actions;

export default locationSlice.reducer;
