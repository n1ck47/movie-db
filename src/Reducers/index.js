import movieReducer from './movieReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    movies:movieReducer
})

export default allReducers;