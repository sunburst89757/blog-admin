import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { tabsReducer } from "./module/tabs";
import { userReducer } from "./module/user";
import { permissionReducer } from "./module/permission";
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    tabs: tabsReducer,
    permission: permissionReducer
  })
);
export const store = configureStore({
  reducer: persistedReducer,
  // 修复持久化时的serializableCheck检查报错行为
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
