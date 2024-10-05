import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Profile extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phoneNumber: string;
  cartItems: [];
  orders: [];
}

interface AuthState {
  loading: boolean;
  error: string | null;
  user: Profile | null;
}

const initialState:AuthState = {
  loading: false,
  error: null,
  user:null ,
};

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    userProfile(state, action) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
  },
});
export const { userProfile, setLoading, setError } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
