import { createStore, combineReducers } from "redux";
import goalReducer from "./reducers";

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

const rootReducer = combineReducers({ goal: persistReducer(persistConfig, goalReducer) });

const store = createStore(rootReducer);
const persistor = persistStore(store);

export {store, persistor}