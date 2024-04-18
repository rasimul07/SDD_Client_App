import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';



interface DataUpdateState{
  isUpdate:boolean
}

const initialState: DataUpdateState = {
  isUpdate: false,
};

const slice = createSlice({
  name: 'dataUpdate',
  initialState,
  reducers: {
    updateDataState(dataUpdateState, {payload}: PayloadAction<boolean>) {
      dataUpdateState.isUpdate = payload;
    },
  },
});

export const {updateDataState} = slice.actions;

export const getDataUpdateState = createSelector(
  (state: RootState) => state,
  ({dataUpdate}) => dataUpdate
);
export default slice.reducer;
