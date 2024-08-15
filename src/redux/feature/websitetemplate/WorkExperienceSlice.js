import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage"; // Update the import path

const defaultWorkExperienceData = {
  developer: [
    {
      job_title: "Frontend Developer",
      work_address: "Specialized in software development, completed a capstone project on web-based inventory systems, and was an active member of the coding club.",
      company_name: "TechSolutions Inc. (2022-Present)",
      hired_date: "2023-01-01T00:00:00Z",
      achievements: "Developed key features",
      job_description: "Developed responsive user interfaces using React.js, collaborating with backend teams for seamless integration and working closely with UX/UI designers to enhance user experience.",
      position: "Bachelor of Science in Computer Science",
      responsibility: "University of Technology (2015-2019)",
     
    },
    {
      job_title: "Frontend Developer",
      work_address: "Specialized in software development, completed a capstone project on web-based inventory systems, and was an active member of the coding club.",
      company_name: "TechSolutions Inc. (2022-Present)",
      hired_date: "2023-01-01T00:00:00Z",
      achievements: "Developed key features",
      job_description: "Developed responsive user interfaces using React.js, collaborating with backend teams for seamless integration and working closely with UX/UI designers to enhance user experience.",
      position: "Bachelor of Science in Computer Science",
      responsibility: "University of Technology (2015-2019)",
     
    },
    {
      job_title: "Frontend Developer",
      work_address: "Specialized in software development, completed a capstone project on web-based inventory systems, and was an active member of the coding club.",
      company_name: "TechSolutions Inc. (2022-Present)",
      hired_date: "2023-01-01T00:00:00Z",
      achievements: "Developed key features",
      job_description: "Developed responsive user interfaces using React.js, collaborating with backend teams for seamless integration and working closely with UX/UI designers to enhance user experience.",
      position: "Bachelor of Science in Computer Science",
      responsibility: "University of Technology (2015-2019)",
     
    },
    // Add more entries if needed
  ],
  marketing: [
    {
      job_title: "Marketing Manager",
      hired_date: "2023-01-01T00:00:00Z",
      achievements: "Led successful campaigns",
      job_description: "Managing marketing efforts",
      position: "Manager",
      responsibility: "Overseeing marketing strategies",
      work_address: "456 Market St",
      company_name: "Brand Inc.",
    },
    // Add more entries if needed
  ],
  photography: [
    {
      job_title: "Photographer",
      hired_date: "2023-01-01T00:00:00Z",
      achievements: "Captured high-quality images",
      job_description: "Taking photos",
      position: "Photographer",
      responsibility: "Managing photography sessions",
      work_address: "789 Photo Blvd",
      company_name: "Photo Studio",
    },
    // Add more entries if needed
  ],
  business: [
    {
      job_title: "Business Analyst",
      hired_date: "2023-01-01T00:00:00Z",
      achievements: "Improved business processes",
      job_description: "Analyzing business data",
      position: "Analyst",
      responsibility: "Evaluating company operations",
      work_address: "101 Biz St",
      company_name: "Business Corp.",
    },
    // Add more entries if needed
  ],
};

export const fetchWorkExperiences = createAsyncThunk(
  "workExperiences/fetchWorkExperiences",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}work-experiences/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultWorkExperienceData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If 404 error, return default data based on the template
        return defaultWorkExperienceData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

export const createWorkExperience = createAsyncThunk(
  "workExperiences/createWorkExperience",
  async (workExperience, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}work-experiences/`,
        workExperience,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error
        throw error;
      }
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const updateWorkExperience = createAsyncThunk(
  "workExperiences/updateWorkExperience",
  async (workExperience, { rejectWithValue }) => {
    console.log("workExperience.id",workExperience.id)
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}work-experiences/${workExperience.id}`,
        {
          job_title: workExperience.job_title,
          hired_date: workExperience.hired_date,
          achievements: workExperience.achievements,
          job_description: workExperience.job_description,
          position: workExperience.position,
          responsibility: workExperience.responsibility,
          work_address: workExperience.work_address,
          company_name: workExperience.company_name,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error
        throw error;
      }
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const workExperiencesSlice = createSlice({
  name: "workExperiences",
  initialState: {
    workExperiences: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkExperiences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkExperiences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workExperiences = action.payload;
      })
      .addCase(fetchWorkExperiences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(updateWorkExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWorkExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.workExperiences.findIndex(
          (experience) => experience.id === action.payload.id
        );
        if (index !== -1) {
          state.workExperiences[index] = action.payload;
        }
      })
      .addCase(updateWorkExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

// Selector to fetch work experiences
export const selectWorkExperiences = (state) => state.workExperiences.workExperiences;

export default workExperiencesSlice.reducer;
