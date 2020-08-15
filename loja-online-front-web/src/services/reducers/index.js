import { combineReducers } from 'redux';

import userReducer from './userReducer';
import categoryPageReducer from './categoryPageReducer';
import loadingReducer from './loadingReducer';

const reducers = combineReducers({
    user: userReducer,
    categoryPage: categoryPageReducer,
    loading: loadingReducer
});

export default reducers;