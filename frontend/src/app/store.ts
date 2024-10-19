import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "../containers/Thunk/AuthFetch";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import { PhotosReducer } from '../containers/Thunk/PhotoFetch.ts';

const usersPersistConfig = {
    key: 'exam:User',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    User: persistReducer(usersPersistConfig, UserReducer),
    Photo: PhotosReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;