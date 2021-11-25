import {configureStore} from '@reduxjs/toolkit';
import {tempSlice} from "../features/temparture/tempSlice";
import {favouriteSlice} from "../features/favouritesSlice";
import {locationSlice} from "../features/location/locationSlice";

export const store = configureStore({
  reducer: {
    temp: tempSlice.reducer,
    favourites: favouriteSlice.reducer,
    location: locationSlice.reducer
  },

});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
