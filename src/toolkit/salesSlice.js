import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { getDoc } from "firebase/firestore";

const initialState = { entities: [], loading: "idle" };

const collectionRef = collection(database, "sales");

export const getSales = createAsyncThunk("sales/getSales", async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = await Promise.all(
      querySnapshot.docs.map(async (item) => {
        const { customer, veg, date, ...rest } = item.data();
        // Fetch the customer document using the reference
        const customerDoc = await getDoc(customer);
        const customerName = customerDoc.data().fullName;
        const customerId = customerDoc.id;

        const vegDoc = await getDoc(veg);
        const vegName = vegDoc.data().name;
        const vegId = vegDoc.id;

        const convertedDate = new Date(date.toMillis());
        const theDate = `${convertedDate.getFullYear()}-${
          convertedDate.getMonth() + 1
        }-${convertedDate.getDate()}`;

        return {
          ...rest,
          id: item.id,
          date: theDate,
          customerName,
          vegName,
          vegId,
          customerId,
        };
      })
    );
    return data;
  } catch (err) {
    throw new Error(err);
  }
});

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSales.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getSales.fulfilled, (state, action) => {
        (state.loading = "idle"), (state.entities = action.payload);
      });
  },
});

export const selectSalesEntities = (state) => state.sales.entities;

export const selectSalesLoading = (state) => state.sales.loading;

export default salesSlice.reducer;
