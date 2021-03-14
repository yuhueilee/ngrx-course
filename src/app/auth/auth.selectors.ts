import { AuthState } from './reducers';
import { createFeatureSelector, createSelector } from "@ngrx/store";

// feature selector: to write type save selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * selector: memorized function/ mapping function with memory
 * if the input value does not change, the output will not change 
 * and hence no calculation is performed.
 */
export const isLoggedIn = createSelector(
    // mapping function used to fetch the data from the store
    selectAuthState,
    // projector function that takes all the slices of state in the previous mapping function
    auth => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);