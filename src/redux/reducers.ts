import { combineReducers } from '@reduxjs/toolkit';
import earthquakeSlice from './earthquakeSlice';

const rootReducer = combineReducers({
    earthquake: earthquakeSlice,
});

export default rootReducer;