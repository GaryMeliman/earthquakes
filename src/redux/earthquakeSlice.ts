import { createSlice } from '@reduxjs/toolkit';

const earthquakeSlice = createSlice({
    name: 'earthquake',
    initialState: {},
    reducers: {
        setEarthquake(_state, action) {
            return action.payload;
        },
    },
});

export const { setEarthquake } = earthquakeSlice.actions;
export default earthquakeSlice.reducer;