import { props, createActionGroup, emptyProps } from '@ngrx/store';

import { AuthSuccessResponseI } from '../service/server.model';

export const LoginActions = createActionGroup({
  source: 'Log In Page',
  events: {
    'Log In Request': props<{email: string, password: string}>(),
    'Log In Handler': props<{response: AuthSuccessResponseI}>,
    'Log In Success': emptyProps,
    'Login Failure': props<{error: Error}>,
    'Check Login': props<{any: any}>,
    'Get Auth User Request': emptyProps,
    'User logout': emptyProps,
  },
});
