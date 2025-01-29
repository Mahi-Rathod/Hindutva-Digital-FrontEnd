import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  trendingPosts: {
    "Government-Schemes": [],
    "Job-Bharati": [],
    Education: [],
    Information: [],
    GR: [],
    "Latest-News": [],
  },
  trendingNews : [],
  post: {},
  newPost: [],
  postCategory: {},
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/posts/top-posts-category` // Use dynamic page
  );
  return response.data.posts;
});

export const fetchByCategory = createAsyncThunk(
  "posts/fetchByCategory",
  async ({ category = "", page = 1, limit = 6 }) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/posts/get-posts?category=${category}&page=${page}&limit=${limit}`
    );

    console.log({
      category,
      posts: response.data.posts,
      totalPosts: response.data.totalPosts || 0,
    });

    return {
      category,
      posts: response.data.posts,
      totalPosts: response.data.totalPosts || 0,
    };
  }
);

export const viewPost = createAsyncThunk("/posts/viewPosts", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/posts/view-post/${id}`
  );
  return response.data.post;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        const temp = action.payload;
        temp.forEach((post) => {
          if (!state.trendingPosts[post.category]) {
            state.trendingPosts[post.category] = [post];
          }
          else if (!state.trendingPosts[post.category].some((existingPost) => existingPost.id === post.id)) {
            state.trendingPosts[post.category].push(post);
          }
        });
        state.newPost = action.payload.slice(0, 10);
        state.status = "completed";
        state.error = null;
      })
      
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // View single post
      .addCase(viewPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.status = "completed";
        state.error = null;
      })
      .addCase(viewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch posts by category
      .addCase(fetchByCategory.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        const { category, posts, totalPosts } = action.payload;
        const page = action.meta.arg.page;

        if (!state.postCategory[category]) {
          state.postCategory[category] = {
            posts: [...posts],
            pages: [page],
            totalPosts: totalPosts || 0,
          };
        } else {
          const categoryData = state.postCategory[category];

          if (!categoryData.pages.includes(page)) {
            categoryData.posts = [
              ...new Set([...categoryData.posts, ...posts]),
            ];
            categoryData.pages.push(page);
          }

          if (totalPosts) {
            categoryData.totalPosts = totalPosts;
          }
        }

        state.status = "completed";
        state.error = null;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
