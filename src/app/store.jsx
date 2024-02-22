import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "../components/Category/CategorySlice";
import productReducer from "./reduxSlice/ProductSlice";
import cartReducer from "./reduxSlice/CartSlice";
import checkReducer from "./reduxSlice/ChekoutSlice";
import customerReducer from "./reduxSlice/CustomerSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const conbinedReducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
  checkOut: checkReducer,
  customer: customerReducer,
});
const persistedReducers = persistReducer(persistConfig, conbinedReducers);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
