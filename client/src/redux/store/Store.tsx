import {createStore,applyMiddleware} from 'redux'
import { famReducer } from '../reducers'
import thunk from 'redux-thunk'
//@ts-ignore
export const store=createStore(famReducer,applyMiddleware(thunk))