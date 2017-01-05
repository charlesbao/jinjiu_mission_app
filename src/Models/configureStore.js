/**
 * Created by chalresbao on 16/12/25.
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import {combineReducers} from 'redux'
import MissionReducer from './Reducers/MissionReducer'
import UserReducer from './Reducers/UserReducer'
import StateReducer from './Reducers/StateReducer'

const reducers = combineReducers({
    MissionReducer,
    UserReducer,
    StateReducer,
})
//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使action创建函数可以返回一个function代替一个action对象
const createStoreWithMiddleware = applyMiddleware(
    thunk,promise
)(createStore)

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducers, initialState)
}