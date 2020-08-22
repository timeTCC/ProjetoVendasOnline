import { combineReducers } from 'redux';

import userReducer from './userReducer';
import categoryPageReducer from './categoryPageReducer';
import loadingReducer from './loadingReducer';
import editingProductReducer from './editingProductReducer';

const reducers = combineReducers({
    user: userReducer,
    categoryPage: categoryPageReducer,
    loading: loadingReducer,
    editingProduct: editingProductReducer
});

export default reducers;