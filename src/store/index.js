import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import ApplicationReducer from '../Reducers'

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: ApplicationReducer,
        middleware: [thunk],
        preloadedState
    })
    return store
}