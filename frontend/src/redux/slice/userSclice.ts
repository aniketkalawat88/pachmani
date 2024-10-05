import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  firstname: string;
  lastname: string;
  mobile?: string;
  email: string;
  pincode: string;
  city: string;
  street: string;
  zip: string;
  address: string;
  state: string;
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  cartItems?: [];
  orders?: [];
  comparePassword(password: string): Promise<boolean>;
  addresses?: Address[];
  phoneNumber?: string;
  otp: string;
  otpExpiry: Date;
  verified: boolean;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: IUser | null;
  UnauthorizedError: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  UnauthorizedError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    register(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUnauthorized(state, action) {
      state.loading = false;
      state.UnauthorizedError = action.payload;
    },
  },
});
export const {
  logout,
  login,
  register,
  setLoading,
  setError,
  setUnauthorized,
} = authSlice.actions;
export default authSlice.reducer;
