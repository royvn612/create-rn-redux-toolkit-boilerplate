import {Action, configureStore, getDefaultMiddleware, ThunkAction} from '@reduxjs/toolkit';
import Reactotron from './reactotron';
import rootReducer, {RootState} from '~/redux/root-reducer';

let middleware = getDefaultMiddleware();
let enhancers;
if (__DEV__) {
  const createFlipperMiddleware = require('redux-flipper').default;
  middleware = middleware.concat(createFlipperMiddleware());
  enhancers = [Reactotron.createEnhancer!()];
}

const rootStore = configureStore({
  reducer: rootReducer,
  middleware,
  enhancers,
});

export type AppDispatch = typeof rootStore.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default rootStore;
