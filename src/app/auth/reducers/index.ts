import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';

// this is a state inside the store managed by the auth module
export interface AuthState {
  user: User
};

export const initialAuthState: AuthState = {
  user: undefined
};

/*
reducer: a function that we need to pass to the store
so the store knows how to react to the action
**/
export const authReducer = createReducer(
  initialAuthState,
  // on: defines what the store should do in respond to the action
  on(AuthActions.login, (state, action) => {
    console.log('Calling login reducer');
    // return a new AuthState
    return {
      user: action.user
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  })
);

