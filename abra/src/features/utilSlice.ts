import {createSlice} from '@reduxjs/toolkit';


export interface utilState {
  theme: string;
}

const initialState: utilState = {
  theme: 'light'
};

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    changeTheme: (state, {payload}) => {
      state.theme = payload;
    },
  },

});


export const {changeTheme} = utilSlice.actions;
