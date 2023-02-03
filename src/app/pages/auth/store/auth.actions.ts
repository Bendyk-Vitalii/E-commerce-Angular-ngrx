import { props, createActionGroup, emptyProps } from '@ngrx/store';

import { AuthSuccessResponseI } from '../service/server.model';
import { User } from '../auth.interface';


export const LoginActions = createActionGroup({
  source: 'Log In Page',
  events: {
    'Log In Request': props<{email: string, password: string}>(),
    'Log In Handler': props<{response: AuthSuccessResponseI}>(),
    'Log In Success':props<{access_token: string}>(),
    'Log In Failure': props<{error: Error}>(),
  },
});

export const RefreshTokenActions = createActionGroup({
  source: 'Auth',
  events: {
    'Request':  emptyProps,
    'Success':  emptyProps,
    'Failure':  emptyProps,
  }
})

export const CommonAuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get Auth User Request': emptyProps,
    'Get Auth User Success': props<{ user: User }>(),
    'Get Auth User Failure': emptyProps,
    'User logout': emptyProps,
  }
})
