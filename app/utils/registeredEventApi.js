import axios from "axios";

const API_URL = "http://localhost:8000";

//^ fetch all event registrations
export const fetchEventRegistrations = async () => {
  try {
    const response = await axios.get(`${API_URL}/event_registrations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    throw error;
  }
};

//^ register a new event
export const registerEvent = async (registrationData) => {
  try {
    const response = await axios.post(
      `${API_URL}/event_registration/`,
      registrationData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering event:", error);
    throw error;
  }
};

//^ get applicants of a specific event
export const getApplicantsForEvent = async (event_id) => {
    try {
      const response = await axios.get(
        `${API_URL}/event_registrations/registrations/${event_id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching applicants for event ${event_id}:`, error);
      throw error;
    }
  };
//^ count applicants for a specific event
export const countApplicantsForEvent = async (event_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/event_registrations/count/${event_id}`
    );
    return response.data.count;
  } catch (error) {
    console.error("Error counting applicants for event:", error);
    throw error;
  }
};
