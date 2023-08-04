import { createSlice } from '@reduxjs/toolkit';
import { fetchAddressDetails } from '../../globalcomponents/MapServices/MapServices';

const initialState = {
  addressDetails: null,
  endCoordinates: '',
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddressDetails: (state, action) => {
        // Assuming the payload contains the new address details object
        state.addressDetails = action.payload;
      },
      updateAddressDetails: (state, action) => {
        // Assuming the payload contains the updated address details object
        state.addressDetails = { ...state.addressDetails, ...action.payload };
      },
      deleteAddressDetails: (state) => {
        state.addressDetails = null;
      },
      resetAddressDetails:(state)=> {
        return initialState; // Reset the state to the initial value
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressDetails.fulfilled, (state, action) => {
        state.loading = false;
        const { LATITUDE, LONGITUDE } = action.payload[0];
        state.addressDetails = action.payload;
        state.endCoordinates = `${LATITUDE},${LONGITUDE}`;
      })
      .addCase(fetchAddressDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
  },
});
export const { addAddressDetails, updateAddressDetails, deleteAddressDetails, resetAddressDetails } =
  addressSlice.actions;
export default addressSlice.reducer;
