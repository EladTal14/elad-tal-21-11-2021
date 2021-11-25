import {createSlice} from '@reduxjs/toolkit';

export interface favouriteState {
  favourites: Favourite[];
}

type Favourite = {
  name: string;
  key: string;
  temp: number;
  behaviour: string;
}
const initialState: favouriteState = {
  favourites: [],
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavourite: (state, {payload}) => {
      state.favourites.push(payload);
    },
    removeFavourite: (state, {payload}) => {
      const favIndex = state.favourites.findIndex((fav: Favourite) => fav.name === payload)
      state.favourites.splice(favIndex, 1)
    },
  },

});

export const {addFavourite, removeFavourite} = favouriteSlice.actions;


export default favouriteSlice.reducer;