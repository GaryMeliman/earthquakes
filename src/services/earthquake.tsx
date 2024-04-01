import { Dispatch } from "redux";
import RequestHelper from "../utils/RequestHelper";
import { setEarthquake } from "../redux/earthquakeSlice";

const URL_API = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";
const URL_COUNT_API = "https://earthquake.usgs.gov/fdsnws/event/1/count?";

export const getEarthquakes = async (dispatch: Dispatch, query?: string) => dispatch(setEarthquake((await RequestHelper(`${URL_API}&limit=200${query ? query : ''}`))?.data));
export const getCountEarthquakes = async (query?: string) => (await RequestHelper(`${URL_COUNT_API}&limit=200${query}`))?.data;
