import { createAction, createActionGroup, props } from '@ngrx/store';

export enum CategoriesActionTypes {
  Load = '[Categories Api] Fetch',
  LoadSuccess = '[Categories API] Loaded Success',
  LoadError = '[Categories API] Loaded Error',
}

export const retrieveCategories = createAction(CategoriesActionTypes.Load);

export const CategoriesActions = createActionGroup({
  source: 'Categories API',
  events: {
    'Loaded Success': props<{ categories: ReadonlyArray<string> }>(),
    'Loaded Error': props<{ error: string | null }>(),
  },
});
