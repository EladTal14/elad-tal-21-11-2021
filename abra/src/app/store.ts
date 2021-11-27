import {configureStore} from '@reduxjs/toolkit';
import {tempSlice} from "../features/temparture/tempSlice";
import {favouriteSlice} from "../features/favouritesSlice";
import {locationSlice} from "../features/location/locationSlice";
import {utilSlice} from "../features/utilSlice";

export const store = configureStore({
  reducer: {
    temp: tempSlice.reducer,
    favourites: favouriteSlice.reducer,
    location: locationSlice.reducer,
    util: utilSlice.reducer
  },

});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
