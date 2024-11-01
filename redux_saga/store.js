import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import jobReducer from './jobSlice';
import { jobSaga } from './jobSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(jobSaga);

export default store;