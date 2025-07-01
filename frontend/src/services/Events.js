import axios from "axios";
import FetchErrorHandler from "./FetchErrorHandler";

const API_BASE_URL = "http://localhost:4000/api";

export const getEvents = FetchErrorHandler(async () => {
        const response = await axios.get(`${API_BASE_URL}/events`);
        return response.data;
    }
);
