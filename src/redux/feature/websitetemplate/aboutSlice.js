import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage";

const defaultAboutData = {
  developer: {
    images: [
      {
        url: "https://res.cloudinary.com/de6atvipk/image/upload/v1722811797/Frame_3637_4_j8hh4o.png",
        alt: "Developer Image 1",
      },      
    ],
    titles: [
      {
        key: "item 1",
        subtitle: "Available",
      },
    ],
    descriptions: [
      {
        key: "item 1",
        long: "Developer description about the person or their job 1.",
      },
      {
        key: "item 2",
        long: "Developer description about the person or their job 2.",
      },
    ],
    personal_info: {
      first_name: "Elon",
      last_name: "Musk",
      gender: "Male",
      date_of_birth: "24 April 1993",
      job: "Software Developer",
      languages: ["English", "Spanish"],
      contacts: [
        {
          type: "email",
          value: "john.doe@developer.com",
        },
        {
          type: "phone",
          value: "+1234567890",
        },
      ],
      experience: "5 years of experience in software development.",
      address: {
        street: "123 Developer St",
        city: "Springfield",
        state: "IL",
        zip: "62701",
        country: "USA",
      },
      nationality: "American",
      social_media: [
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/johndoedev",
        },
        {
          platform: "GitHub",
          url: "https://github.com/johndoedev",
        },
      ],
    },
  },
  photography: {
    images: [
      {
        url: "https://p1.hiclipart.com/preview/359/957/100/face-icon-user-profile-user-account-avatar-icon-design-head-silhouette-neck-png-clipart.jpg",
        alt: "Photography Image 1",
      },
      {
        url: "https://wallpapercave.com/wp/wp13163582.png",
        alt: "Photography Image 2",
      },
      {
        url: "https://w0.peakpx.com/wallpaper/349/159/HD-wallpaper-landscape-nature-snow-covered-trees-with-snow-field-winter.jpg",
        alt: "Photography Image 3",
      },
      {
        url: "https://i.pinimg.com/736x/30/2c/ae/302caed8064de360c746c519be72723e.jpg",
        alt: "Photography Image 4",
      },
      {
        url: "https://i.pinimg.com/564x/9f/8f/9d/9f8f9d33b900494f06d3e4e5dcefd0c5.jpg",
        alt: "Photography Image 5",
      },
      {
        url: "https://c4.wallpaperflare.com/wallpaper/499/862/572/winter-snow-sunset-pink-sky-wallpaper-preview.jpg",
        alt: "Photography Image 6",
      },
      {
        url: "https://w0.peakpx.com/wallpaper/238/11/HD-wallpaper-winter-in-pink-mountain-sunset-trees-pink-winter.jpg",
        alt: "Photography Image 7",
      },
    ],
    titles: [
      {
        key: "item 1",
        subtitle: "Available",
      },
    ],
    descriptions: [
      {
        key: "item 1",
        long: "I've always loved observing the world around me. Photographyallows me to capture the beauty I see in the world and share itwith others. I am currently exploring thoughts about ways that interior experiences inevitably become part of the exterior. This is as true with our own thoughts as it is with the interior experiences of social groups, historic movements, and momentous events. That Take time to explore my work and let me know what you think. Follow me on social media or sign up for my newsletter to hear updates about what I am working on and where you can see my art in person.",
      },
      {
        key: "item 2",
        long: "I've always loved observing the world around me. Photography allows me to capture the beauty I see in the world and share it with others. I hope you enjoy exploring the world through my lens and will take a moment to get in touch.",
      },
    ],
    personal_info: {
      first_name: "Jane",
      last_name: "Doe",
      gender: "Female",
      date_of_birth: "12 June 1990",
      job: "Photographer",
      languages: ["English", "French"],
      contacts: [
        {
          type: "email",
          value: "jane.doe@photography.com",
        },
        {
          type: "phone",
          value: "+9876543210",
        },
      ],
      experience: "8 years of experience in professional photography.",
      address: {
        street: "456 Photography Lane",
        city: "Paris",
        state: "ID",
        zip: "83261",
        country: "France",
      },
      nationality: "French",
      social_media: [
        {
          platform: "Instagram",
          url: "https://instagram.com/janedoephotography",
        },
        {
          platform: "Facebook",
          url: "https://facebook.com/janedoephotography",
        },
      ],
    },
  },
  marketing: {
    // Similar structure with marketing specific data
  },
  business: {
    images: [
      {
        url: "/businessImg/CompanyService.png",
        alt: "Developer Image 1",
      },      
    ],
    titles: [
      {
        key: "item 1",
        subtitle: "Available",
      },
    ],
    descriptions: [
      {
        key: "item 1",
        long: "I bring experience, insight, and a results-driven approach to help businesses thrive. Whether you need strategic planning, market analysis, or project management, I’m here to elevate your business to new heights.",
      },
      {
        key: "item 1",
        long: "I provide strategic business planning that is tailored to your specific needs, ensuring that your business stays ahead of the competition and continues to grow. My plans are designed to be actionable and result-oriented, guiding you towards achieving your long-term goals.",
      },
      {
        key: "item 1",
        long: "Understanding the market is crucial for making informed decisions. I offer in-depth market analysis that gives you valuable insights into current trends, consumer behavior, and potential opportunities. This analysis empowers you to make data-driven decisions that propel your business forward.",
      },
    ],
    personal_info: {
      first_name: "Elon",
      last_name: "Musk",
      gender: "Male",
      date_of_birth: "24 April 1993",
      job: "Software Developer",
      languages: ["English", "Spanish"],
      contacts: [
        {
          type: "email",
          value: "john.doe@developer.com",
        },
        {
          type: "phone",
          value: "+1234567890",
        },
      ],
      experience: "5 years of experience in software development.",
      address: {
        street: "123 Developer St",
        city: "Springfield",
        state: "IL",
        zip: "62701",
        country: "USA",
      },
      nationality: "American",
      social_media: [
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/johndoedev",
        },
        {
          platform: "GitHub",
          url: "https://github.com/johndoedev",
        },
      ],
    },
  },
};

export const fetchAboutMe = createAsyncThunk(
  "about/fetchAboutMe",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}aboutme/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultAboutData[template] || [];
      }
      console.log("response.data",response.data)
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return defaultAboutData[template] || {};
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    aboutData: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutData = action.payload;
      })
      .addCase(fetchAboutMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default aboutSlice.reducer;
