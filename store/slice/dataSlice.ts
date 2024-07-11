/**
 * Company              : Cloudkaptan Consultancy Services Pvt. Ltd.
 * File Name            : dataSlice.js
 * Created Date         : 02/01/2023
 * Developed By         : SOUVIK DEY
 * Description          : This component handles the data state
 * Last Modified Date   : 02/01/2023
 * Last Modified By     : WASIM IQBAL
 */

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface Record {
  id: string;
  account: string;
  amount: number;
  category: string;
  date: string;
}

const initDataState = {
  records: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState: initDataState,
  reducers: {
    addRecord: (state, action: { payload: Record }) => {
      state.records[action.payload.id] = action.payload;
      return state;
    },
    removeRecord: (state, action: { payload: Record }) => {
      delete state.records[action.payload.id];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRecord, removeRecord } = dataSlice.actions;

// Reducers
export default dataSlice.reducer;
