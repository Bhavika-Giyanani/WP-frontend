import axios from "axios";

const API_URL = "http://localhost:8000";

// Create a new job application
export const createApplication = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/job-application`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

// Fetch job applications (optional filter by jobId)
export const getApplications = async (jobId = null) => {
  try {
    const url = jobId ? `${API_URL}/job-applications?jobId=${jobId}` : `${API_URL}/job-applications`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};
