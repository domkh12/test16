import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage"; // Update the import path

const defaultData = {
  developer: [
    {
      project_title: "Developer Project A",
      project_description: "A developer project description",
      link_to_project: "https://example.com/developerProjectA",
      project_image: "https://images.pexels.com/photos/27579868/pexels-photo-27579868.png?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },    
    {
      project_title: "Developer Project A",
      project_description: "A developer project description",
      link_to_project: "https://example.com/developerProjectA",
      project_image: "https://cdn.pixabay.com/photo/2024/08/02/15/53/superhero-8940104_960_720.png",
    },
    {
      project_title: "Developer Project A",
      project_description: "A developer project description",
      link_to_project: "https://example.com/developerProjectA",
      project_image: "https://cdn.pixabay.com/photo/2024/08/02/15/53/superhero-8940108_960_720.png",
    },
    {
      project_title: "Developer Project A",
      project_description: "A developer project description",
      link_to_project: "https://example.com/developerProjectA",
      project_image: "https://cdn.pixabay.com/photo/2024/08/02/15/53/superhero-8940106_960_720.png",
    },
    {
      project_title: "Developer Project A",
      project_description: "A developer project description",
      link_to_project: "https://example.com/developerProjectA",
      project_image: "https://cdn.pixabay.com/photo/2024/08/02/15/53/hero-8940107_1280.png",
    },
    {
      project_title: "Developer Project A",
      project_description: "A developer project description",
      link_to_project: "https://example.com/developerProjectA",
      project_image: "https://cdn.pixabay.com/photo/2024/08/02/15/53/hero-8940105_960_720.png",
    },
  ],
  marketing: [
    {
      project_title: "Marketing Project A",
      project_description: "A marketing project description",
      link_to_project: "https://example.com/marketingProjectA",
      project_image: "http://example.com/marketing_project_image.jpg",
    },
  ],
  business: [
    {
      project_title: "Business Project A",
      project_description: "A business project description",
      link_to_project: "https://example.com/businessProjectA",
      project_image: "http://example.com/business_project_image.jpg",
    },
  ],
  photography: [
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
    },
    {
      project_title: "Photography Project A",
      project_description: "A photography project description",
      link_to_project: "https://example.com/photographyProjectA",
      project_image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
    },
  ],
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}projects/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If 404 error, return default data based on the template
        return defaultData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default projectSlice.reducer;
