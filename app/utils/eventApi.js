import axios from "axios";

const API_URL = "http://localhost:8000";

//^ create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      `${API_URL}/organization/event`,
      eventData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

//^ get all events
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
