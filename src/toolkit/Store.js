import { configureStore } from "@reduxjs/toolkit";
import workersSlice from "./wokersSlice";
import sellersSlice from "./sellersSlice";
import generalSlice from "./generalSlice";
import customersSlice from "./customersSlice";
import vegsSlice from "./vegsSlice";
import actsSlice from "./actsSlice";
import salesSlice from "./salesSlice";
export const store = configureStore({
  reducer: {
    workers: workersSlice,
    sellers: sellersSlice,
    general: generalSlice,
    customers: customersSlice,
    vegs: vegsSlice,
    acts: actsSlice,
    sales: salesSlice,
  },
});
