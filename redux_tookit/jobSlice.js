import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://run.mocky.io/v3/a747ad2a-94f8-4786-81fc-a004410b9cc3';

// Async action để lấy danh sách công việc
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get(URL);
  return response.data;
});

// Async action để thêm công việc
export const addJob = createAsyncThunk('jobs/addJob', async (newJob) => {
  const response = await axios.post(URL, newJob);
  return response.data;
});

// Async action để xóa công việc
export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId) => {
  await axios.delete(`${URL}/${jobId}`);
  return jobId;
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Lấy danh sách công việc
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Thêm công việc
      .addCase(addJob.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Xóa công việc
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.list = state.list.filter((job) => job.id !== action.payload);
      });
  },
});

export default jobSlice.reducer;