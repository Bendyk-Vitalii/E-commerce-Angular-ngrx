import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../interface/authStore.model';
import { AUTH_FEATURE_KEY } from './auth.reducers';



export const selectAuth = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsLoggedIn = createSelector(selectAuth, state => state.isLoggedIn);

export const selectLoginError = createSelector(selectAuth, state => state.hasLoginError);

export const selectAuthUser = createSelector(selectAuth, state => state.user);
