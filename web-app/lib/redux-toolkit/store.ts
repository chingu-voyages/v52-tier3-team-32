import { configureStore } from "@reduxjs/toolkit";
import nameUpdaterReducer from "./features/name-updater/nameUpdaterSlice";
import adminInterfaceReducer from "./features/admin-interface/adminInterfaceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      nameUpdater: nameUpdaterReducer,
      adminInterface: adminInterfaceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
