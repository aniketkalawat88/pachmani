// import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "../store";

// interface Order {
//     id: number;
//     name: string;
//   }

// // Define the async thunk with proper types
// export const fetchOrders = async (dispatch: Dispatch) => {
//   try {
//     useDispatch(setIsLoading(true));
//     const { data } = await api.post(`product/wishlist`);
//     // console.log(data?.wishlist)
//     dispatch(getProducts(data?.wishlist));
//   } catch (err) {
//     console.log(err , "===")
//     dispatch(setError("wishlist product error"));
//   }finally {
//       dispatch(setIsLoading(false));
//     }
// }