import { atom, selector } from 'recoil';
import axios from 'axios';

const URL = 'https://66ff35612b9aac9c997e8502.mockapi.io/job';

export const jobListState = atom({
  key: 'jobListState',
  default: selector({
    key: 'jobListState/default',
    get: async () => {
      try {
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
      }
    },
  }),
});

//thêm công việc mới
export const addJob = selector({
  key: 'addJob',
  get: () => null, 
  set: ({ set, get }, newJob) => {
    const currentJobs = get(jobListState);
    const updatedJobs = [...currentJobs, newJob];
    set(jobListState, updatedJobs);

    axios.post(URL, newJob).catch((error) => {
      console.error('Error adding job:', error);
    });
  },
});

// xóa công việc
export const deleteJob = selector({
  key: 'deleteJob',
  get: () => null,
  set: ({ set, get }, jobId) => {
    const currentJobs = get(jobListState);
    const updatedJobs = currentJobs.filter(job => job.id !== jobId);
    set(jobListState, updatedJobs);

    axios.delete(`${URL}/${jobId}`).catch((error) => {
      console.error('Error deleting job:', error);
    });
  },
});