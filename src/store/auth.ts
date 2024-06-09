import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import { RootState } from '.';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
}

export interface ImageUrlAndPredictionResult {
  url: string;
  prediction: string;
  publicId:string
}

interface AuthState {
  profile: UserProfile | null;
  arrayOfImageAndPrediction: [ImageUrlAndPredictionResult] | null;
  predictionUpdatehappen:boolean;
  loggedIn: boolean;
  busy: boolean;
};

const initialState: AuthState = {
  profile: null,
  arrayOfImageAndPrediction:null,
  predictionUpdatehappen:false,
  loggedIn: false,
  busy:false
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(authState, {payload}: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },
    updateArrayOfImageAndPrediction(
      authState,
      {payload}: PayloadAction<[ImageUrlAndPredictionResult] | null>,
    ) {
      authState.arrayOfImageAndPrediction = payload;
    },
    updatePredictionUpdatehappenState(
      authState,
      {payload}: PayloadAction<boolean>,
    ) {
      authState.predictionUpdatehappen = payload
    },
    updateLoggedInState(authState, {payload}) {
      authState.loggedIn = payload;
    },
    updateBusyState(authState, {payload}: PayloadAction<boolean>) {
      authState.busy = payload;
    },
  },
});

export const {
  updateLoggedInState,
  updateProfile,
  updateBusyState,
  updateArrayOfImageAndPrediction,
  updatePredictionUpdatehappenState,
} = slice.actions;

export const getAuthState = createSelector(
  (state:RootState)=>state,
  ({auth})=> auth
)

export default slice.reducer;
