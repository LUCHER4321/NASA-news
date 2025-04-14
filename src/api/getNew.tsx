import { New } from "../classes/New";
import { dateToString } from "../functions/dateToString";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/planetary/apod`;

export const getNew = async (day: Date | undefined = undefined) => {
    try{
        const url = `${API_URL}?api_key=${API_KEY}${day ? `&date=${dateToString(day)}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return new New(data.title, data.date, data.explanation, data.url, data.hdurl);
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};