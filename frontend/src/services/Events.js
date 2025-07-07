import axios from "axios";
import FetchErrorHandler from "./FetchErrorHandler";
import objectToQueryString from "../utils/objectToQueryString";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEvents = FetchErrorHandler(async (queryParameters) => {
    // {page: 3, search: "sfa"}
        if (!queryParameters || typeof queryParameters !== 'object') {
            throw new Error("Invalid query parameters");
        }

        const queryString = objectToQueryString(queryParameters);
        const response = await axios.get(`${API_BASE_URL}/events/${queryString}`);

        return response.data;
    }
);

