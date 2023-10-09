import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../firebaseConfig";

const initialState = { entities: [], loading: "idle" };

const collectionRef = collection(database, "workers");

export const getWorkers = createAsyncThunk("workers/getWorkers", async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
});

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getWorkers.fulfilled, (state, action) => {
        (state.loading = "idle"), (state.entities = action.payload);
      });
  },
});

export const selectWorkersEntities = (state) => state.workers.entities;
export const selectWorkersLoading = (state) => state.workers.loading;

export default workersSlice.reducer;
