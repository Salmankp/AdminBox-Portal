import {combineReducers} from 'redux';
import authUserReducer from './authUser';
import toasterReducer from './toaster';

const allReducers = combineReducers({
  toaster: toasterReducer,
  authUser: authUserReducer,
});

export default allReducers;
