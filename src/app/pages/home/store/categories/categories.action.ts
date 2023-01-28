import { createAction, createActionGroup, props } from '@ngrx/store';

export enum CategoriesActionTypes {
  LOAD = '[Categories Api] Fetch',
  LOAD_SUCCESS = '[Categories API] Loaded Success',
  LOAD_ERROR = '[Categories API] Loaded Error',
}

export const retrieveCategories = createAction(CategoriesActionTypes.LOAD);

export const CategoriesActions = createActionGroup({
  source: 'Categories API',
  events: {
    'Loaded Success': props<{ categories: ReadonlyArray<string> }>(),
    'Loaded Error': props<{ error: string | null }>(),
  },
});
