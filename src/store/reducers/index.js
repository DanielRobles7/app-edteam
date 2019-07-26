import {  combineReducers } from 'redux'

import postsReducer from './posts'

const rootReducer = combineReducers({
    postsReducer,
})

export default rootReducer

