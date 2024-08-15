import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage"; // Update the import path

const defaultSkillsData = {
  developer: [
    {
      title: "Python",
      image: ["https://res.cloudinary.com/de6atvipk/image/upload/c_thumb,w_200,g_face/v1722812052/pythonImg-topaz-enhance-4x_a4bfan.png"], 
      description: "Python programming language",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "JavaScript",
      image: ["https://images.pexels.com/photos/27579753/pexels-photo-27579753.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"], 
      description: "JavaScript programming language",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Java",
      image: ["https://images.pexels.com/photos/27579752/pexels-photo-27579752.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "JavaScript library for building user interfaces",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "C#",
      image: ["https://images.pexels.com/photos/27579756/pexels-photo-27579756.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Swift",
      image: ["https://images.pexels.com/photos/27579749/pexels-photo-27579749.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "High-level Python web framework",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "TypeScript",
      image: ["https://images.pexels.com/photos/27579755/pexels-photo-27579755.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "Language for managing and querying databases",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Kotlin",
      image: ["https://images.pexels.com/photos/27579758/pexels-photo-27579758.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "Data query language and runtime",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Ruby",
      image: ["https://images.pexels.com/photos/27579750/pexels-photo-27579750.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "Typed superset of JavaScript",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Rust",
      image: ["https://images.pexels.com/photos/27579751/pexels-photo-27579751.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "Standard markup language and styling for web pages",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Go",
      image: ["https://images.pexels.com/photos/27579757/pexels-photo-27579757.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      description: "Amazon Web Services cloud computing platform",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
  ],
  photography: [
    {
      title: "Portrait Photography",
      image: [],
      description: "Techniques for taking great portraits",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Landscape Photography",
      image: [],
      description: "Capturing beautiful landscapes",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
  ],
  business: [
    {
      title: "Business Strategy",
      image: [],
      description: "Planning and executing business strategies",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
    {
      title: "Financial Planning",
      image: [],
      description: "Managing and planning financial resources",
      updated_at: "2024-07-31T18:07:24.762939Z",
    },
  ],
};

export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}skills/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultSkillsData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If 404 error, return default data based on the template
        return defaultSkillsData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default skillSlice.reducer;
