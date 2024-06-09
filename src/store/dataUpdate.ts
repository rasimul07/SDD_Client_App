import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';



interface DataUpdateState{
  isUpdate:boolean;
  isBusyUpload:boolean;
}

const initialState: DataUpdateState = {
  isUpdate: false,
  isBusyUpload:false
};

const slice = createSlice({
  name: 'dataUpdate',
  initialState,
  reducers: {
    updateDataState(dataUpdateState, {payload}: PayloadAction<boolean>) {
      dataUpdateState.isUpdate = payload;
    },
    updateBusyUploadState(dataUpdateState, {payload}: PayloadAction<boolean>) {
      dataUpdateState.isBusyUpload = payload;
    },
  },
});

export const {updateDataState, updateBusyUploadState} = slice.actions;

export const getDataUpdateState = createSelector(
  (state: RootState) => state,
  ({dataUpdate}) => dataUpdate
);
export default slice.reducer;
