import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../../../lib/secureLocalStorage"; 

const defaultBlogData = {
  developer: [
    {
      title: "Mastering React: A Beginner's Guide",
      description: "Step-by-step guidance on building dynamic user interfaces with React, covering essential concepts and best practices.",
      image: ["https://i.pinimg.com/736x/04/d9/d8/04d9d8cd9792321010da0f24583b3c1d.jpg"]
    },
    {
      title: "Understanding API Integration",
      description: "Learn how to seamlessly integrate APIs into your web applications, enabling powerful data interactions and enhanced user experiences.",
      image: ["https://i.pinimg.com/736x/a3/cd/a6/a3cda6a99f48ea5f6562eb19880130a7.jpg"]
    },
    {
      title: "Understanding JavaScript Closures",
      description: "A deep dive into closures in JavaScript and how to use them effectively.",
      image: ["https://i.pinimg.com/originals/53/3f/23/533f230cb28329758ebeb171ef0ea600.png"]
    },

  ],
  photography: [
    {
      title: "MEET SOHO WORDPRESS THEME",
      description: "No one from the mass of earth. There is no time when the developers are not easy. Proin wisdom propagandize, with the ends nor how in, the sauce is shot with the sem duis lobortis, the leavenum pulvinar. But it is wise to put it. The first thing to do in front of the hospital is to put the beds of care in the hospital. Now it is time, if not the life of the tincidunt, it is necessary to put the pain of laicinia. As before, it's a memory, but there are no members. Some people need to monitor the temperature of the building itself or the weather. For now the mass, whether it be an employee or a concern, will be followed by a sad phase of laughter.",
      image: ["https://st2.depositphotos.com/2008763/5810/v/600/depositphotos_58106257-stock-video-pink-sunset-in-the-snowy.jpg"]
    },
    {
      title: "10 MOST ANTICIPATED EVENTS OF 2023",
      description: "Now it is time, if not the life of the tincidunt, it is necessary to put the pain of laicinia. As before, but the head, the members and none. Some of them need to be monitored by the owner himself or by the timing of the course. For now the mass, whether the employee is worried or worried, will be followed by laughter. The sad phase of the diam nisl, eu drinkendum urn, venenatis varius. No one from the mass of earth. There is no time when the developers are not easy. Proin wisdom propagandize, with the ends nor how in, the sauce is shot with the sem duis lobortis, the leavenum pulvinar needs. But it is wise to put it. The first thing he did was in the hospital.",
      image: ["https://st2.depositphotos.com/2008763/11495/v/600/depositphotos_114959894-stock-video-sunset-over-a-misty-valley.jpg"]
    },
    {
      title: "UNDERGROUND WALLS",
      description: "In front of him, the first thing in the throat of the doctor is grief and anger. Some of them need to be monitored by the owner himself or by the timing of the course. For now the mass, whether the employee is worried or worried, will be followed by laughter. The sad phase of the diam nisl, eu drinkendum urn, venenatis varius. No one from the mass of earth. There is no time when the developers are not easy. Proin wisdom propagandize, with the ends nor how in, the sauce is shot with the sem duis lobortis, the leavenum pulvinar needs. However, it is wise to put the lore of the vestibule before the very first in the throats of the orc of mourning and utricle. Some people need the very door.",
      image: ["https://st2.depositphotos.com/2008763/10870/v/600/depositphotos_108708652-stock-video-sunrise-on-an-alien-planet.jpg"]
    },
    {
      title: "MONUMENT STATION OPENED",
      description: "It is important for me to be able to express my feelings or to decorate the bed, but I am happy to be able to express my thoughts and feelings. In complete fear, said the vehicles of the vestibule, the vehicles at the land. Until that is my pillow. In fact, Lacinia needs the eros of the Pellentesque. Soccer sauce. Tomorrow I'll be reading the same, it's convenient for the ferry and, for the Valley or for that. Let us live by the element of fear, not hate. But the tincidunt purus in the throat of laughter. Tomorrow there will be no ligula, but if you want a story, you need arrows. In fact, he chose the bed of the cat, that is the layer of the garden and the curtains of the truck.",
      image: ["https://wallpapercave.com/wp/wp13163582.png"]
    },
    {
      title: "MEET SOHO WORDPRESS THEME",
      description: "As is always wise, there is no care, but no time is made. It's not a trigger. Smartphones and tablets. No one from the mass of earth. There is no time when the developers are not easy. Proin sapien propagandize, with the ends and not as in, the sauce of the target salad. A double-sided pillowcase. But it is wise to put it. The first thing to do in front of the hospital is to put the beds of care in the hospital. Now it is time, if not the life of the tincidunt, it is necessary to put the pain of lacinia. As before, but the head, the members and none. Some of them need the god's very vestibule or the timing of the course.",
      image: ["https://i.pinimg.com/736x/30/2c/ae/302caed8064de360c746c519be72723e.jpg"]
    },
    
  ],
  marketing: [
    {
      title: "Mastering Social Media Marketing",
      description: "Strategies for boosting your brand's presence on social media platforms.",
      image: ["https://i.pinimg.com/originals/53/3f/23/533f230cb28329758ebeb171ef0ea600.png"]
    },
    {
      title: "Creating Effective Ad Campaigns",
      description: "A step-by-step guide to creating ad campaigns that convert.",
      image: ["https://i.pinimg.com/originals/53/3f/23/533f230cb28329758ebeb171ef0ea600.png"]
    },
    // Add more entries if needed
  ],
  business: [
    {
      title: "Growing Your Small Business",
      description: "Tips for scaling your business and increasing revenue.",
      image: ["https://i.pinimg.com/originals/53/3f/23/533f230cb28329758ebeb171ef0ea600.png"]
    },
    {
      title: "Understanding Business Analytics",
      description: "How to leverage data to make informed business decisions.",
      image: ["https://i.pinimg.com/originals/53/3f/23/533f230cb28329758ebeb171ef0ea600.png"]
    },
    // Add more entries if needed
  ],
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (template, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}blogs/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length === 0) {
        return defaultBlogData[template] || [];
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If 404 error, return default data based on the template
        return defaultBlogData[template] || [];
      } else {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default blogSlice.reducer;
