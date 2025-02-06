import axios from "axios";

const API_URL = "http://localhost:8000";

// Fetch all jobs
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/organization/job`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// Get a specific job by ID
export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/organization/job/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

// Update a job
export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(
      `${API_URL}/organization/job/${id}`,
      jobData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/organization/job/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
